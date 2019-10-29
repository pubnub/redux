import { Dispatch } from 'redux';
import {
  MessageAction,
  SendMessageAction,
  SendMessageBeginAction,
  SendMessageErrorAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Message } from 'api/Message';
import {
  PubNubApiStatus,
  PubNubObjectApiError,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';

export const sendMessageBegin = <T extends { channel: string }>(
  payload: T
): SendMessageBeginAction<T> => ({
  type: ActionType.SEND_MESSAGE_BEGIN,
  payload,
});

export const sendMessageSuccess = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>
): SendMessageAction<T> => ({
  type: ActionType.SEND_MESSAGE,
  payload,
});

export const sendMessageError = <T extends { channel: string }>(
  payload: PubNubObjectApiError<T>
): SendMessageErrorAction<T> => ({
  type: ActionType.SEND_MESSAGE_ERROR,
  payload,
});

export const sendMessage = (pubnub: any, message: Message) => (
  dispatch: Dispatch
) => {
  dispatch(sendMessageBegin(message));

  pubnub.publish(
    {
      ...message,
    },
    (status: PubNubApiStatus) => {
      if (status.error) {
        let errorData = { id: message.channel, value: { ...message } };

        dispatch(
          sendMessageError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          sendMessageSuccess({
            data: {
              ...message,
            },
          })
        );
      }
    }
  );
};

export const createMessageActionListener = (
  dispatch: Dispatch<MessageAction>
) => ({
  message: (payload: Message): MessageAction =>
    dispatch({
      type: ActionType.MESSAGE,
      payload,
    }),
});
