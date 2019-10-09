export interface ObjectsActionPayload {
  channel: string;
  message: {
    data: {
      eTag: string;
      id?: string;
      spaceId?: string;
      userId?: string;
      name?: string;
      created?: string;
      updated?: string;
      custom?: string | null;
    };
    event: string;
    type: string;
  };
  publisher?: string | undefined;
  subscription: string | null;
  timetoken: string;
}

export interface ObjectsStatusPayload {
  category: string;
  error: boolean;
  errorData: {
    status: number;
    error: {
      message: string;
      source: string;
    };
  };
  operation: string;
  statusCode: number;
  message: string;
  type: string;
}

export interface ObjectsResponsePayload {
  status: number;
  data: object[];
}
