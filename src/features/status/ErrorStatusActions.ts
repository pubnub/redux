import { Dispatch } from 'redux';
import {
  NetworkIssuesAction,
  AccessDeniedAction,
  MalformedResponseAction,
  BadRequestAction,
  DecryptionErrorAction,
  TimeoutConnectionAction,
  RequestMessageCountExceedAction,
  UnknownAction,
  ErrorStatusListenerActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { StatusActionPayload } from 'api/Status';

// tag::[RED-095]
export const networkIssues = (
  payload: StatusActionPayload
): NetworkIssuesAction => ({
  type: ActionType.NETWORK_ISSUES,
  payload,
});
// end::[RED-095]

// tag::[RED-096]
export const accessDenied = (
  payload: StatusActionPayload
): AccessDeniedAction => ({
  type: ActionType.ACCESS_DENIED,
  payload,
});
// end::[RED-096]

// tag::[RED-097]
export const malformedResponse = (
  payload: StatusActionPayload
): MalformedResponseAction => ({
  type: ActionType.MALFORMED_RESPONSE,
  payload,
});
// end::[RED-097]

// tag::[RED-098]
export const badRequest = (payload: StatusActionPayload): BadRequestAction => ({
  type: ActionType.BAD_REQUEST,
  payload,
});
// end::[RED-098]

// tag::[RED-099]
export const decryptionError = (
  payload: StatusActionPayload
): DecryptionErrorAction => ({
  type: ActionType.DECRYPTION_ERROR,
  payload,
});
// end::[RED-099]

// tag::[RED-100]
export const timeoutConnection = (
  payload: StatusActionPayload
): TimeoutConnectionAction => ({
  type: ActionType.TIMEOUT_CONNECTION,
  payload,
});
// end::[RED-100]

// tag::[RED-101]
export const requestMessageCountExceed = (
  payload: StatusActionPayload
): RequestMessageCountExceedAction => ({
  type: ActionType.REQUEST_MESSAGE_COUNT_EXCEED,
  payload,
});
// end::[RED-101]

// tag::[RED-102]
export const unknown = (payload: StatusActionPayload): UnknownAction => ({
  type: ActionType.UNKNOWN,
  payload,
});
// end::[RED-102]

// tag::[RED-103]
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
// end::[RED-103]
