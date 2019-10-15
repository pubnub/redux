export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}

export interface PubNubApiSuccess<Data> {
  data: Data;
}

export interface PubNubApiError<Data = object> {
  code: string;
  message: string;
  data: Data;
}

export interface PubNubApiState<Data> {
  data: { [key: string]: Data };
  loadingAll: number;
  loadingById: { [key: string]: number };
  errorAll?: PubNubApiError;
  errorById: { [key: string]: PubNubApiError<Data> };
}
