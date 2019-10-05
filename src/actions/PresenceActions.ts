import { PresenceActionPayload } from '../types/Presence';
import {
  JOIN,
  LEAVE,
  TIMEOUT,
  STATE_CHANGE,
  JoinAction,
  LeaveAction,
  TimeoutAction,
  StateChangeAction,
  PresenceListenerActions,
} from '../types/actions';
import { Dispatch } from 'redux';

export const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: JOIN,
  payload,
});

export const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: LEAVE,
  payload,
});

export const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: TIMEOUT,
  payload,
});

export const userStateChange = (
  payload: PresenceActionPayload
): StateChangeAction => ({
  type: STATE_CHANGE,
  payload,
});

export const createPresenceActionListener = (
  dispatch: Dispatch<PresenceListenerActions>
) => ({
  presence: (payload: PresenceActionPayload) => {
    switch (payload.action) {
      case 'join':
        dispatch(userJoin(payload));
        break;
      case 'leave':
        dispatch(userLeave(payload));
        break;
      case 'timeout':
        dispatch(userTimeout(payload));
        break;
      case 'state-change':
        dispatch(userStateChange(payload));
        break;
      default:
        break;
    }
  },
});
