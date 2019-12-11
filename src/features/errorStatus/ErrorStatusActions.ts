import { ErrorStatusActionType } from './ErrorStatusActionType.enum';
import { ErrorStatusCategory } from './ErrorStatusCategory.enum';

// tag::RDX-type-error-response[]
export interface ErrorStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: string;
  operation: ErrorStatusCategory;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}
// end::RDX-type-error-response[]

// tag::RDX-action-error-denied[]
export interface AccessDeniedEventAction {
  type: typeof ErrorStatusActionType.ACCESS_DENIED_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-denied[]

// tag::RDX-action-error-malformed[]
export interface MalformedResponseEventAction {
  type: typeof ErrorStatusActionType.MALFORMED_RESPONSE_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-malformed[]

// tag::RDX-action-error-badrequest[]
export interface BadRequestEventAction {
  type: typeof ErrorStatusActionType.BAD_REQUEST_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-badrequest[]

// tag::RDX-action-error-decrypt[]
export interface DecryptionErrorEventAction {
  type: typeof ErrorStatusActionType.DECRYPTION_ERROR_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-decrypt[]

// tag::RDX-action-error-requestmsgcount[]
export interface RequestMessageCountExceedEventAction {
  type: typeof ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-requestmsgcount[]

// tag::RDX-action-error-timeout[]
export interface TimeoutConnectionEventAction {
  type: typeof ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-timeout[]

// tag::RDX-action-error-unknown[]
export interface UnknownEventAction {
  type: typeof ErrorStatusActionType.UNKNOWN_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-unknown[]

// tag::RDX-action-error-network[]
export interface NetworkIssuesEventAction {
  type: typeof ErrorStatusActionType.NETWORK_ISSUES_EVENT;
  payload: ErrorStatusResponse;
}
// end::RDX-action-error-network[]
