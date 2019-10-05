import {
  NETWORK_UP,
  NETWORK_DOWN,
  NetworkStatusListenerActions,
  NetworkUpAction,
  NetworkDownAction,
} from '../types/actions';
import { StatusActionPayload } from '../types/Status';
import { Dispatch } from 'redux';

export const networkUp = (): NetworkUpAction => ({
  type: NETWORK_UP,
});

export const networkDown = (): NetworkDownAction => ({
  type: NETWORK_DOWN,
});

export const createNetworkStatusActionListener = (
  dispatch: Dispatch<NetworkStatusListenerActions>
) => ({
  status: (payload: StatusActionPayload) => {
    switch (payload.category) {
      case 'PNNetworkUpCategory':
        dispatch(networkUp());
        break;
      case 'PNNetworkDownCategory':
        dispatch(networkDown());
        break;
      case 'PNNetworkIssuesCategory':
        dispatch(networkDown());
        break;
      case 'PNReconnectedCategory':
        dispatch(networkUp());
        break;
      case 'PNConnectedCategory':
        dispatch(networkUp());
        break;
      case 'PNTimeoutCategory':
        dispatch(networkDown());
        break;
      default:
        break;
    }
  },
});
