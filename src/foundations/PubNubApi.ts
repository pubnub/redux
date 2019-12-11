export type PubNub = any;

// tag::RDX-type-pubnub-api[]
export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}
// end::RDX-type-pubnub-api[]
