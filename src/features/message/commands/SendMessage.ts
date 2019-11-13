import { Dispatch } from 'redux';
import {
  SendMessageRequest,
  SendingMessageAction,
  MessageSentAction,
  SendMessageSuccess,
  ErrorSendingMessageAction,
  SendMessageError,
  SendMessageResponse,
} from '../MessageActions';
import { MessageActionType } from '../MessageActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';

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

export const errorSendingmessage = <
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

export const sendMessage = <
  MessageContentType extends object = {},
  MessageMeta extends object = {},
  Meta extends ActionMeta = never
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
        (status: PubNubApiStatus, response: SendMessageResponse) => {
          if (status.error) {
            let payload: SendMessageError<MessageContentType, MessageMeta> = {
              request,
              status,
            };

            dispatch(
              errorSendingmessage<MessageContentType, MessageMeta, Meta>(
                payload,
                meta
              )
            );
            reject(payload);
          } else {
            let payload: SendMessageSuccess<MessageContentType, MessageMeta> = {
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
