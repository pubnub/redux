export interface Message {
  channel: string;
  message: object;
  publisher: string;
  subscription: string | null;
  timetoken: string;
}
