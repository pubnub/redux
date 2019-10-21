import { ObjectsActionPayload } from '../api/Objects';
import { UserDeletedAction, UserUpdatedAction } from '../actions/Actions';
import { actionType } from '../actions/ActionType.enum';
import { Dispatch } from 'redux';
import { PubNubObjectApiSuccess, Identifiable } from 'api/PubNubApi';

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_USER,
  payload,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: actionType.OBJECTS_DELETE_USER,
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
