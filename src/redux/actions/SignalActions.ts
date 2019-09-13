import { SignalActionPayload } from '../types/Signal';
import { AppActions } from '../types/actions';

export const createSignalActionListener = (
  payload: SignalActionPayload
): AppActions => ({
  type: 'pubnub/SIGNAL',
  payload,
});
