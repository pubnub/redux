import {
  AppActions,
  NETWORK_UP,
  NETWORK_DOWN,
  NETWORK_ISSUES,
  RECONNECTED,
  CONNECTED,
  ACCESS_DENIED,
  MALFORMED_RESPONSE,
  BAD_REQUEST,
  DECRYPTION_ERROR,
  TIMEOUT_CONNECTION,
  REQUEST_MESSAGE_COUNT_EXCEED,
  UNKNOWN,
} from '../types/actions';
import { StatusActionPayload } from '../types/Status';
import { Dispatch } from 'redux';

export const networkUp = (): AppActions => ({
  type: NETWORK_UP,
});

export const networkDown = (): AppActions => ({
  type: NETWORK_DOWN,
});

export const networkIssues = (payload: StatusActionPayload): AppActions => ({
  type: NETWORK_ISSUES,
  payload,
});

export const reconnected = (payload: StatusActionPayload): AppActions => ({
  type: RECONNECTED,
  payload,
});

export const connected = (payload: StatusActionPayload): AppActions => ({
  type: CONNECTED,
  payload,
});

export const accessDenied = (payload: StatusActionPayload): AppActions => ({
  type: ACCESS_DENIED,
  payload,
});

export const malformedResponse = (
  payload: StatusActionPayload
): AppActions => ({
  type: MALFORMED_RESPONSE,
  payload,
});

export const badRequest = (payload: StatusActionPayload): AppActions => ({
  type: BAD_REQUEST,
  payload,
});

export const decryptionError = (payload: StatusActionPayload): AppActions => ({
  type: DECRYPTION_ERROR,
  payload,
});

export const timeoutConnection = (
  payload: StatusActionPayload
): AppActions => ({
  type: TIMEOUT_CONNECTION,
  payload,
});

export const requestMessageCountExceed = (
  payload: StatusActionPayload
): AppActions => ({
  type: REQUEST_MESSAGE_COUNT_EXCEED,
  payload,
});

export const unknown = (payload: StatusActionPayload): AppActions => ({
  type: UNKNOWN,
  payload,
});

export const createStatusActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: StatusActionPayload
) => {
  switch (payload.category) {
    case 'PNNetworkUpCategory':
      dispatch(networkUp());
      break;
    case 'PNNetworkDownCategory':
      dispatch(networkDown());
      break;
    case 'PNNetworkIssuesCategory':
      dispatch(networkIssues(payload));
      break;
    case 'PNReconnectedCategory':
      dispatch(reconnected(payload));
      break;
    case 'PNConnectedCategory':
      dispatch(connected(payload));
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
};
