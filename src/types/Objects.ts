import { User } from './User';

export interface ObjectsActionPayload {
  channel: string;
  message: {
    data: {
      eTag: string;
      id: string;
      name: string;
      updated: string;
    };
    event: string;
    type: string;
  };
  publisher?: string;
  subscription?: string;
  timetoken: string;
}

export interface ObjectsStatusPayload {
  error: boolean;
  operation: string;
  statusCode: number;
}

export interface ObjectsResponsePayload {
  status: number;
  data?: User;
}
