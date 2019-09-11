import { Message } from '../types/Message';
import { AppActions } from '../types/actions';

export const createMessageActions = (payload: Message): AppActions => ({
  type: 'pubnub/MESSAGE',
  payload,
});
