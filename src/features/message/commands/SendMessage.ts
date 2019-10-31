import { Dispatch } from 'redux';
import {
  MessageSentAction,
  SendingMessageAction,
  ErrorSendingMessageAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { Message } from '../../../api/Message';
import {
  PubNubApiStatus,
  PubNubObjectApiError,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';

export const sendingMessage = <T extends { channel: string }>(
  payload: T,
  meta?: Meta
): SendingMessageAction<T> => ({
  type: ActionType.SENDING_MESSAGE,
  payload,
  meta,
});

export const messageSent = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): MessageSentAction<T> => ({
  type: ActionType.MESSAGE_SENT,
  payload,
  meta,
});

export const errorSendingmessage = <T extends { channel: string }>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorSendingMessageAction<T> => ({
  type: ActionType.ERROR_SENDING_MESSAGE,
  payload,
  meta,
});

export const sendMessage = (pubnub: any, message: Message, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(sendingMessage(message, meta));

      pubnub.publish(
        {
          ...message,
        },
        (status: PubNubApiStatus) => {
          if (status.error) {
            let errorData = { id: message.channel, value: { ...message } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorSendingmessage(payload, meta));
            reject(payload);
          } else {
            dispatch(messageSent({ data: { ...message } }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
