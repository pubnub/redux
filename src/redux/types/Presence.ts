export interface PresenceActionPayload {
  channel: string;
  subscription: string | null;
  actualChannel: string | null;
  subscribedChannel: string;
  action: string;
  state?: object;
  timetoken: string;
  occupancy: number;
  uuid: string;
  timestamp: number;
}
