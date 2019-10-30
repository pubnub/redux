import { Dispatch } from 'redux';
import {
  NetworkStatusListenerActions,
  NetworkUpAction,
  NetworkDownAction,
} from '../../actions/Actions';
import { ActionType } from '../../actions/ActionType.enum';
import { StatusActionPayload } from '../../api/Status';

const networkUp = (): NetworkUpAction => ({
  type: ActionType.NETWORK_UP,
});

const networkDown = (): NetworkDownAction => ({
  type: ActionType.NETWORK_DOWN,
});

export const createNetworkStatusListener = (
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
