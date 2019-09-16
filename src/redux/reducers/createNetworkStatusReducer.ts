import { StatusActionTypes } from '../types/actions';
import { NetworkStatus } from '../types/NetworkStatus';

export const createNetworkStatusReducer = (initializer: Function | boolean) => {
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
    action: StatusActionTypes
  ): NetworkStatus {
    switch (action.type) {
      case 'pubnub/NETWORK_UP':
        return {
          ...state,
          isConnected: true,
        };
      case 'pubnub/NETWORK_DOWN':
        return {
          ...state,
          isConnected: false,
        };
      default:
        return state;
    }
  };
};
