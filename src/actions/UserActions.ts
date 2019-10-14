import {
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
  OBJECTS_GET_USER_BY_ID_ERROR,
  OBJECTS_GET_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_CREATE_USER,
  UserUpdatedAction,
  UserDeletedAction,
  UserCreatedAction,
  UserListRetrievedAction,
  GetUserByIdAction,
  GetUsersErrorAction,
  GetUserByIdErrorAction,
  CreateUserErrorAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import {
  User,
  CreateUserInput,
  UserStatusPayload,
  UserResponsePayload,
  UsersListInput,
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

export const getUsersError = (
  payload: UserStatusPayload
): GetUsersErrorAction => ({
  type: OBJECTS_GET_USERS_ERROR,
  payload,
});

export const getUserByIdError = (
  payload: UserStatusPayload
): GetUserByIdErrorAction => ({
  type: OBJECTS_GET_USER_BY_ID_ERROR,
  payload,
});

export const createUserError = (
  payload: UserStatusPayload
): CreateUserErrorAction => ({
  type: OBJECTS_CREATE_USER_ERROR,
  payload,
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
    (status: UserStatusPayload, response: UserResponsePayload) => {
      if (status.error) {
        dispatch(createUserError(status));
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
    (status: UserStatusPayload, response: UserListRetrievedAction) => {
      if (status.error) {
        dispatch(getUsersError(status));
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
    (status: UserStatusPayload, response: UserResponsePayload) => {
      if (status.error) {
        dispatch(getUserByIdError(status));
      } else if (response.data !== undefined) {
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
