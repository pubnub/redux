import {
  ObjectsActionPayload,
  ObjectStatusPayload,
  ObjectResponsePayload,
} from '../types/Objects';
import {
  AppActions,
  USER_UPDATED,
  USER_DELETED,
  USER_LIST_RETRIEVED,
  GET_USERS_ERROR,
} from '../types/actions';
import { Dispatch } from 'redux';
import { UsersListInput } from '../types/User';

export const userUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: USER_UPDATED,
  payload,
});

export const userDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: USER_DELETED,
  payload,
});

export const getUsersError = (): AppActions => ({
  type: GET_USERS_ERROR,
});

export const userListRetrieved = (
  payload: ObjectResponsePayload
): AppActions => ({
  type: USER_LIST_RETRIEVED,
  payload,
});

export const getUsers = (pubnub: any, options?: UsersListInput) => (
  dispatch: Dispatch
) => {
  pubnub.getUsers(
    { options },
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
