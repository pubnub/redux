import { createPresenceActions } from './PresenceActions';
import { createStatusActions } from './StatusActions';
import { createMessageActions } from './MessageActions';

export const createPubNubActions = (payload: any) => {
        createMessageActions(payload);
        createPresenceActions(payload);
        createStatusActions(payload);
}