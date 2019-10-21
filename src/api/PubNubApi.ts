export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}

export interface Identifiable extends Object {
  id: string;
}

export interface ListenerEventData extends Identifiable {
  spaceId: string;
  userId: string;
}

export interface PubNubObjectApiSuccess<T> {
  data: T;
  label?: string;
}

export interface PubNubObjectApiError<T> {
  code: string;
  message: string;
  data: { id?: string; value?: T };
  label?: string;
}

export interface PubNubObjectApiState<T> {
  byId: { [key: string]: T };
  loadingById: { [key: string]: number };
  errorById: { [key: string]: PubNubObjectApiError<T> };
}
