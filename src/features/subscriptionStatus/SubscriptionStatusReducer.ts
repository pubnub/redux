import { SubscriptionStatusListenerActions } from './SubscriptionStatusListener';
import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';

export interface SubscriptionState {
  channels: string[];
}

const createInitialState = (): SubscriptionState => {
  return { channels: [] };
};

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
