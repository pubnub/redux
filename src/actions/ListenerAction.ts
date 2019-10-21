import { createPresenceActionListener } from './PresenceActions';
import { createNetworkStatusActionListener } from './NetworkStatusActions';
import { createSubscribeStatusActionListener } from './SubscribeStatusActions';
import { createErrorStatusActionListener } from './ErrorStatusActions';
import { createMessageActionListener } from './MessageActions';
import { createSignalActionListener } from './SignalActions';
import { createUserActionListener } from '../listeners/UserListener';
import { createSpaceActionListener } from '../listeners/SpaceListener';
import { createMembershipActionListener } from '../listeners/MembershipListener';
import { Dispatch } from 'redux';
import { ListenerActions } from './Actions';
import { ListenerEventData } from 'api/PubNubApi';

export const createPubNubActionListener = <T extends ListenerEventData>(
  dispatch: Dispatch<ListenerActions<T>>
) =>
  combineListeners(
    createMessageActionListener(dispatch),
    createPresenceActionListener(dispatch),
    createSignalActionListener(dispatch),
    createUserActionListener<T>(dispatch),
    createSpaceActionListener<T>(dispatch),
    createMembershipActionListener<T>(dispatch),
    createNetworkStatusActionListener(dispatch),
    createSubscribeStatusActionListener(dispatch),
    createErrorStatusActionListener(dispatch)
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
    let listenerType = Object.keys(listener)[0];

    if (!incomingListeners.hasOwnProperty(listenerType)) {
      incomingListeners[listenerType] = [];
    }

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
        result.push(createCombinedListener(listenerType, listenersOfType));
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
const createCombinedListener = (listenerType: string, listeners: any): any => {
  // returns a single listener which invokes each of the incomming listeners
  return {
    [listenerType]: (payload: any) => {
      listeners.forEach((listener: any) => listener[listenerType](payload));
    },
  };
};
