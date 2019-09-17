import { ObjectsActionPayload } from '../types/Objects';
import { AppActions, USER_UPDATED, USER_DELETED } from '../types/actions';
import { Dispatch } from 'redux';

export const UserUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: USER_UPDATED,
  payload,
});

export const UserDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: USER_DELETED,
  payload,
});

export const createUserActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: ObjectsActionPayload
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
