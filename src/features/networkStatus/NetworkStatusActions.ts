import { Dispatch } from 'redux';
import {
  NetworkStatusListenerActions,
  NetworkUpAction,
  NetworkDownAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { StatusActionPayload } from 'api/Status';

// tag::[RED-144]
export const networkUp = (): NetworkUpAction => ({
  type: ActionType.NETWORK_UP,
});
// end::[RED-144]

// tag::[RED-145]
export const networkDown = (): NetworkDownAction => ({
  type: ActionType.NETWORK_DOWN,
});
// end::[RED-145]

// tag::[RED-146]
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
// end::[RED-146]
