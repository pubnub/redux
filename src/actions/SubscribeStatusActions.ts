import {
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusListenerActions,
} from './Actions';
import { actionType } from './ActionType.enum';
import { StatusActionPayload } from '../api/Status';
import { Dispatch } from 'redux';

// tag::[RED-153]
export const reconnected = (
  payload: StatusActionPayload
): ReconnectedAction => ({
  type: actionType.RECONNECTED,
  payload,
});
// end::[RED-153]

// tag::[RED-154]
export const connected = (payload: StatusActionPayload): ConnectedAction => ({
  type: actionType.CONNECTED,
  payload,
});
// end::[RED-154]

// tag::[RED-155]
export const createSubscribeStatusActionListener = (
  dispatch: Dispatch<SubscriptionStatusListenerActions>
) => ({
  status: (payload: StatusActionPayload) => {
    switch (payload.category) {
      case 'PNReconnectedCategory':
        dispatch(reconnected(payload));
        break;
      case 'PNConnectedCategory':
        dispatch(connected(payload));
        break;
      default:
        break;
    }
  },
});
// end::[RED-155]
