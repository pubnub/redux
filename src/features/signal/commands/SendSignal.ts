import { Dispatch } from 'redux';
import {
  SendSignalRequest,
  SendingSignalAction,
  SignalSentAction,
  SendSignalSuccess,
  ErrorSendingSignalAction,
  SendSignalError,
} from '../SignalActions';
import { SignalActionType } from '../SignalActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-signals-send[]
export const sendingSignal = <
  SignalContentType extends object,
  Meta extends ActionMeta
>(
  payload: SendSignalRequest<SignalContentType>,
  meta?: Meta
): SendingSignalAction<SignalContentType, Meta> => ({
  type: SignalActionType.SENDING_SIGNAL,
  payload,
  meta,
});
// end::RDX-function-signals-send[]

// tag::RDX-function-signals-send-success[]
export const signalSent = <
  SignalContentType extends object,
  Meta extends ActionMeta
>(
  payload: SendSignalSuccess<SignalContentType>,
  meta?: Meta
): SignalSentAction<SignalContentType, Meta> => ({
  type: SignalActionType.SIGNAL_SENT,
  payload,
  meta,
});
// end::RDX-function-signals-send-success[]

// tag::RDX-function-signals-send-error[]
export const errorSendingSignal = <
  SignalContentType extends object,
  Meta extends ActionMeta
>(
  payload: SendSignalError<SignalContentType>,
  meta?: Meta
): ErrorSendingSignalAction<SignalContentType, Meta> => ({
  type: SignalActionType.ERROR_SENDING_SIGNAL,
  payload,
  meta,
});
// end::RDX-function-signals-send-error[]

// tag::RDX-command-signals-send[]
export const sendSignal = <
  SignalContentType extends object = {},
  Meta extends ActionMeta = AnyMeta
>(
  request: SendSignalRequest<SignalContentType>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(sendingSignal(request, meta));

      pubnub.api.signal(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(
              errorSendingSignal<SignalContentType, Meta>(payload, meta)
            );
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(signalSent<SignalContentType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SignalActionType.SEND_SIGNAL_COMMAND;

  return thunkFunction;
};
// end::RDX-command-signals-send[]
