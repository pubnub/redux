import {
  SendMessageRequest,
  SendingMessageAction,
  MessageRequestOptions,
  MessageSentAction,
  SendMessageSuccess,
  ErrorSendingMessageAction,
  SendMessageError,
  SendMessageResponse,
} from '../MessageActions';
import { ActionMeta } from '../../../common/ActionMeta';
import { MessageActionType } from '../MessageActionType.enum';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const sendingMessage = <MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageRequest<MessageRequestType, MessageContentType, MessageMetaType>,
  meta?: ActionMeta<MetaType>,
): SendingMessageAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.SENDING_MESSAGE,
  payload,
  meta,
});

export const messageSent = <MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageSuccess<MessageRequestType, MessageContentType, MessageMetaType>,
  meta?: ActionMeta<MetaType>,
): MessageSentAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.MESSAGE_SENT,
  payload,
  meta,
});

export const errorSendingmessage = <MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType>(
  payload: SendMessageError<MessageRequestType, MessageContentType, MessageMetaType>,
  meta?: ActionMeta<MetaType>,
): ErrorSendingMessageAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType> => ({
  type: MessageActionType.ERROR_SENDING_MESSAGE,
  payload,
  meta,
});

export const sendMessage = <MessageContentType, MessageMetaType, MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MetaType = {}>(request: SendMessageRequest<MessageRequestType, MessageContentType, MessageMetaType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(sendingMessage(request, meta));

      pubnub.api.publish(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SendMessageResponse) => {
          if (status.error) {
            let payload: SendMessageError<MessageRequestType, MessageContentType, MessageMetaType> = {
              request,
              status,
            };

            dispatch(errorSendingmessage<MessageRequestType, MessageContentType, MessageMetaType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: SendMessageSuccess<MessageRequestType, MessageContentType, MessageMetaType> = {
              request,
              response,
              status,
            };

            dispatch(messageSent<MessageRequestType, MessageContentType, MessageMetaType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MessageActionType.SEND_MESSAGE_COMMAND;

  return thunkFunction;
};
