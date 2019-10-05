import {
  ACCESS_DENIED,
  MALFORMED_RESPONSE,
  BAD_REQUEST,
  DECRYPTION_ERROR,
  ErrorStatusListenerActions,
  NETWORK_ISSUES,
  TIMEOUT_CONNECTION,
  REQUEST_MESSAGE_COUNT_EXCEED,
  UNKNOWN,
  NetworkIssuesAction,
  AccessDeniedAction,
  MalformedResponseAction,
  BadRequestAction,
  DecryptionErrorAction,
  TimeoutConnectionAction,
  RequestMessageCountExceedAction,
  UnknownAction,
} from '../types/actions';
import { StatusActionPayload } from '../types/Status';
import { Dispatch } from 'redux';

export const networkIssues = (
  payload: StatusActionPayload
): NetworkIssuesAction => ({
  type: NETWORK_ISSUES,
  payload,
});

export const accessDenied = (
  payload: StatusActionPayload
): AccessDeniedAction => ({
  type: ACCESS_DENIED,
  payload,
});

export const malformedResponse = (
  payload: StatusActionPayload
): MalformedResponseAction => ({
  type: MALFORMED_RESPONSE,
  payload,
});

export const badRequest = (payload: StatusActionPayload): BadRequestAction => ({
  type: BAD_REQUEST,
  payload,
});

export const decryptionError = (
  payload: StatusActionPayload
): DecryptionErrorAction => ({
  type: DECRYPTION_ERROR,
  payload,
});

export const timeoutConnection = (
  payload: StatusActionPayload
): TimeoutConnectionAction => ({
  type: TIMEOUT_CONNECTION,
  payload,
});

export const requestMessageCountExceed = (
  payload: StatusActionPayload
): RequestMessageCountExceedAction => ({
  type: REQUEST_MESSAGE_COUNT_EXCEED,
  payload,
});

export const unknown = (payload: StatusActionPayload): UnknownAction => ({
  type: UNKNOWN,
  payload,
});

export const createErrorStatusActionListener = (
  dispatch: Dispatch<ErrorStatusListenerActions>
) => ({
  status: (payload: StatusActionPayload) => {
    switch (payload.category) {
      case 'PNNetworkIssuesCategory':
        dispatch(networkIssues(payload));
        break;
      case 'PNAccessDeniedCategory':
        dispatch(accessDenied(payload));
        break;
      case 'PNMalformedResponseCategory':
        dispatch(malformedResponse(payload));
        break;
      case 'PNBadRequestCategory':
        dispatch(badRequest(payload));
        break;
      case 'PNDecryptionErrorCategory':
        dispatch(decryptionError(payload));
        break;
      case 'PNTimeoutCategory':
        dispatch(timeoutConnection(payload));
        break;
      case 'PNRequestMessageCountExceedCategory':
        dispatch(requestMessageCountExceed(payload));
        break;
      case 'PNUnknownCategory':
        dispatch(unknown(payload));
        break;
      default:
        break;
    }
  },
});
