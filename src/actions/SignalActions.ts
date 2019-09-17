import { SignalActionPayload } from '../types/Signal';
import { AppActions, SIGNAL } from '../types/actions';
import { Dispatch } from 'redux';

export const createSignalActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: SignalActionPayload
): AppActions =>
  dispatch({
    type: SIGNAL,
    payload,
  });
