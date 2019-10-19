import { ObjectsActionPayload } from '../types/Objects';
import {
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  UserDeletedAction,
  UserUpdatedAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import { PubNubObjectApiSuccess, Identifiable } from 'types/PubNubApi';

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_USER,
  payload,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: OBJECTS_DELETE_USER,
  payload,
});

export const createUserActionListener = <T extends Identifiable>(
  dispatch: Dispatch<UserUpdatedAction<T> | UserDeletedAction<T>>
) => ({
  user: (payload: ObjectsActionPayload<T>) => {
    switch (payload.event) {
      case 'update':
        dispatch(
          userUpdated({
            data: payload.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          userDeleted({
            data: payload.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
