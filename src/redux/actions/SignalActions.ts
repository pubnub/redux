import { SignalActionPayload } from '../types/Signal';
import { AppActions } from '../types/actions';

export const createSignalActions = (
  payload: SignalActionPayload
): AppActions => ({
  type: 'pubnub/SIGNAL',
  payload,
});
