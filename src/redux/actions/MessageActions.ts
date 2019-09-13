import { MessageActionPayload } from '../types/Message';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const createMessageActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: MessageActionPayload
): AppActions =>
  dispatch({
    type: 'pubnub/MESSAGE',
    payload,
  });
