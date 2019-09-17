export interface MessageActionPayload {
  channel: string;
  message: object;
  publisher: string;
  subscription: string | null;
  timetoken: string;
}
