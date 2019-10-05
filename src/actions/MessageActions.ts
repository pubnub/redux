import { MessageActionPayload } from '../types/Message';
import { MESSAGE, MessageAction } from '../types/actions';
import { Dispatch } from 'redux';

export const createMessageActionListener = (
  dispatch: Dispatch<MessageAction>
) => ({
  message: (payload: MessageActionPayload): MessageAction =>
    dispatch({
      type: MESSAGE,
      payload,
    }),
});
