export interface Presence {
    channel: string;
    subscription: string | null; 
    actualChannel: null;
    subscribedChannel: string;
    action: string;
    state?: object;
    timetoken: string;
    occupancy: number;
    uuid: string;
    timestamp: number;
}