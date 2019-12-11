import { NetworkStatusActionType } from './NetworkStatusActionType.enum';
import { NetworkStatusCategory } from './NetworkStatusCategory.enum';

// tag::RDX-action-networkstatus-response[]
export interface NetworkStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: NetworkStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-action-networkstatus-response[]

// tag::RDX-action-networkstatus-event-up[]
export interface NetworkUpEventAction {
  type: typeof NetworkStatusActionType.NETWORK_UP_EVENT;
}
// end::RDX-action-networkstatus-event-up[]

// tag::RDX-action-networkstatus-event-down[]
export interface NetworkDownEventAction {
  type: typeof NetworkStatusActionType.NETWORK_DOWN_EVENT;
}
// end::RDX-action-networkstatus-event-down[]
