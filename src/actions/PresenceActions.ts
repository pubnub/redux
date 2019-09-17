import { PresenceActionPayload } from '../types/Presence';
import {
  AppActions,
  JOIN,
  LEAVE,
  TIMEOUT,
  STATE_CHANGE,
} from '../types/actions';
import { Dispatch } from 'redux';

export const UserJoin = (payload: PresenceActionPayload): AppActions => ({
  type: JOIN,
  payload,
});

export const UserLeave = (payload: PresenceActionPayload): AppActions => ({
  type: LEAVE,
  payload,
});

export const UserTimeout = (payload: PresenceActionPayload): AppActions => ({
  type: TIMEOUT,
  payload,
});

export const UserStateChange = (
  payload: PresenceActionPayload
): AppActions => ({
  type: STATE_CHANGE,
  payload,
});

export const createPresenceActionListener = (
  dispatch: Dispatch<AppActions>
) => (payload: PresenceActionPayload) => {
  switch (payload.action) {
    case 'join':
      dispatch(UserJoin(payload));
      break;
    case 'leave':
      dispatch(UserLeave(payload));
      break;
    case 'timeout':
      dispatch(UserTimeout(payload));
      break;
    case 'state-change':
      dispatch(UserStateChange(payload));
      break;
    default:
      break;
  }
};
