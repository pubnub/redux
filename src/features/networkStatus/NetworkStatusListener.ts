import { Dispatch } from 'redux';
import {
  NetworkUpEventAction,
  NetworkDownEventAction,
  NetworkStatusResponse,
} from './NetworkStatusActions';
import { NetworkStatusActionType } from './NetworkStatusActionType.enum';
import { NetworkStatusCategory } from './NetworkStatusCategory.enum';

// tag::RDX-155[]
export const networkUp = (): NetworkUpEventAction => ({
  type: NetworkStatusActionType.NETWORK_UP_EVENT,
});
// end::RDX-155[]

// tag::RDX-156[]
export const networkDown = (): NetworkDownEventAction => ({
  type: NetworkStatusActionType.NETWORK_DOWN_EVENT,
});
// end::RDX-156[]

export type NetworkStatusListenerActions =
  | NetworkUpEventAction
  | NetworkDownEventAction;

export const createNetworkStatusListener = (
  dispatch: Dispatch<NetworkStatusListenerActions>
) => ({
  status: (payload: NetworkStatusResponse) => {
    switch (payload.category) {
      case NetworkStatusCategory.PN_NETWORK_UP_CATEGORY:
        dispatch(networkUp());
        break;
      case NetworkStatusCategory.PN_NETWORK_DOWN_CATEGORY:
        dispatch(networkDown());
        break;
      case NetworkStatusCategory.PN_RECONNECTED_CATEGORY:
        dispatch(networkUp());
        break;
      case NetworkStatusCategory.PN_CONNECTED_CATEGORY:
        dispatch(networkUp());
        break;
      case NetworkStatusCategory.PN_TIMEOUT_CATEGORY:
        dispatch(networkDown());
        break;
      default:
        break;
    }
  },
});
