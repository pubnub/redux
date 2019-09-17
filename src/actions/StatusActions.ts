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

export const Network_Up = (payload: StatusActionPayload): AppActions => ({
  type: NETWORK_UP,
  payload,
});

export const Network_Down = (payload: StatusActionPayload): AppActions => ({
  type: NETWORK_DOWN,
  payload,
});

export const Network_Issues = (payload: StatusActionPayload): AppActions => ({
  type: NETWORK_ISSUES,
  payload,
});

export const Reconnected = (payload: StatusActionPayload): AppActions => ({
  type: RECONNECTED,
  payload,
});

export const Connected = (payload: StatusActionPayload): AppActions => ({
  type: CONNECTED,
  payload,
});

export const Access_Denied = (payload: StatusActionPayload): AppActions => ({
  type: ACCESS_DENIED,
  payload,
});

export const Malformed_Response = (
  payload: StatusActionPayload
): AppActions => ({
  type: MALFORMED_RESPONSE,
  payload,
});

export const Bad_Request = (payload: StatusActionPayload): AppActions => ({
  type: BAD_REQUEST,
  payload,
});

export const Decryption_Error = (payload: StatusActionPayload): AppActions => ({
  type: DECRYPTION_ERROR,
  payload,
});

export const Timeout_Connection = (
  payload: StatusActionPayload
): AppActions => ({
  type: TIMEOUT_CONNECTION,
  payload,
});

export const Request_Message_Count_Exceed = (
  payload: StatusActionPayload
): AppActions => ({
  type: REQUEST_MESSAGE_COUNT_EXCEED,
  payload,
});

export const Unknown = (payload: StatusActionPayload): AppActions => ({
  type: UNKNOWN,
  payload,
});

export const createStatusActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: StatusActionPayload
) => {
  switch (payload.category) {
    case 'PNNetworkUpCategory':
      dispatch(Network_Up(payload));
      break;
    case 'PNNetworkDownCategory':
      dispatch(Network_Down(payload));
      break;
    case 'PNNetworkIssuesCategory':
      dispatch(Network_Issues(payload));
      break;
    case 'PNReconnectedCategory':
      dispatch(Reconnected(payload));
      break;
    case 'PNConnectedCategory':
      dispatch(Connected(payload));
      break;
    case 'PNAccessDeniedCategory':
      dispatch(Access_Denied(payload));
      break;
    case 'PNMalformedResponseCategory':
      dispatch(Malformed_Response(payload));
      break;
    case 'PNBadRequestCategory':
      dispatch(Bad_Request(payload));
      break;
    case 'PNDecryptionErrorCategory':
      dispatch(Decryption_Error(payload));
      break;
    case 'PNTimeoutCategory':
      dispatch(Timeout_Connection(payload));
      break;
    case 'PNRequestMessageCountExceedCategory':
      dispatch(Request_Message_Count_Exceed(payload));
      break;
    case 'PNUnknownCategory':
      dispatch(Unknown(payload));
      break;
    default:
      break;
  }
};
