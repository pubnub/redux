import { Dispatch } from 'redux';
import {
  NetworkUpEventAction,
  NetworkDownEventAction,
  NetworkStatusResponse,
} from './NetworkStatusActions';
import { NetworkStatusActionType } from './NetworkStatusActionType.enum';
import { NetworkStatusCategory } from './NetworkStatusCategory.enum';

// tag::RDX-type-networkup[]
export const networkUp = (): NetworkUpEventAction => ({
  type: NetworkStatusActionType.NETWORK_UP_EVENT,
});
// end::RDX-type-networkup[]

// tag::RDX-type-networkdown[]
export const networkDown = (): NetworkDownEventAction => ({
  type: NetworkStatusActionType.NETWORK_DOWN_EVENT,
});
// end::RDX-type-networkdown[]

// tag::RDX-type-networkstatus[]
export type NetworkStatusListenerActions =
  | NetworkUpEventAction
  | NetworkDownEventAction;
// end::RDX-type-networkstatus[]

// tag::RDX-method-listener-networkstatus[]
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
// end::RDX-method-listener-networkstatus[]
