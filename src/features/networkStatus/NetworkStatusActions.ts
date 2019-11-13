import { NetworkStatusActionType } from './NetworkStatusActionType.enum';
import { NetworkStatusCategory } from './NetworkStatusCategory.enum';

// tag::RDX-026[]
export interface NetworkStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: NetworkStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-026[]

// tag::RDX-073[]
export interface NetworkUpEventAction {
  type: typeof NetworkStatusActionType.NETWORK_UP_EVENT;
}
// end::RDX-073[]

// tag::RDX-074[]
export interface NetworkDownEventAction {
  type: typeof NetworkStatusActionType.NETWORK_DOWN_EVENT;
}
// end::RDX-074[]
