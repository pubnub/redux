import { NetworkStatusListenerActions } from './NetworkStatusListener';
import { NetworkStatusActionType } from './NetworkStatusActionType.enum';

// tag::RDX-type-state-networkstatus[]
export interface NetworkStatusState {
  isConnected: boolean;
}
// end::RDX-type-state-networkstatus[]

type NetworkStatusInitializerFunction = () => boolean;

// tag::RDX-reducer-networkstatus[]
export const createNetworkStatusReducer = (
  initializer: NetworkStatusInitializerFunction | boolean
) => {
  let initialState: NetworkStatusState;

  if (typeof initializer === 'boolean') {
    initialState = { isConnected: initializer };
  } else if (typeof initializer === 'function') {
    initialState = { isConnected: initializer() };
    if (typeof initialState.isConnected !== 'boolean') {
      throw new Error(
        'The initializer function must return a boolean value (true or false)'
      );
    }
  } else {
    throw new Error(
      'The initializer parameter must be a boolean value (true or false) or function'
    );
  }

  return function networkStatusReducer(
    state = initialState,
    action: NetworkStatusListenerActions
  ): NetworkStatusState {
    switch (action.type) {
      case NetworkStatusActionType.NETWORK_UP_EVENT:
        return {
          isConnected: true,
        };
      case NetworkStatusActionType.NETWORK_DOWN_EVENT:
        return {
          isConnected: false,
        };
      default:
        return state;
    }
  };
};
// end::RDX-reducer-networkstatus[]
