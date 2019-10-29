import { Identifiable } from 'api/PubNubApi';

// tag::RDX-010[]
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
// end::RDX-010[]

// tag::RDX-011[]
export interface ObjectsActionMessage<T extends Identifiable> {
  data: T;
  event: string;
  type: string;
}
// end::RDX-011[]

// tag::RDX-012[]
export interface ObjectsActionPayload<T extends Identifiable> {
  message: ObjectsActionMessage<T>;
}
// end::RDX-012[]

// tag::RDX-013[]
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
// end::RDX-013[]

// tag::RDX-014[]
export interface ObjectsResponsePayload {
  status: number;
  data: ObjectsData[] | ObjectsData;
}
// end::RDX-014[]

// tag::RDX-015[]
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
// end::RDX-015[]
