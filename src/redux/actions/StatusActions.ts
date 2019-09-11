import { AppActions } from '../types/actions';
import { Status } from '../types/Status';
import { Dispatch } from 'redux';

export const Network_Up = (payload: Status): AppActions => ({
  type: 'pubnub/NETWORK_UP',
  payload,
});

export const Network_Down = (payload: Status): AppActions => ({
  type: 'pubnub/NETWORK_DOWN',
  payload,
});

export const Network_Issues = (payload: Status): AppActions => ({
  type: 'pubnub/NETWORK_ISSUES',
  payload,
});

export const Reconnected = (payload: Status): AppActions => ({
  type: 'pubnub/RECONNECTED',
  payload,
});

export const Connected = (payload: Status): AppActions => ({
  type: 'pubnub/CONNECTED',
  payload,
});

export const Access_Denied = (payload: Status): AppActions => ({
  type: 'pubnub/ACCESS_DENIED',
  payload,
});

export const Malformed_Response = (payload: Status): AppActions => ({
  type: 'pubnub/MALFORMED_RESPONSE',
  payload,
});

export const Bad_Request = (payload: Status): AppActions => ({
  type: 'pubnub/BAD_REQUEST',
  payload,
});

export const Decryption_Error = (payload: Status): AppActions => ({
  type: 'pubnub/DECRYPTION_ERROR',
  payload,
});

export const Timeout_Connection = (payload: Status): AppActions => ({
  type: 'pubnub/TIMEOUT_CONNECTION',
  payload,
});

export const Request_Message_Count_Exceed = (payload: Status): AppActions => ({
  type: 'pubnub/REQUEST_MESSAGE_COUNT_EXCEED',
  payload,
});

export const Unknown = (payload: Status): AppActions => ({
  type: 'pubnub/UNKNOWN',
  payload,
});

export const createStatusActions = (payload: Status) => (
  dispatch: Dispatch<AppActions>
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
