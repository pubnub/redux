export interface StatusActionPayload {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: string;
  operation: string;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
