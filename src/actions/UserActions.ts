import {
  ObjectsActionPayload,
  ObjectStatusPayload,
  ObjectResponsePayload,
} from '../types/Objects';
import {
  AppActions,
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
} from '../types/actions';
import { Dispatch } from 'redux';
import { UsersListInput } from '../types/User';

export const userUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: OBJECTS_UPDATE_USER,
  payload,
});

export const userDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: OBJECTS_DELETE_USER,
  payload,
});

export const getUsersError = (): AppActions => ({
  type: OBJECTS_GET_USERS_ERROR,
});

export const userListRetrieved = (
  payload: ObjectResponsePayload
): AppActions => ({
  type: OBJECTS_GET_USERS,
  payload,
});

export const getUsers = (pubnub: any, options?: UsersListInput) => (
  dispatch: Dispatch
) => {
  pubnub.getUsers(
    options,
    (status: ObjectStatusPayload, response: ObjectResponsePayload) => {
      if (status.error) dispatch(getUsersError());
      else dispatch(userListRetrieved(response));
    }
  );
};

export const createUserActionListener = (dispatch: Dispatch<AppActions>) => ({
  user: (payload: ObjectsActionPayload) => {
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
  },
});
