import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';
import { SubscriptionStatusCategory } from './SubscriptionStatusCategory.enum';

export interface SubscriptionStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: SubscriptionStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}

export interface ReconnectedAction {
  type: typeof SubscriptionStatusActionType.RECONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}

export interface ConnectedAction {
  type: typeof SubscriptionStatusActionType.CONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}
