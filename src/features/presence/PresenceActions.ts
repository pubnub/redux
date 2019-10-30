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

const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: ActionType.JOIN,
  payload,
});

const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: ActionType.LEAVE,
  payload,
});

const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: ActionType.TIMEOUT,
  payload,
});

const userStateChange = (
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
