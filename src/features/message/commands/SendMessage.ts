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
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';

export const sendingMessage = <MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageRequest<MessageContentType, MessageMetaType>,
  meta?: MetaType,
): SendingMessageAction<MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.SENDING_MESSAGE,
  payload,
  meta,
});

export const messageSent = <MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageSuccess<MessageContentType, MessageMetaType>,
  meta?: MetaType,
): MessageSentAction<MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.MESSAGE_SENT,
  payload,
  meta,
});

export const errorSendingmessage = <MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageError<MessageContentType, MessageMetaType>,
  meta?: MetaType,
): ErrorSendingMessageAction<MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.ERROR_SENDING_MESSAGE,
  payload,
  meta,
});

export const sendMessage = <MessageContentType, MessageMetaType, MetaType = {}>(request: SendMessageRequest<MessageContentType, MessageMetaType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(sendingMessage(request, meta));

      pubnub.api.publish(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SendMessageResponse) => {
          if (status.error) {
            let payload: SendMessageError<MessageContentType, MessageMetaType> = {
              request,
              status,
            };

            dispatch(errorSendingmessage<MessageContentType, MessageMetaType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: SendMessageSuccess<MessageContentType, MessageMetaType> = {
              request,
              response,
              status,
            };

            dispatch(messageSent<MessageContentType, MessageMetaType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MessageActionType.SEND_MESSAGE_COMMAND;

  return thunkFunction;
};
