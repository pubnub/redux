import { Dispatch } from 'redux';
import {
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusResponse,
} from './SubscribeStatusActions';
import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';
import { SubscriptionStatusCategory } from './SubscriptionStatusCategory.enum';

// tag::RDX-event-subscription-reconnect[]
export const reconnected = (
  payload: SubscriptionStatusResponse
): ReconnectedAction => ({
  type: SubscriptionStatusActionType.RECONNECTED_EVENT,
  payload,
});
// end::RDX-event-subscription-reconnect[]

// tag::RDX-event-subscription-connect[]
export const connected = (
  payload: SubscriptionStatusResponse
): ConnectedAction => ({
  type: SubscriptionStatusActionType.CONNECTED_EVENT,
  payload,
});
// end::RDX-event-subscription-connect[]

// tag::RDX-event-subscription-status[]
export type SubscriptionStatusListenerActions =
  | ReconnectedAction
  | ConnectedAction;
// end::RDX-event-subscription-status[]

// tag::RDX-method-listener-subscription[]
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
// end::RDX-method-listener-subscription[]
