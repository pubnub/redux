import Pubnub, {
  PresenceEvent,
  SignalEvent,
  MessageActionEvent,
  StatusEvent,
  ObjectsEvent,
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
    const allowedListeners = [
      'status',
      'message',
      'presence',
      'signal',
      'messageAction',
      'objects',
    ] as const;
    for (const listenerType of allowedListeners) {
      if (listener[listenerType] !== undefined) {
        if (incomingListeners[listenerType] === undefined) {
          incomingListeners[listenerType] = [];
        }

        incomingListeners[listenerType]?.push(listener);
      }
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
        StatusEvent &
        MessageActionEvent &
        ObjectsEvent
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
