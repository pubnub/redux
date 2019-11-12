import { Dispatch } from 'redux';
import { SignalAction } from './SignalActions';
import { SignalActionPayload } from './Signal';
import { SignalActionType } from './SignalActionType.enum';

export const createSignalListener = (dispatch: Dispatch<SignalAction>) => ({
  signal: (payload: SignalActionPayload): SignalAction =>
    dispatch({
      type: SignalActionType.SIGNAL,
      payload,
    }),
});
