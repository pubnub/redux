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

// tag::[RED-147]
export const userJoin = (payload: PresenceActionPayload): JoinAction => ({
  type: actionType.JOIN,
  payload,
});
// end::[RED-147]

// tag::[RED-148]
export const userLeave = (payload: PresenceActionPayload): LeaveAction => ({
  type: actionType.LEAVE,
  payload,
});
// end::[RED-148]

// tag::[RED-149]
export const userTimeout = (payload: PresenceActionPayload): TimeoutAction => ({
  type: actionType.TIMEOUT,
  payload,
});
// end::[RED-149]

// tag::[RED-150]
export const userStateChange = (
  payload: PresenceActionPayload
): StateChangeAction => ({
  type: actionType.STATE_CHANGE,
  payload,
});
// end::[RED-150]

// tag::[RED-151]
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
// end::[RED-151]
