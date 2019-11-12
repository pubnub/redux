import { Dispatch } from 'redux';
import {
  PresenceListenerActions,
  JoinAction,
  LeaveAction,
  TimeoutAction,
  StateChangeAction,
} from './PresenceActions';
import { PresenceActionPayload } from './Presence';
import { PresenceActionType } from './PresenceActionType.enum';

const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: PresenceActionType.JOIN,
  payload,
});

const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: PresenceActionType.LEAVE,
  payload,
});

const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: PresenceActionType.TIMEOUT,
  payload,
});

const userStateChange = (
  payload: PresenceActionPayload
): StateChangeAction => ({
  type: PresenceActionType.STATE_CHANGE,
  payload,
});

export const createPresenceListener = (
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
