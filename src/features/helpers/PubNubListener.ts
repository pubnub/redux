import { Dispatch } from 'redux';
import { createMessageListener } from '../message/MessageListener';
import { createPresenceListener } from '../presence/PresenceListener';
import { createSignalListener } from '../signal/SignalListener';
import { createErrorStatusListener } from '../errorStatus/ErrorStatusListener';
import { createNetworkStatusListener } from '../networkStatus/NetworkStatusListener';
import { createSubscriptionStatusListener } from '../subscriptionStatus/SubscriptionStatusListener';
import { createMembershipListener } from '../membership/MembershipListener';
import { createSpaceListener } from '../space/SpaceListener';
import { createUserListener } from '../user/UserListener';
import { combineListeners } from '../../foundations/Combinelisteners';

export const createPubNubListener = (dispatch: Dispatch) =>
  combineListeners(
    createMessageListener(dispatch),
    createPresenceListener(dispatch),
    createSignalListener(dispatch),
    createErrorStatusListener(dispatch),
    createErrorStatusListener(dispatch),
    createNetworkStatusListener(dispatch),
    createSubscriptionStatusListener(dispatch),
    createUserListener(dispatch),
    createSpaceListener(dispatch),
    createMembershipListener(dispatch)
  );
