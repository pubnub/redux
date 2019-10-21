import { MessageActionPayload } from '../api/Message';
import { MessageAction } from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';

export const createMessageActionListener = (
  dispatch: Dispatch<MessageAction>
) => ({
  message: (payload: MessageActionPayload): MessageAction =>
    dispatch({
      type: actionType.MESSAGE,
      payload,
    }),
});
