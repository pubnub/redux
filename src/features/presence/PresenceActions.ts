import { PresenceActionType } from './PresenceActionType.enum';
import { PresenceActionPayload } from './Presence';

// tag::RDX-069[]
export interface JoinAction {
  type: typeof PresenceActionType.JOIN;
  payload: PresenceActionPayload;
}
// end::RDX-069[]

// tag::RDX-070[]
export interface LeaveAction {
  type: typeof PresenceActionType.LEAVE;
  payload: PresenceActionPayload;
}
// end::RDX-070[]

// tag::RDX-071[]
export interface TimeoutAction {
  type: typeof PresenceActionType.TIMEOUT;
  payload: PresenceActionPayload;
}
// end::RDX-071[]

// tag::RDX-072[]
export interface StateChangeAction {
  type: typeof PresenceActionType.STATE_CHANGE;
  payload: PresenceActionPayload;
}
// end::RDX-072[]

export type PresenceListenerActions =
  | JoinAction
  | LeaveAction
  | TimeoutAction
  | StateChangeAction;
