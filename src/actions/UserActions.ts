import {
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsResponsePayload,
  ObjectsListInput,
} from '../types/Objects';
import {
  AppActions,
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
  OBJECTS_GET_USER_BY_ID_ERROR,
  OBJECTS_GET_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_CREATE_USER,
} from '../types/actions';
import { Dispatch } from 'redux';
import { createUserInput } from '../types/User';

export const userUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: OBJECTS_UPDATE_USER,
  payload,
});

export const userDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: OBJECTS_DELETE_USER,
  payload,
});

export const userCreated = (payload: ObjectsResponsePayload): AppActions => ({
  type: OBJECTS_CREATE_USER,
  payload,
});

export const userListRetrieved = (
  payload: ObjectsResponsePayload
): AppActions => ({
  type: OBJECTS_GET_USERS,
  payload,
});

export const userRetrievedById = (
  payload: ObjectsResponsePayload
): AppActions => ({
  type: OBJECTS_GET_USER_BY_ID,
  payload,
});

export const getUsersError = (payload: ObjectsStatusPayload): AppActions => ({
  type: OBJECTS_GET_USERS_ERROR,
  payload,
});

export const getUserByIdError = (
  payload: ObjectsStatusPayload
): AppActions => ({
  type: OBJECTS_GET_USER_BY_ID_ERROR,
  payload,
});

export const createUserError = (payload: ObjectsStatusPayload): AppActions => ({
  type: OBJECTS_CREATE_USER_ERROR,
  payload,
});

export const createUser = (
  pubnub: any,
  id: string,
  name: string,
  options?: createUserInput
) => (dispatch: Dispatch) => {
  pubnub.createUser(
    {
      id,
      name,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) dispatch(createUserError(status));
      else dispatch(userCreated(response));
    }
  );
};

export const getUsers = (pubnub: any, options?: ObjectsListInput) => (
  dispatch: Dispatch
) => {
  pubnub.getUsers(
    { ...options },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) dispatch(getUsersError(status));
      else dispatch(userListRetrieved(response));
    }
  );
};

export const getUserById = (pubnub: any, userId: string, include?: object) => (
  dispatch: Dispatch
) => {
  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) dispatch(getUserByIdError(status));
      else dispatch(userRetrievedById(response));
    }
  );
};

export const createUserActionListener = (dispatch: Dispatch<AppActions>) => ({
  user: (payload: ObjectsActionPayload) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(userUpdated(payload));
        break;
      case 'delete':
        dispatch(userDeleted(payload));
        break;
      default:
        break;
    }
  },
});
