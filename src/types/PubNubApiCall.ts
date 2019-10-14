export interface PubNubApiCall<Data> {
  error: any;
  pending: boolean;
  data: Data;
}
