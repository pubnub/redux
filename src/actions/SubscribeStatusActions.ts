import { AppActions, RECONNECTED, CONNECTED } from '../types/actions';
import { StatusActionPayload } from '../types/Status';
import { Dispatch } from 'redux';

export const reconnected = (payload: StatusActionPayload): AppActions => ({
  type: RECONNECTED,
  payload,
});

export const connected = (payload: StatusActionPayload): AppActions => ({
  type: CONNECTED,
  payload,
});

export const createSubscribeStatusActionListener = (
  dispatch: Dispatch<AppActions>
) => ({
  status: (payload: StatusActionPayload) => {
    switch (payload.category) {
      case 'PNReconnectedCategory':
        dispatch(reconnected(payload));
        break;
      case 'PNConnectedCategory':
        dispatch(connected(payload));
        break;
      default:
        break;
    }
  },
});
