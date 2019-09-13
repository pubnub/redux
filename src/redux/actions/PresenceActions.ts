import { PresenceActionPayload } from '../types/Presence';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const UserJoin = (payload: PresenceActionPayload): AppActions => ({
  type: 'pubnub/JOIN',
  payload,
});

export const UserLeave = (payload: PresenceActionPayload): AppActions => ({
  type: 'pubnub/LEAVE',
  payload,
});

export const UserTimeout = (payload: PresenceActionPayload): AppActions => ({
  type: 'pubnub/TIMEOUT',
  payload,
});

export const UserStateChange = (
  payload: PresenceActionPayload
): AppActions => ({
  type: 'pubnub/STATE_CHANGE',
  payload,
});

export const createPresenceActions = (payload: PresenceActionPayload) => (
  dispatch: Dispatch<AppActions>
) => {
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
