import {
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusListenerActions,
} from './Actions';
import { actionType } from './ActionType.enum';
import { StatusActionPayload } from '../api/Status';
import { Dispatch } from 'redux';

export const reconnected = (
  payload: StatusActionPayload
): ReconnectedAction => ({
  type: actionType.RECONNECTED,
  payload,
});

export const connected = (payload: StatusActionPayload): ConnectedAction => ({
  type: actionType.CONNECTED,
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
