import {
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_FETCH_USERS,
  OBJECTS_FETCH_USERS_ERROR,
  OBJECTS_FETCH_USER_BY_ID_ERROR,
  OBJECTS_FETCH_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_CREATE_USER,
  UserUpdatedAction,
  UserDeletedAction,
  UserCreatedAction,
  UserListRetrievedAction,
  FetchUserByIdAction,
  FetchUsersErrorAction,
  FetchUserByIdErrorAction,
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
  type: OBJECTS_FETCH_USERS,
  payload,
});

export const userRetrievedById = (payload: User): FetchUserByIdAction => ({
  type: OBJECTS_FETCH_USER_BY_ID,
  payload,
});

export const fetchUsersError = (
  payload: UserStatusPayload
): FetchUsersErrorAction => ({
  type: OBJECTS_FETCH_USERS_ERROR,
  payload,
});

export const fetchUserByIdError = (
  payload: UserStatusPayload
): FetchUserByIdErrorAction => ({
  type: OBJECTS_FETCH_USER_BY_ID_ERROR,
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

export const fetchUsers = (pubnub: any, options?: UsersListInput) => (
  dispatch: Dispatch<UserListRetrievedAction | FetchUsersErrorAction>
) => {
  pubnub.fetchUsers(
    { ...options },
    (status: UserStatusPayload, response: UserListRetrievedAction) => {
      if (status.error) {
        dispatch(fetchUsersError(status));
      } else {
        dispatch(userListRetrieved(response.payload));
      }
    }
  );
};

export const fetchUserById = (
  pubnub: any,
  userId: string,
  include?: object
) => (dispatch: Dispatch<FetchUserByIdAction | FetchUserByIdErrorAction>) => {
  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: UserStatusPayload, response: UserResponsePayload) => {
      if (status.error) {
        dispatch(fetchUserByIdError(status));
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
