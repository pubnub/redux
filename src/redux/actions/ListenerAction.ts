import { createPresenceActions } from './PresenceActions';
import { createStatusActions } from './StatusActions';
import { createMessageActions } from './MessageActions';
import { createSignalActions } from './SignalActions';
import { createUserActions } from './UserActions';
import { createSpaceActions } from './SpaceActions';
import { createMembershipActions } from './MembershipActions';

export const createPubNubActions = (payload: any) => {
  createMessageActions(payload);
  createPresenceActions(payload);
  createStatusActions(payload);
  createSignalActions(payload);
  createUserActions(payload);
  createSpaceActions(payload);
  createMembershipActions(payload);
};
