import { Signal } from '../types/Signal';
import { AppActions } from '../types/actions';

export const createSignalActions = (payload: Signal): AppActions => ({
  type: 'pubnub/SIGNAL',
  payload,
});
