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
} from '../../../api/PubNubApi';

const sendingMessage = <T extends { channel: string }>(
  payload: T
): SendingMessageAction<T> => ({
  type: ActionType.SENDING_MESSAGE,
  payload,
});

const messageSent = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>
): MessageSentAction<T> => ({
  type: ActionType.MESSAGE_SENT,
  payload,
});

const errorSendingmessage = <T extends { channel: string }>(
  payload: PubNubObjectApiError<T>
): ErrorSendingMessageAction<T> => ({
  type: ActionType.ERROR_SENDING_MESSAGE,
  payload,
});

export const sendMessage = (pubnub: any, message: Message) => (
  dispatch: Dispatch
) => {
  dispatch(sendingMessage(message));

  pubnub.publish(
    {
      ...message,
    },
    (status: PubNubApiStatus) => {
      if (status.error) {
        let errorData = { id: message.channel, value: { ...message } };

        dispatch(
          errorSendingmessage({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          messageSent({
            data: {
              ...message,
            },
          })
        );
      }
    }
  );
};
