import { Dispatch } from 'redux';
import { MessageReceivedAction } from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { PubNubObjectApiSuccess } from 'api/PubNubApi';

const messageRecieved = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>
): MessageReceivedAction<T> => ({
  type: ActionType.MESSAGE_RECEIVED,
  payload,
});

export const createMessageActionListener = <T extends { channel: string }>(
  dispatch: Dispatch<MessageReceivedAction<T>>
) => ({
  message: (payload: T): MessageReceivedAction<T> =>
    dispatch(messageRecieved<T>({ data: payload })),
});
