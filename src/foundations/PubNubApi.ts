// tag::RDX-017[]
export interface PubNubApiStatus {
  error: boolean;
  errorData: string;
  category: string;
  operation: string;
  statusCode: number;
}
// end::RDX-017[]
