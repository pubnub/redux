import { Dispatch } from 'redux';
import {
  SendMessageRequest,
  SendingMessageAction,
  MessageSentAction,
  SendMessageSuccess,
  ErrorSendingMessageAction,
  SendMessageError,
} from '../MessageActions';
import { MessageActionType } from '../MessageActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-messages-send[]
export const sendingMessage = <
  MessageContentType extends object,
  MessageMeta extends object,
  Meta extends ActionMeta
>(
  payload: SendMessageRequest<MessageContentType, MessageMeta>,
  meta?: Meta
): SendingMessageAction<MessageContentType, MessageMeta, Meta> => ({
  type: MessageActionType.SENDING_MESSAGE,
  payload,
  meta,
});
// end::RDX-function-messages-send[]

// tag::RDX-function-messages-send-success[]
export const messageSent = <
  MessageContentType extends object,
  MessageMeta extends object,
  Meta extends ActionMeta
>(
  payload: SendMessageSuccess<MessageContentType, MessageMeta>,
  meta?: Meta
): MessageSentAction<MessageContentType, MessageMeta, Meta> => ({
  type: MessageActionType.MESSAGE_SENT,
  payload,
  meta,
});
// end::RDX-function-messages-send-success[]

// tag::RDX-function-messages-send-error[]
export const errorSendingMessage = <
  MessageContentType extends object,
  MessageMeta extends object,
  Meta extends ActionMeta
>(
  payload: SendMessageError<MessageContentType, MessageMeta>,
  meta?: Meta
): ErrorSendingMessageAction<MessageContentType, MessageMeta, Meta> => ({
  type: MessageActionType.ERROR_SENDING_MESSAGE,
  payload,
  meta,
});
// end::RDX-function-messages-send-error[]

// tag::RDX-command-messages-send[]
export const sendMessage = <
  MessageContentType extends object = {},
  MessageMeta extends object = {},
  Meta extends ActionMeta = AnyMeta
>(
  request: SendMessageRequest<MessageContentType, MessageMeta>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(sendingMessage(request, meta));

      pubnub.api.publish(
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
              errorSendingMessage<MessageContentType, MessageMeta, Meta>(
                payload,
                meta
              )
            );
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(
              messageSent<MessageContentType, MessageMeta, Meta>(payload, meta)
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MessageActionType.SEND_MESSAGE_COMMAND;

  return thunkFunction;
};
// end::RDX-command-messages-send[]
