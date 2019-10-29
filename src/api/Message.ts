// tag::RDX-008[]
export interface Message {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string | null;
  timetoken?: string;
}
// end::RDX-008[]
