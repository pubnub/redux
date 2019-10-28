import {
  MessageAction,
  SendMessageAction,
  SendMessageBeginAction,
  SendMessageErrorAction,
} from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';
import { Message } from '../api/Message';
import {
  PubNubApiStatus,
  PubNubObjectApiError,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';

// tag::[RED-139]
export const sendMessageBegin = <T extends { channel: string }>(
  payload: T
): SendMessageBeginAction<T> => ({
  type: actionType.SEND_MESSAGE_BEGIN,
  payload,
});
// end::[RED-139]

// tag::[RED-140]
export const sendMessageSuccess = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>
): SendMessageAction<T> => ({
  type: actionType.SEND_MESSAGE,
  payload,
});
// end::[RED-140]

// tag::[RED-141]
export const sendMessageError = <T extends { channel: string }>(
  payload: PubNubObjectApiError<T>
): SendMessageErrorAction<T> => ({
  type: actionType.SEND_MESSAGE_ERROR,
  payload,
});
// end::[RED-141]

// tag::[RED-142]
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
// end::[RED-142]

// tag::[RED-143]
export const createMessageActionListener = (
  dispatch: Dispatch<MessageAction>
) => ({
  message: (payload: Message): MessageAction =>
    dispatch({
      type: actionType.MESSAGE,
      payload,
    }),
});
// end::[RED-143]
