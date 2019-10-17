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

export interface PubNubObjectApiSuccess<T> {
  data: T;
  label?: string;
}

export interface PubNubObjectApiError<T = object> {
  code: string;
  message: string;
  data: T;
  label?: string;
}

export interface PubNubObjectApiState<T> {
  data: { [key: string]: T };
  loadingAll: number;
  loadingById: { [key: string]: number };
  errorAll?: PubNubObjectApiError;
  errorById: { [key: string]: PubNubObjectApiError<T> };
}
