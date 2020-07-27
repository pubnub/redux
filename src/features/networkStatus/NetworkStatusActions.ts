import { NetworkStatusActionType } from './NetworkStatusActionType.enum';
import { NetworkStatusCategory } from './NetworkStatusCategory.enum';

export interface NetworkStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: NetworkStatusCategory;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}

export interface NetworkUpEventAction {
  type: typeof NetworkStatusActionType.NETWORK_UP_EVENT;
}

export interface NetworkDownEventAction {
  type: typeof NetworkStatusActionType.NETWORK_DOWN_EVENT;
}
