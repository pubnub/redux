import { createPresenceActionListener } from './PresenceActions';
import { createStatusActionListener } from './StatusActions';
import { createMessageActionListener } from './MessageActions';
import { createSignalActionListener } from './SignalActions';
import { createUserActionListener } from './UserActions';
import { createSpaceActionListener } from './SpaceActions';
import { createMembershipActionListener } from './MembershipActions';

export const createPubNubActionListener = (payload: any) => ({
  message: createMessageActionListener(payload),
  presence: createPresenceActionListener(payload),
  signal: createSignalActionListener(payload),
  user: createUserActionListener(payload),
  space: createSpaceActionListener(payload),
  membership: createMembershipActionListener(payload),
  status: createStatusActionListener(payload),
});
