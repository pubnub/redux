import { Dispatch } from 'redux';
import Pubnub from 'pubnub';
import {
  PresenceListenerActions,
  JoinEventAction,
  LeaveEventAction,
  TimeoutEventAction,
  StateChangeEventAction,
  PresenceEventMessage,
} from './PresenceActions';
import { PresenceActionType } from './PresenceActionType.enum';
import { PresenceCategory } from './PresenceCategory.enum';

export const userJoin = (payload: PresenceEventMessage): JoinEventAction => ({
  type: PresenceActionType.JOIN_EVENT,
  payload,
});

export const userLeave = (payload: PresenceEventMessage): LeaveEventAction => ({
  type: PresenceActionType.LEAVE_EVENT,
  payload,
});

export const userTimeout = (
  payload: PresenceEventMessage
): TimeoutEventAction => ({
  type: PresenceActionType.TIMEOUT_EVENT,
  payload,
});

export const userStateChange = (
  payload: PresenceEventMessage
): StateChangeEventAction => ({
  type: PresenceActionType.STATE_CHANGE_EVENT,
  payload,
});

export const createPresenceListener = (
  dispatch: Dispatch<PresenceListenerActions>
): Pubnub.ListenerParameters => ({
  presence: (payload) => {
    switch (payload.action) {
      case PresenceCategory.JOIN:
        dispatch(userJoin(payload));
        break;
      case PresenceCategory.LEAVE:
        dispatch(userLeave(payload));
        break;
      case PresenceCategory.TIMEOUT:
        dispatch(userTimeout(payload));
        break;
      case PresenceCategory.STATE_CHANGE:
        dispatch(userStateChange(payload));
        break;
      default:
        break;
    }
  },
});
