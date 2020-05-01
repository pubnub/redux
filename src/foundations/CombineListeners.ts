import Pubnub, {
  PresenceEvent,
  SignalEvent,
  UserEvent,
  SpaceEvent,
  MessageActionEvent,
  StatusEvent,
  MembershipEvent,
} from 'pubnub';

/**
 * Combines multiple listener objects into one object that supports all of them.
 *
 * @param listeners Array of listener objects.
 * @returns The combined listener Object.
 */
export const combineListeners = (...listeners: Pubnub.ListenerParameters[]) => {
  return Object.assign({}, ...mergeListenersByType(listeners));
};

/**
 * Take a list of listeners and combine listeners of the same type together.
 *
 * @param listeners Array of listener objects.
 * @returns Array of listener objects with like types combined to single listener object.
 */
const mergeListenersByType = (
  listeners: Pubnub.ListenerParameters[]
): Pubnub.ListenerParameters[] => {
  const result: Pubnub.ListenerParameters[] = [];
  const incomingListeners: {
    [key in keyof Pubnub.ListenerParameters]: Pubnub.ListenerParameters[];
  } = {};

  // group the listeners by type so we can combine them
  listeners.forEach((listener) => {
    if (listener.message !== undefined) {
      if (incomingListeners.message === undefined) {
        incomingListeners['message'] = [];
      }

      incomingListeners['message'].push(listener);
    }

    if (listener.presence !== undefined) {
      if (incomingListeners.presence === undefined) {
        incomingListeners['presence'] = [];
      }

      incomingListeners['presence'].push(listener);
    }

    if (listener.signal !== undefined) {
      if (incomingListeners.signal === undefined) {
        incomingListeners['signal'] = [];
      }

      incomingListeners['signal'].push(listener);
    }

    if (listener.user !== undefined) {
      if (incomingListeners.user === undefined) {
        incomingListeners['user'] = [];
      }

      incomingListeners['user'].push(listener);
    }

    if (listener.space !== undefined) {
      if (incomingListeners.space === undefined) {
        incomingListeners['space'] = [];
      }

      incomingListeners['space'].push(listener);
    }

    if (listener.membership !== undefined) {
      if (incomingListeners.membership === undefined) {
        incomingListeners['membership'] = [];
      }

      incomingListeners['membership'].push(listener);
    }

    if (listener.status !== undefined) {
      if (incomingListeners.status === undefined) {
        incomingListeners['status'] = [];
      }

      incomingListeners['status'].push(listener);
    }
  });

  // merge the grouped listeners and add to the result list
  Object.entries(incomingListeners).forEach(
    ([listenerType, listenersOfType]) => {
      if (listenersOfType && listenersOfType.length === 1) {
        // only one listener for this type so add directly to the result list
        result.push(listenersOfType[0]);
      } else if (listenersOfType && listenersOfType.length > 1) {
        // multiple listeners for this type so combine them and add to the result list
        result.push(
          createCombinedListener(
            listenerType as keyof Pubnub.ListenerParameters,
            listenersOfType
          )
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
  listenerType: keyof Pubnub.ListenerParameters,
  listeners: Pubnub.ListenerParameters[]
): Pubnub.ListenerParameters => {
  // returns a single listener which invokes each of the incomming listeners
  return {
    [listenerType]: (
      payload: MessageEvent &
        PresenceEvent &
        SignalEvent &
        UserEvent &
        SpaceEvent &
        MembershipEvent &
        StatusEvent &
        MessageActionEvent
    ) => {
      listeners.forEach((listener) => {
        const currentListener = listener[listenerType];

        if (currentListener !== undefined) {
          currentListener(payload);
        }
      });
    },
  };
};
