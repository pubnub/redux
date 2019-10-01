export interface ObjectsActionPayload {
  source: string;
  version: string;
  event: string;
  type: string;
  data: object;
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
