export interface ObjectsActionPayload {
  channel: string;
  message: {
    data: object;
    event: string;
    type: string;
  };
  publisher: string | undefined;
  subscription: null;
  timetoken: string;
}

export interface ObjectStatusPayload {
  error: boolean;
  operation: string;
  statusCode: number;
}

export interface ObjectResponsePayload {
  status: number;
  data: object | null;
}
