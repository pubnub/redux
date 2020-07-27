import Pubnub, {
  PresenceEvent,
  SignalEvent,
  MessageActionEvent,
  StatusEvent,
  ObjectsEvent,
} from 'pubnub';
import { Dispatch } from 'redux';
import { createPresenceListener } from '../presence/PresenceListener';
import {
  createNetworkStatusListener,
  NetworkStatusListenerActions,
} from '../networkStatus/NetworkStatusListener';
import {
  createSubscriptionStatusListener,
  SubscriptionStatusListenerActions,
} from '../subscriptionStatus/SubscriptionStatusListener';
import {
  createErrorStatusListener,
  ErrorStatusListenerActions,
} from '../errorStatus/ErrorStatusListener';
import { createMessageListener } from '../message/MessageListener';
import { createSignalListener } from '../signal/SignalListener';
import { createUserDataListener } from '../user/UserDataListener';
import { createChannelDataListener } from '../channel/ChannelDataListener';
import { createMembershipListener } from '../membership/MembershipListener';
import {
  Message,
  MessageReceivedAction,
} from 'features/message/MessageActions';
import { UserDataListenerActions } from 'features/user/UserDataActions';
import {
  ChannelDataListenerActions,
  Channel,
} from 'features/channel/ChannelDataActions';
import { PresenceListenerActions } from 'features/presence/PresenceActions';
import { SignalReceivedAction, Signal } from 'features/signal/SignalActions';
import { MembershipListenerActions } from 'features/membership/MembershipActions';
import { ObjectsCustom, GetChannelCustom } from 'foundations/ObjectsCustom';

type ListenerType = keyof Pubnub.ListenerParameters;

export type ListenerActions<
  MessageType extends Message,
  SignalType extends Signal,
  UserCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  MembershipCustom extends ObjectsCustom
> =
  | MessageReceivedAction<MessageType>
  | PresenceListenerActions
  | SignalReceivedAction<SignalType>
  | UserDataListenerActions<UserCustom>
  | ChannelDataListenerActions<ChannelCustom>
  | MembershipListenerActions<MembershipCustom>
  | NetworkStatusListenerActions
  | SubscriptionStatusListenerActions
  | ErrorStatusListenerActions;

export const createPubNubListener = <
  MessageType extends Message,
  SignalType extends Signal,
  UserCustom extends ObjectsCustom,
  ChannelType extends Channel,
  MembershipCustom extends ObjectsCustom
>(
  dispatch: Dispatch<
    ListenerActions<
      MessageType,
      SignalType,
      UserCustom,
      GetChannelCustom<ChannelType>,
      MembershipCustom
    >
  >
) =>
  combineListeners(
    createMessageListener<MessageType>(dispatch),
    createPresenceListener(dispatch),
    createSignalListener(dispatch),
    createUserDataListener<UserCustom>(dispatch),
    createChannelDataListener<ChannelType>(dispatch),
    createMembershipListener<MembershipCustom>(dispatch),
    createNetworkStatusListener(dispatch),
    createSubscriptionStatusListener(dispatch),
    createErrorStatusListener(dispatch)
  );

/**
 * Combines multiple listener objects into one object that supports all of them.
 *
 * @param listeners Array of listener objects.
 * @returns The combined listener Object.
 */
export const combineListeners = (...listeners: any[]) => {
  return Object.assign({}, ...mergeListenersByType(listeners));
};

/**
 * Take a list of listeners and combine any listeners of the same type together.
 *
 * @param listeners Array of listener objects.
 * @returns Array of listener objects with like types combined to single listener object.
 */
const mergeListenersByType = (listeners: any[]): any[] => {
  const result: any[] = [];
  const incomingListeners: { [key: string]: any[] } = {};

  // group the listeners by type so we can combine them
  listeners.forEach((listener) => {
    // each listener is a key/value pair
    // the key is the listener type, the value is the handler function
    const listenerType = Object.keys(listener)[0];

    incomingListeners[listenerType] = incomingListeners[listenerType] || [];

    incomingListeners[listenerType].push(listener);
  });

  // merge the grouped listeners and add to the result list
  Object.entries(incomingListeners).forEach(
    ([listenerType, listenersOfType]) => {
      if (listenersOfType.length === 1) {
        // only one listener for this type so add directly to the result list
        result.push(listenersOfType[0]);
      } else if (listenersOfType.length > 1) {
        // multiple listeners for this type so combine them and add to the result list
        result.push(
          createCombinedListener(listenerType as ListenerType, listenersOfType)
        );
      }
    }
  );

  return result;
};

/**
 * Take a list of listeners of the same type and combine to single listener object.
 * For example an array of status listener objects combined to a single status listener object.
 *
 * @param listenerType The listener type.
 * @param listeners The Array of listeners of the same type.
 */
const createCombinedListener = (
  listenerType: ListenerType,
  listeners: Pubnub.ListenerParameters[]
): Pubnub.ListenerParameters => {
  // returns a single listener which invokes each of the incomming listeners
  return {
    [listenerType]: (
      payload: MessageEvent &
        PresenceEvent &
        SignalEvent &
        StatusEvent &
        MessageActionEvent &
        ObjectsEvent
    ) => {
      listeners.forEach((listener: Pubnub.ListenerParameters) => {
        const f = listener[listenerType];
        if (f) {
          f(payload);
        }
      });
    },
  };
};
