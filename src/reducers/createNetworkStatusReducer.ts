import { NetworkStatusListenerActions } from '../actions/Actions';
import { actionType } from '../actions/ActionType.enum';
import { NetworkStatus } from '../api/NetworkStatus';

type NetworkStatusInitializerFunction = () => boolean;

export const createNetworkStatusReducer = (
  initializer: NetworkStatusInitializerFunction | boolean
) => {
  let initialState: NetworkStatus;

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
  ): NetworkStatus {
    switch (action.type) {
      case actionType.NETWORK_UP:
        return {
          ...state,
          isConnected: true,
        };
      case actionType.NETWORK_DOWN:
        return {
          ...state,
          isConnected: false,
        };
      default:
        return state;
    }
  };
};
