import { Dispatch } from 'redux';
import {
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusResponse,
} from './SubscribeStatusActions';
import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';
import { SubscriptionStatusCategory } from './SubscriptionStatusCategory.enum';

export const reconnected = (
  payload: SubscriptionStatusResponse
): ReconnectedAction => ({
  type: SubscriptionStatusActionType.RECONNECTED_EVENT,
  payload,
});

export const connected = (
  payload: SubscriptionStatusResponse
): ConnectedAction => ({
  type: SubscriptionStatusActionType.CONNECTED_EVENT,
  payload,
});

export type SubscriptionStatusListenerActions =
  | ReconnectedAction
  | ConnectedAction;

export const createSubscriptionStatusListener = (
  dispatch: Dispatch<SubscriptionStatusListenerActions>
) => ({
  status: (payload: SubscriptionStatusResponse) => {
    switch (payload.category) {
      case SubscriptionStatusCategory.PN_CONNECTED_CATEGORY:
        dispatch(connected(payload));
        break;
      case SubscriptionStatusCategory.PN_RECONNECTED_CATEGORY:
        dispatch(reconnected(payload));
        break;
      default:
        break;
    }
  },
});
