// tag::RDX-017[]
export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}
// end::RDX-017[]

// tag::RDX-018[]
export interface Identifiable extends Object {
  id: string;
}
// end::RDX-018[]

// tag::RDX-019[]
export interface ListenerEventData extends Identifiable {
  spaceId: string;
  userId: string;
}
// end::RDX-019[]

// tag::RDX-020[]
export interface PubNubObjectApiSuccess<T> {
  data: T;
  label?: string;
}
// end::RDX-020[]

// tag::RDX-021[]
export interface PubNubObjectApiError<T> {
  code: string;
  message: string;
  data: { id: string; value?: T };
  label?: string;
}
// end::RDX-021[]

// tag::RDX-022[]
export interface PubNubObjectApiState<T> {
  byId: { [key: string]: T };
}
// end::RDX-022[]

// tag::RDX-023[]
export interface ItemMap<T> {
  [key: string]: T;
}
// end::RDX-023[]
