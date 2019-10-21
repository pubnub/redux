import { SignalActionPayload } from '../api/Signal';
import { SignalAction } from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';

export const createSignalActionListener = (
  dispatch: Dispatch<SignalAction>
) => ({
  signal: (payload: SignalActionPayload): SignalAction =>
    dispatch({
      type: actionType.SIGNAL,
      payload,
    }),
});
