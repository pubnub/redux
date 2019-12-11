import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';
import { SubscriptionStatusCategory } from './SubscriptionStatusCategory.enum';

// tag::RDX-action-subscription-status[]
export interface SubscriptionStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: SubscriptionStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-action-subscription-status[]

// tag::RDX-action-subscription-recocnnect[]
export interface ReconnectedAction {
  type: typeof SubscriptionStatusActionType.RECONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}
// end::RDX-action-subscription-recocnnect[]

// tag::RDX-action-subscription-connect[]
export interface ConnectedAction {
  type: typeof SubscriptionStatusActionType.CONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}
// end::RDX-action-subscription-connect[]
