import { Dispatch } from 'redux';
import { createMessageListener } from '../message/MessageListener';
import { createPresenceListener } from '../presence/PresenceListener';
import { createSignalListener } from '../signal/SignalListener';
import { createErrorStatusListener } from '../errorStatus/ErrorStatusListener';
import { createNetworkStatusListener } from '../networkStatus/NetworkStatusListener';
import { createSubscriptionStatusListener } from '../subscriptionStatus/SubscriptionStatusListener';
import { createMembershipListener } from '../membership/MembershipListener';
import { createChannelDataListener } from '../channel/ChannelDataListener';
import { createUserDataListener } from '../user/UserDataListener';
import { combineListeners } from '../../foundations/CombineListeners';

export const createPubNubListener = (dispatch: Dispatch) =>
  combineListeners(
    createMessageListener(dispatch),
    createPresenceListener(dispatch),
    createSignalListener(dispatch),
    createErrorStatusListener(dispatch),
    createErrorStatusListener(dispatch),
    createNetworkStatusListener(dispatch),
    createSubscriptionStatusListener(dispatch),
    createUserDataListener(dispatch),
    createChannelDataListener(dispatch),
    createMembershipListener(dispatch)
  );
