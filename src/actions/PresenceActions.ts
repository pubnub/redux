import { PresenceActionPayload } from '../api/Presence';
import {
  JoinAction,
  LeaveAction,
  TimeoutAction,
  StateChangeAction,
  PresenceListenerActions,
} from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';

export const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: actionType.JOIN,
  payload,
});

export const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: actionType.LEAVE,
  payload,
});

export const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: actionType.TIMEOUT,
  payload,
});

export const userStateChange = (
  payload: PresenceActionPayload
): StateChangeAction => ({
  type: actionType.STATE_CHANGE,
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
