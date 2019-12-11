import { PresenceActionType } from './PresenceActionType.enum';
import { PresenceState, AnyPresenceState } from './PresenceState';
import { ActionMeta } from '../../foundations/ActionMeta';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-type-presence-action[]
export interface Presence<
  PresenceStateFields extends PresenceState = AnyPresenceState
> {
  uuid: string;
  state?: PresenceStateFields;
}
// end::RDX-type-presence-action[]

// tag::RDX-type-presence-event-message[]
export interface PresenceEventMessage<
  ReceivedPresence extends Presence = Presence
> {
  action: string;
  channel: string;
  occupancy: number;
  state?: ReceivedPresence['state'];
  subscription?: string;
  timestamp: number;
  timetoken: string;
  uuid: string;
}
// end::RDX-type-presence-event-message[]

// tag::RDX-type-presence-herenow[]
export interface HereNowRequest {
  channels?: string[];
  channelGroups?: string[];
  includeUUIDs?: boolean;
  includeState?: boolean;
}
// end::RDX-type-presence-herenow[]

// tag::RDX-type-presence-herenow-response[]
export interface HereNowResponse<ReceivedPresence extends Presence = Presence> {
  totalChannels: number;
  totalOccupancy: number;
  channels: {
    [channelId: string]: {
      name: string;
      occupants: ReceivedPresence[];
      occupancy: number;
    };
  };
}
// end::RDX-type-presence-herenow-response[]

// tag::RDX-type-presence-state-response[]
export type PresenceStateResponse = PresenceState;
// end::RDX-type-presence-state-response[]

// tag::RDX-type-presence-herenow-success[]
export interface HereNowSuccess<ReceivedPresence extends Presence = Presence> {
  request: HereNowRequest;
  response: HereNowResponse<ReceivedPresence>;
  status: PubNubApiStatus;
}
// end::RDX-type-presence-herenow-success[]

// tag::RDX-type-presence-herenow-error[]
export interface HereNowError {
  request: HereNowRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-presence-herenow-error[]

// tag::RDX-type-presence-state-request[]
export interface PresenceStateRequest {
  uuid?: string;
  channels?: string[];
  channelGroups?: string[];
}
// end::RDX-type-presence-state-request[]

// tag::RDX-type-presence-state-success[]
export interface PresenceStateSuccess {
  request: PresenceStateRequest;
  response: PresenceStateResponse;
  status: PubNubApiStatus;
}
// end::RDX-type-presence-state-success[]

// tag::RDX-type-presence-state-error[]
export interface PresenceStateError {
  request: PresenceStateRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-presence-state-error[]

// tag::RDX-type-presence-fetch[]
export interface FetchingHereNowAction<Meta extends ActionMeta> {
  type: PresenceActionType.FETCHING_HERE_NOW;
  payload: HereNowRequest;
  meta?: Meta;
}
// end::RDX-type-presence-fetch[]

// tag::RDX-type-presence-fetch-success[]
export interface HereNowRetrievedAction<Meta extends ActionMeta> {
  type: PresenceActionType.HERE_NOW_RETRIEVED;
  payload: HereNowSuccess;
  meta?: Meta;
}
// end::RDX-type-presence-fetch-success[]

// tag::RDX-type-presence-fetch-error[]
export interface ErrorFetchingHereNowAction<Meta extends ActionMeta> {
  type: PresenceActionType.ERROR_FETCHING_HERE_NOW;
  payload: HereNowError;
  meta?: Meta;
}
// end::RDX-type-presence-fetch-error[]

// tag::RDX-type-presence-fetch-state[]
export interface FetchingPresenceStateAction<Meta extends ActionMeta> {
  type: PresenceActionType.FETCHING_PRESENCE_STATE;
  payload: PresenceStateRequest;
  meta?: Meta;
}
// end::RDX-type-presence-fetch-state[]

// tag::RDX-type-presence-fetch-state-success[]
export interface PresenceStateRetrievedAction<Meta extends ActionMeta> {
  type: PresenceActionType.PRESENCE_STATE_RETRIEVED;
  payload: PresenceStateSuccess;
  meta?: Meta;
}
// end::RDX-type-presence-fetch-state-success[]

// tag::RDX-type-presence-fetch-state-error[]
export interface ErrorFetchingPresenceStateAction<Meta extends ActionMeta> {
  type: PresenceActionType.ERROR_FETCHING_PRESENCE_STATE;
  payload: PresenceStateError;
  meta?: Meta;
}
// end::RDX-type-presence-fetch-state-error[]

// tag::RDX-type-presence-event-join[]
export interface JoinEventAction {
  type: typeof PresenceActionType.JOIN_EVENT;
  payload: PresenceEventMessage;
}
// end::RDX-type-presence-event-join[]

// tag::RDX-type-presence-event-leave[]
export interface LeaveEventAction {
  type: typeof PresenceActionType.LEAVE_EVENT;
  payload: PresenceEventMessage;
}
// end::RDX-type-presence-event-leave[]

// tag::RDX-type-presence-event-timeout[]
export interface TimeoutEventAction {
  type: typeof PresenceActionType.TIMEOUT_EVENT;
  payload: PresenceEventMessage;
}
// end::RDX-type-presence-event-timeout[]

// tag::RDX-type-presence-event-state[]
export interface StateChangeEventAction {
  type: typeof PresenceActionType.STATE_CHANGE_EVENT;
  payload: PresenceEventMessage;
}
// end::RDX-type-presence-event-state[]
