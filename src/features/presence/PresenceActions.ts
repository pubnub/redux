import { Dispatch } from 'redux';
import { PresenceActionPayload } from 'api/Presence';
import {
  JoinAction,
  LeaveAction,
  TimeoutAction,
  StateChangeAction,
  PresenceListenerActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';

export const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: ActionType.JOIN,
  payload,
});

export const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: ActionType.LEAVE,
  payload,
});

export const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: ActionType.TIMEOUT,
  payload,
});

export const userStateChange = (
  payload: PresenceActionPayload
): StateChangeAction => ({
  type: ActionType.STATE_CHANGE,
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
