import { ErrorStatusListenerActions } from './ErrorStatusListener';
import { ErrorStatusActionType } from './ErrorStatusActionType.enum';
import { ErrorStatusResponse } from './ErrorStatusActions';

// tag::RDX-state-error[]
export interface ErrorState {
  networkIssues: ErrorStatusResponse[];
  accessDenied: ErrorStatusResponse[];
  malformedResponse: ErrorStatusResponse[];
  badRequest: ErrorStatusResponse[];
  requestMessageCountExceeded: ErrorStatusResponse[];
  decryptionError: ErrorStatusResponse[];
  timeoutConnection: ErrorStatusResponse[];
  unknown: ErrorStatusResponse[];
}
// end::RDX-state-error[]

const createInitialState = (): ErrorState => {
  return {
    networkIssues: [],
    accessDenied: [],
    malformedResponse: [],
    badRequest: [],
    requestMessageCountExceeded: [],
    decryptionError: [],
    timeoutConnection: [],
    unknown: [],
  };
};

// tag::RDX-reducer-error[]
export const createErrorStatusReducer = () => {
  return function errorStatusReducer(
    state = createInitialState(),
    action: ErrorStatusListenerActions
  ): ErrorState {
    let newState = { ...state };
    switch (action.type) {
      case ErrorStatusActionType.NETWORK_ISSUES_EVENT:
        newState.networkIssues = [...state.networkIssues, action.payload];
        return newState;
      case ErrorStatusActionType.ACCESS_DENIED_EVENT:
        newState.accessDenied = [...state.accessDenied, action.payload];
        return newState;
      case ErrorStatusActionType.MALFORMED_RESPONSE_EVENT:
        newState.malformedResponse = [
          ...state.malformedResponse,
          action.payload,
        ];
        return newState;
      case ErrorStatusActionType.BAD_REQUEST_EVENT:
        newState.badRequest = [...state.badRequest, action.payload];
        return newState;
      case ErrorStatusActionType.REQUEST_MESSAGE_COUNT_EXCEED_EVENT:
        newState.requestMessageCountExceeded = [
          ...state.requestMessageCountExceeded,
          action.payload,
        ];
        return newState;
      case ErrorStatusActionType.DECRYPTION_ERROR_EVENT:
        newState.decryptionError = [...state.decryptionError, action.payload];
        return newState;
      case ErrorStatusActionType.TIMEOUT_CONNECTION_EVENT:
        newState.timeoutConnection = [
          ...state.timeoutConnection,
          action.payload,
        ];
        return newState;
      case ErrorStatusActionType.UNKNOWN_EVENT:
        newState.unknown = [...state.unknown, action.payload];
        return newState;
      default:
        return state;
    }
  };
};
// end::RDX-reducer-error[]
