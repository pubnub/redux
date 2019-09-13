import { MessageActionPayload } from '../types/Message';
import { AppActions } from '../types/actions';

export const createMessageActions = (
  payload: MessageActionPayload
): AppActions => ({
  type: 'pubnub/MESSAGE',
  payload,
});
