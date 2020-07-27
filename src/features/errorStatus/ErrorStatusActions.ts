import { ErrorStatusActionType } from './ErrorStatusActionType.enum';
import { ErrorStatusCategory } from './ErrorStatusCategory.enum';

export interface ErrorStatusResponse {
  affectedChannelGroups: string[];
  affectedChannels: string[];
  category: string;
  operation: ErrorStatusCategory;
  lastTimetoken: number;
  currentTimetoken: string;
  subscribedChannels: string[];
}

export interface AccessDeniedEventAction {
  type: typeof ErrorStatusActionType.ACCESS_DENIED_EVENT;
  payload: ErrorStatusResponse;
}

export interface MalformedResponseEventAction {
  type: typeof ErrorStatusActionType.MALFORMED_RESPONSE_EVENT;
  payload: ErrorStatusResponse;
}

export interface BadRequestEventAction {
  type: typeof ErrorStatusActionType.BAD_REQUEST_EVENT;
  payload: ErrorStatusResponse;
}

export interface DecryptionErrorEventAction {
  type: typeof ErrorStatusActionType.DECRYPTION_ERROR_EVENT;
  payload: ErrorStatusResponse;
}

export interface RequestMessageCountExceedEventAction {
  type: typeof ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT;
  payload: ErrorStatusResponse;
}

export interface TimeoutConnectionEventAction {
  type: typeof ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT;
  payload: ErrorStatusResponse;
}

export interface UnknownEventAction {
  type: typeof ErrorStatusActionType.UNKNOWN_EVENT;
  payload: ErrorStatusResponse;
}

export interface NetworkIssuesEventAction {
  type: typeof ErrorStatusActionType.NETWORK_ISSUES_EVENT;
  payload: ErrorStatusResponse;
}
