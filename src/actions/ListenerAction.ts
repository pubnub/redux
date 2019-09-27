import { createPresenceActionListener } from './PresenceActions';
import { createStatusActionListener } from './StatusActions';
import { createMessageActionListener } from './MessageActions';
import { createSignalActionListener } from './SignalActions';
import { createUserActionListener } from './UserActions';
import { createSpaceActionListener } from './SpaceActions';
import { createMembershipActionListener } from './MembershipActions';
import { Dispatch } from 'redux';
import { AppActions } from '../types/actions';

export const createPubNubActionListener = (dispatch: Dispatch<AppActions>) =>
  combineListeners(
    createMessageActionListener(dispatch),
    createPresenceActionListener(dispatch),
    createSignalActionListener(dispatch),
    createUserActionListener(dispatch),
    createSpaceActionListener(dispatch),
    createMembershipActionListener(dispatch),
    createStatusActionListener(dispatch)
  );

export const combineListeners = (...reducers: any[]) => {
  return Object.assign({}, ...reducers);
};
