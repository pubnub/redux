import { Dispatch } from 'redux';
import { ErrorStatusCategory } from './ErrorStatusCategory.enum';
import { ErrorStatusActionType } from './ErrorStatusActionType.enum';
import {
  NetworkIssuesEventAction,
  AccessDeniedEventAction,
  MalformedResponseEventAction,
  BadRequestEventAction,
  DecryptionErrorEventAction,
  TimeoutConnectionEventAction,
  RequestMessageCountExceedEventAction,
  UnknownEventAction,
  ErrorStatusResponse,
} from './ErrorStatusActions';

// tag::RDX-event-error-network[]
export const networkIssues = (
  payload: ErrorStatusResponse
): NetworkIssuesEventAction => ({
  type: ErrorStatusActionType.NETWORK_ISSUES_EVENT,
  payload,
});
// end::RDX-event-error-network[]

// tag::RDX-event-error-accessdenied[]
export const accessDenied = (
  payload: ErrorStatusResponse
): AccessDeniedEventAction => ({
  type: ErrorStatusActionType.ACCESS_DENIED_EVENT,
  payload,
});
// end::RDX-event-error-accessdenied[]

// tag::RDX-event-error-malformed[]
export const malformedResponse = (
  payload: ErrorStatusResponse
): MalformedResponseEventAction => ({
  type: ErrorStatusActionType.MALFORMED_RESPONSE_EVENT,
  payload,
});
// end::RDX-event-error-malformed[]

// tag::RDX-event-error-badrequest[]
export const badRequest = (
  payload: ErrorStatusResponse
): BadRequestEventAction => ({
  type: ErrorStatusActionType.BAD_REQUEST_EVENT,
  payload,
});
// end::RDX-event-error-badrequest[]

// tag::RDX-event-error-decrypt[]
export const decryptionError = (
  payload: ErrorStatusResponse
): DecryptionErrorEventAction => ({
  type: ErrorStatusActionType.DECRYPTION_ERROR_EVENT,
  payload,
});
// end::RDX-event-error-decrypt[]

// tag::RDX-event-error-timeout[]
export const timeoutConnection = (
  payload: ErrorStatusResponse
): TimeoutConnectionEventAction => ({
  type: ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT,
  payload,
});
// end::RDX-event-error-timeout[]

// tag::RDX-event-error-requestcount[]
export const requestMessageCountExceeded = (
  payload: ErrorStatusResponse
): RequestMessageCountExceedEventAction => ({
  type: ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT,
  payload,
});
// end::RDX-event-error-requestcount[]

// tag::RDX-event-error-unknown[]
export const unknown = (payload: ErrorStatusResponse): UnknownEventAction => ({
  type: ErrorStatusActionType.UNKNOWN_EVENT,
  payload,
});
// end::RDX-event-error-unknown[]

export type ErrorStatusListenerActions =
  | NetworkIssuesEventAction
  | AccessDeniedEventAction
  | MalformedResponseEventAction
  | BadRequestEventAction
  | RequestMessageCountExceedEventAction
  | DecryptionErrorEventAction
  | TimeoutConnectionEventAction
  | UnknownEventAction;

// tag::RDX-listener-error[]
export const createErrorStatusListener = (
  dispatch: Dispatch<ErrorStatusListenerActions>
) => ({
  status: (payload: ErrorStatusResponse) => {
    switch (payload.category) {
      case ErrorStatusCategory.PN_ACCES_DENIED_CATEGORY:
        dispatch(accessDenied(payload));
        break;
      case ErrorStatusCategory.PN_MALFORMED_RESPONSE_CATEGORY:
        dispatch(malformedResponse(payload));
        break;
      case ErrorStatusCategory.PN_BAD_REQUEST_CATEGORY:
        dispatch(badRequest(payload));
        break;
      case ErrorStatusCategory.PN_DECRYPTION_ERROR_CATEGORY:
        dispatch(decryptionError(payload));
        break;
      case ErrorStatusCategory.PN_REQUEST_MESSAGE_COUNT_EXCEEDED_CATEGORY:
        dispatch(requestMessageCountExceeded(payload));
        break;
      case ErrorStatusCategory.PN_UNKNOWN_CATEGORY:
        dispatch(unknown(payload));
        break;
      default:
        break;
    }
  },
});
// end::RDX-listener-error[]
