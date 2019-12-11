import { SubscriptionStatusListenerActions } from './SubscriptionStatusListener';
import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';

// tag::RDX-state-subscription[]
export interface SubscriptionState {
  channels: string[];
}
// end::RDX-state-subscription[]

const createInitialState = (): SubscriptionState => {
  return { channels: [] };
};

// tag::RDX-method-reducer-subscription[]
export const createSubscriptionStatusReducer = () => {
  return (
    state = createInitialState(),
    action: SubscriptionStatusListenerActions
  ): SubscriptionState => {
    switch (action.type) {
      case SubscriptionStatusActionType.CONNECTED_EVENT:
        return {
          channels: action.payload.subscribedChannels,
        };
      case SubscriptionStatusActionType.RECONNECTED_EVENT:
        return {
          channels: action.payload.subscribedChannels,
        };
      default:
        return state;
    }
  };
};
// end::RDX-method-reducer-subscription[]
