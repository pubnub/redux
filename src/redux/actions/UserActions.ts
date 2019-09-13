import { ObjectsActionPayload } from '../types/Objects';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const UserUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: 'pubnub/USER_UPDATED',
  payload,
});

export const UserDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: 'pubnub/USER_DELETED',
  payload,
});

export const createUserActions = (payload: ObjectsActionPayload) => (
  dispatch: Dispatch<AppActions>
) => {
  switch (payload.type) {
    case 'user':
      switch (payload.event) {
        case 'update':
          dispatch(UserUpdated(payload));
          break;
        case 'delete':
          dispatch(UserDeleted(payload));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
