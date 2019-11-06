import { SubscriptionStatusActionType } from './SubscriptionStatusActionType.enum';
import { SubscriptionStatusCategory } from './SubscriptionStatusCategory.enum';

// tag::RDX-026[]
export interface SubscriptionStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: SubscriptionStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-026[]

// tag::RDX-076[]
export interface ReconnectedAction {
  type: typeof SubscriptionStatusActionType.RECONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}
// end::RDX-076[]

// tag::RDX-077[]
export interface ConnectedAction {
  type: typeof SubscriptionStatusActionType.CONNECTED_EVENT;
  payload: SubscriptionStatusResponse;
}
// end::RDX-077[]
