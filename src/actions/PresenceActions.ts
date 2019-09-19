import { PresenceActionPayload } from '../types/Presence';
import {
  AppActions,
  JOIN,
  LEAVE,
  TIMEOUT,
  STATE_CHANGE,
} from '../types/actions';
import { Dispatch } from 'redux';

export const userJoin = (payload: PresenceActionPayload): AppActions => ({
  type: JOIN,
  payload,
});

export const userLeave = (payload: PresenceActionPayload): AppActions => ({
  type: LEAVE,
  payload,
});

export const userTimeout = (payload: PresenceActionPayload): AppActions => ({
  type: TIMEOUT,
  payload,
});

export const userStateChange = (
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
};
