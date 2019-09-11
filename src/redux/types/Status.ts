export interface Status {
    affectedChannelGroups: Array<string>;
    affectedChannels: Array<string>;
    category: string;
    operation: string;
    lastTimetoken: string;
    currentTimetoken: string;
    subscribedChannels: Array<string>;
}