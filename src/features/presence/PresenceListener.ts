import { Dispatch } from 'redux';
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

// tag::RDX-type-presence-user-join[]
export const userJoin = (payload: PresenceEventMessage): JoinEventAction => ({
  type: PresenceActionType.JOIN_EVENT,
  payload,
});
// end::RDX-type-presence-user-join[]

// tag::RDX-type-presence-user-leave[]
export const userLeave = (payload: PresenceEventMessage): LeaveEventAction => ({
  type: PresenceActionType.LEAVE_EVENT,
  payload,
});
// end::RDX-type-presence-user-leave[]

// tag::RDX-type-presence-user-timeout[]
export const userTimeout = (
  payload: PresenceEventMessage
): TimeoutEventAction => ({
  type: PresenceActionType.TIMEOUT_EVENT,
  payload,
});
// end::RDX-type-presence-user-timeout[]

// tag::RDX-type-presence-user-change[]
export const userStateChange = (
  payload: PresenceEventMessage
): StateChangeEventAction => ({
  type: PresenceActionType.STATE_CHANGE_EVENT,
  payload,
});
// end::RDX-type-presence-user-change[]

// tag::RDX-method-listener-presence[]
export const createPresenceListener = (
  dispatch: Dispatch<PresenceListenerActions>
) => ({
  presence: (payload: PresenceEventMessage) => {
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
// end::RDX-method-listener-presence[]
