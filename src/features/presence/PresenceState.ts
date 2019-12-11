// tag::RDX-state-presence[]
export type PresenceState = object;
// end::RDX-state-presence[]

// tag::RDX-state-presence-list[]
export interface AnyPresenceState extends PresenceState {
  [key: string]: any;
}
// end::RDX-state-presence-list[]
