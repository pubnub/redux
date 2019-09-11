export interface Message {
    channel: string;
    subscription: string | null;
    timetoken: string;
    message: string;
}