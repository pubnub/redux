import { Identifiable } from './PubNubApi';

export interface ObjectsData {
  id: string;
  eTag?: string;
  spaceId?: string;
  userId?: string;
  name?: string;
  created?: string;
  updated?: string;
  custom?: string | null;
}

export interface ObjectsActionMessage<T extends Identifiable> {
  data: T;
  event: string;
  type: string;
}

export interface ObjectsActionPayload<T extends Identifiable> {
  message: ObjectsActionMessage<T>;
}

export interface ObjectsStatusPayload {
  category: string;
  error: boolean;
  errorData?: {
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
  data: ObjectsData[] | ObjectsData;
}

export interface ObjectsListInput {
  limit?: number;
  page?: {
    next?: string;
    prev?: string;
  };
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}
