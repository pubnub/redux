import { ObjectsActionPayload } from '../types/Objects';
import { AppActions, USER_UPDATED, USER_DELETED } from '../types/actions';
import { Dispatch } from 'redux';

export const userUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: USER_UPDATED,
  payload,
});

export const userDeleted = (payload: ObjectsActionPayload): AppActions => ({
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
          dispatch(userUpdated(payload));
          break;
        case 'delete':
          dispatch(userDeleted(payload));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
