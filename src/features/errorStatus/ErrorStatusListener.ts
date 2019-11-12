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

export const networkIssues = (
  payload: ErrorStatusResponse
): NetworkIssuesEventAction => ({
  type: ErrorStatusActionType.NETWORK_ISSUES_EVENT,
  payload,
});

export const accessDenied = (
  payload: ErrorStatusResponse
): AccessDeniedEventAction => ({
  type: ErrorStatusActionType.ACCESS_DENIED_EVENT,
  payload,
});

export const malformedResponse = (
  payload: ErrorStatusResponse
): MalformedResponseEventAction => ({
  type: ErrorStatusActionType.MALFORMED_RESPONSE_EVENT,
  payload,
});

export const badRequest = (
  payload: ErrorStatusResponse
): BadRequestEventAction => ({
  type: ErrorStatusActionType.BAD_REQUEST_EVENT,
  payload,
});

export const decryptionError = (
  payload: ErrorStatusResponse
): DecryptionErrorEventAction => ({
  type: ErrorStatusActionType.DECRYPTION_ERROR_EVENT,
  payload,
});

export const timeoutConnection = (
  payload: ErrorStatusResponse
): TimeoutConnectionEventAction => ({
  type: ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT,
  payload,
});

export const requestMessageCountExceeded = (
  payload: ErrorStatusResponse
): RequestMessageCountExceedEventAction => ({
  type: ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT,
  payload,
});

export const unknown = (payload: ErrorStatusResponse): UnknownEventAction => ({
  type: ErrorStatusActionType.UNKNOWN_EVENT,
  payload,
});

export type ErrorStatusListenerActions =
  | NetworkIssuesEventAction
  | AccessDeniedEventAction
  | MalformedResponseEventAction
  | BadRequestEventAction
  | RequestMessageCountExceedEventAction
  | DecryptionErrorEventAction
  | TimeoutConnectionEventAction
  | UnknownEventAction;

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
