import { SignalActionPayload } from '../types/Signal';
import { SIGNAL, SignalAction } from '../types/actions';
import { Dispatch } from 'redux';

export const createSignalActionListener = (
  dispatch: Dispatch<SignalAction>
) => ({
  signal: (payload: SignalActionPayload): SignalAction =>
    dispatch({
      type: SIGNAL,
      payload,
    }),
});
