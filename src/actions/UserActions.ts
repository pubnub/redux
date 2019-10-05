import { ObjectsStatusPayload, ObjectsResponsePayload } from '../types/Objects';
import {
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
  OBJECTS_GET_USER_BY_ID_ERROR,
  OBJECTS_GET_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_CREATE_USER,
  GetUserByIdAction,
  UserUpdatedAction,
  UserDeletedAction,
  UserCreatedAction,
  UserListRetrievedAction,
  GetUsersErrorAction,
  GetUserByIdErrorAction,
  CreateUserErrorAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import {
  UsersListInput,
  CreateUserInput,
  User,
  UserActionPayload,
} from '../types/User';

export const userUpdated = (payload: User): UserUpdatedAction => ({
  type: OBJECTS_UPDATE_USER,
  payload,
});

export const userDeleted = (payload: User): UserDeletedAction => ({
  type: OBJECTS_DELETE_USER,
  payload,
});

export const userCreated = (payload: User): UserCreatedAction => ({
  type: OBJECTS_CREATE_USER,
  payload,
});

export const userListRetrieved = (
  payload: User[]
): UserListRetrievedAction => ({
  type: OBJECTS_GET_USERS,
  payload,
});

export const userRetrievedById = (payload: User): GetUserByIdAction => ({
  type: OBJECTS_GET_USER_BY_ID,
  payload,
});

export const getUsersError = (): GetUsersErrorAction => ({
  type: OBJECTS_GET_USERS_ERROR,
});

export const getUserByIdError = (): GetUserByIdErrorAction => ({
  type: OBJECTS_GET_USER_BY_ID_ERROR,
});

export const createUserError = (): CreateUserErrorAction => ({
  type: OBJECTS_CREATE_USER_ERROR,
});

export const createUser = (
  pubnub: any,
  id: string,
  name: string,
  options?: CreateUserInput
) => (dispatch: Dispatch<UserCreatedAction | CreateUserErrorAction>) => {
  pubnub.createUser(
    {
      id,
      name,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(createUserError());
      } else if (response.data !== undefined) {
        dispatch(userCreated(response.data));
      }
    }
  );
};

export const getUsers = (pubnub: any, options?: UsersListInput) => (
  dispatch: Dispatch<UserListRetrievedAction | GetUsersErrorAction>
) => {
  pubnub.getUsers(
    { ...options },
    (status: ObjectsStatusPayload, response: UserListRetrievedAction) => {
      if (status.error) {
        dispatch(getUsersError());
      } else {
        dispatch(userListRetrieved(response.payload));
      }
    }
  );
};

export const getUserById = (pubnub: any, userId: string, include?: object) => (
  dispatch: Dispatch<GetUserByIdAction | GetUserByIdErrorAction>
) => {
  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getUserByIdError());
      } else if (response.data) {
        dispatch(userRetrievedById(response.data));
      }
    }
  );
};

export const createUserActionListener = (
  dispatch: Dispatch<UserUpdatedAction | UserDeletedAction>
) => ({
  user: (payload: UserActionPayload) => {
    switch (payload.event) {
      case 'update':
        dispatch(userUpdated(payload.data));
        break;
      case 'delete':
        dispatch(userDeleted(payload.data));
        break;
      default:
        break;
    }
  },
});
