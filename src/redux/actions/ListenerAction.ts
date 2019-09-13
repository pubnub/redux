import { createPresenceActionListener } from './PresenceActions';
import { createStatusActionListener } from './StatusActions';
import { createMessageActionListener } from './MessageActions';
import { createSignalActionListener } from './SignalActions';
import { createUserActionListener } from './UserActions';
import { createSpaceActionListener } from './SpaceActions';
import { createMembershipActionListener } from './MembershipActions';
import { Dispatch } from 'redux';
import { AppActions } from '../types/actions';

export const createPubNubActionListener = (dispatch: Dispatch<AppActions>) => ({
  message: createMessageActionListener(dispatch),
  presence: createPresenceActionListener(dispatch),
  signal: createSignalActionListener(dispatch),
  user: createUserActionListener(dispatch),
  space: createSpaceActionListener(dispatch),
  membership: createMembershipActionListener(dispatch),
  status: createStatusActionListener(dispatch),
});
