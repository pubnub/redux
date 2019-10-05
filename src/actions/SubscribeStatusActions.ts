import {
  RECONNECTED,
  CONNECTED,
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusListenerActions,
} from '../types/actions';
import { StatusActionPayload } from '../types/Status';
import { Dispatch } from 'redux';

export const reconnected = (
  payload: StatusActionPayload
): ReconnectedAction => ({
  type: RECONNECTED,
  payload,
});

export const connected = (payload: StatusActionPayload): ConnectedAction => ({
  type: CONNECTED,
  payload,
});

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
