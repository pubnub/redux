export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}

export interface Identifiable {
  id: string;
}

export interface PubNubApiSuccess<T> {
  data: T;
}

export interface PubNubApiError<T = object> {
  code: string;
  message: string;
  data: T;
}

export interface PubNubApiState<T> {
  data: { [key: string]: T };
  loadingAll: number;
  loadingById: { [key: string]: number };
  errorAll?: PubNubApiError;
  errorById: { [key: string]: PubNubApiError<T> };
}
