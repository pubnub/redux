import { SubscriptionStatusListenerActions } from './SubscriptionStatusListener';
import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';

export interface SubscriptionState {
  channels: string[];
}

export const createSubscriptionStatusReducer = () => {
  return (
    state = { channels: [] },
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
