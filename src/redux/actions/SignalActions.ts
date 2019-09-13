import { SignalActionPayload } from '../types/Signal';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const createSignalActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: SignalActionPayload
): AppActions =>
  dispatch({
    type: 'pubnub/SIGNAL',
    payload,
  });
