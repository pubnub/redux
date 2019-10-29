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

export const networkIssues = (
  payload: StatusActionPayload
): NetworkIssuesAction => ({
  type: ActionType.NETWORK_ISSUES,
  payload,
});

export const accessDenied = (
  payload: StatusActionPayload
): AccessDeniedAction => ({
  type: ActionType.ACCESS_DENIED,
  payload,
});

export const malformedResponse = (
  payload: StatusActionPayload
): MalformedResponseAction => ({
  type: ActionType.MALFORMED_RESPONSE,
  payload,
});

export const badRequest = (payload: StatusActionPayload): BadRequestAction => ({
  type: ActionType.BAD_REQUEST,
  payload,
});

export const decryptionError = (
  payload: StatusActionPayload
): DecryptionErrorAction => ({
  type: ActionType.DECRYPTION_ERROR,
  payload,
});

export const timeoutConnection = (
  payload: StatusActionPayload
): TimeoutConnectionAction => ({
  type: ActionType.TIMEOUT_CONNECTION,
  payload,
});

export const requestMessageCountExceed = (
  payload: StatusActionPayload
): RequestMessageCountExceedAction => ({
  type: ActionType.REQUEST_MESSAGE_COUNT_EXCEED,
  payload,
});

export const unknown = (payload: StatusActionPayload): UnknownAction => ({
  type: ActionType.UNKNOWN,
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
