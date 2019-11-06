import { ErrorStatusActionType } from './ErrorStatusActionType.enum';
import { ErrorStatusCategory } from './ErrorStatusCategory.enum';

// tag::RDX-026[]
export interface ErrorStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: string;
  operation: ErrorStatusCategory;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-026[]

// tag::RDX-078[]
export interface AccessDeniedEventAction {
  type: typeof ErrorStatusActionType.ACCESS_DENIED_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-078[]

// tag::RDX-079[]
export interface MalformedResponseEventAction {
  type: typeof ErrorStatusActionType.MALFORMED_RESPONSE_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-079[]

// tag::RDX-080[]
export interface BadRequestEventAction {
  type: typeof ErrorStatusActionType.BAD_REQUEST_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-080[]

// tag::RDX-081[]
export interface DecryptionErrorEventAction {
  type: typeof ErrorStatusActionType.DECRYPTION_ERROR_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-081[]

// tag::RDX-082[]
export interface RequestMessageCountExceedEventAction {
  type: typeof ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-082[]

// tag::RDX-083[]
export interface TimeoutConnectionEventAction {
  type: typeof ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-083[]

// tag::RDX-084[]
export interface UnknownEventAction {
  type: typeof ErrorStatusActionType.UNKNOWN_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-084[]

// tag::RDX-075[]
export interface NetworkIssuesEventAction {
  type: typeof ErrorStatusActionType.NETWORK_ISSUES_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-075[]
