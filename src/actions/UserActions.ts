import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsListInput,
} from '../types/Objects';
import {
  OBJECTS_UPDATE_USER,
  OBJECTS_DELETE_USER,
  OBJECTS_FETCH_USERS_ERROR,
  OBJECTS_FETCH_USERS,
  OBJECTS_CREATE_USER,
  OBJECTS_FETCH_USER_BY_ID,
  OBJECTS_FETCH_USER_BY_ID_ERROR,
  OBJECTS_CREATE_USER_ERROR,
  UserDeletedAction,
  UserUpdatedAction,
  CreateUserErrorAction,
  FetchUserByIdErrorAction,
  FetchUsersErrorAction,
  FetchUserByIdAction,
  UserListRetrievedAction,
  UserCreatedAction,
  CreateUserBeginAction,
  OBJECTS_CREATE_USER_BEGIN,
  OBJECTS_FETCH_USERS_BEGIN,
  FetchUsersBeginAction,
  FetchUserByIdBeginAction,
  OBJECTS_FETCH_USER_BY_ID_BEGIN,
  UpdateUserBeginAction,
  OBJECTS_UPDATE_USER_BEGIN,
  UpdateUserErrorAction,
  OBJECTS_UPDATE_USER_ERROR,
  OBJECTS_DELETE_USER_BEGIN,
  DeleteUserBeginAction,
  DeleteUserErrorAction,
  OBJECTS_DELETE_USER_ERROR,
} from '../types/actions';
import { Dispatch } from 'redux';
import { User, UserMap } from '../types/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Identifiable,
} from 'types/PubNubApi';

export const createUserBegin = <T>(payload: T): CreateUserBeginAction<T> => ({
  type: OBJECTS_CREATE_USER_BEGIN,
  payload,
});

export const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserCreatedAction<T> => ({
  type: OBJECTS_CREATE_USER,
  payload,
});

export const createUserError = <T>(
  payload: PubNubObjectApiError<T>
): CreateUserErrorAction<T> => ({
  type: OBJECTS_CREATE_USER_ERROR,
  payload,
});

export const userListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<UserMap<T>>
): UserListRetrievedAction<T> => ({
  type: OBJECTS_FETCH_USERS,
  payload,
});

export const fetchUsersBegin = (payload: {
  label: string;
}): FetchUsersBeginAction => ({
  type: OBJECTS_FETCH_USERS_BEGIN,
  payload,
});

export const fetchUsersError = (
  payload: PubNubObjectApiError<object>
): FetchUsersErrorAction => ({
  type: OBJECTS_FETCH_USERS_ERROR,
  payload,
});

export const userRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchUserByIdAction<T> => ({
  type: OBJECTS_FETCH_USER_BY_ID,
  payload,
});

export const fetchUserByIdBegin = (
  payload: string
): FetchUserByIdBeginAction => ({
  type: OBJECTS_FETCH_USER_BY_ID_BEGIN,
  payload,
});

export const fetchUserByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchUserByIdErrorAction<T> => ({
  type: OBJECTS_FETCH_USER_BY_ID_ERROR,
  payload,
});

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_USER,
  payload,
});

export const updateUserBegin = <T>(payload: T): UpdateUserBeginAction<T> => ({
  type: OBJECTS_UPDATE_USER_BEGIN,
  payload,
});

export const updateUserError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateUserErrorAction<T> => ({
  type: OBJECTS_UPDATE_USER_ERROR,
  payload,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: OBJECTS_DELETE_USER,
  payload,
});

export const deleteUserBegin = (payload: string): DeleteUserBeginAction => ({
  type: OBJECTS_DELETE_USER_BEGIN,
  payload,
});

export const deleteUserError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteUserErrorAction<T> => ({
  type: OBJECTS_DELETE_USER_ERROR,
  payload,
});

export const createUser = (pubnub: any, user: User) => (dispatch: Dispatch) => {
  dispatch(createUserBegin(user));

  pubnub.createUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          createUserError({
            code: status.category,
            message: status.errorData,
            data: response.data as User,
          })
        );
      } else {
        dispatch(
          userCreated({
            data: response.data as User,
          })
        );
      }
    }
  );
};

export const updateUser = (pubnub: any, user: User) => (dispatch: Dispatch) => {
  dispatch(updateUserBegin(user));

  pubnub.updateUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          updateUserError({
            code: status.category,
            message: status.errorData,
            data: response.data as User,
          })
        );
      } else {
        dispatch(
          userUpdated({
            data: response.data as User,
          })
        );
      }
    }
  );
};

export const deleteUser = (pubnub: any, id: string) => (dispatch: Dispatch) => {
  dispatch(deleteUserBegin(id));

  pubnub.deleteUser(
    id,
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          deleteUserError({
            code: status.category,
            message: status.errorData,
            data: response.data as User,
          })
        );
      } else {
        dispatch(
          userDeleted({
            data: response.data as User,
          })
        );
      }
    }
  );
};

export const fetchUsers = (
  pubnub: any,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchUsersBegin({ label: label }));

  pubnub.getUsers(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          fetchUsersError({
            code: status.category,
            message: status.errorData,
            data: response.data as User,
            label: label,
          })
        );
      } else {
        dispatch(
          userListRetrieved({
            label: label,
            data: (response.data as User[]).reduce(
              (result: { [key: string]: User }, value) => {
                result[value.id] = value;
                return result;
              },
              {}
            ),
          })
        );
      }
    }
  );
};

export const fetchUserById = (
  pubnub: any,
  userId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(fetchUserByIdBegin(userId));

  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          fetchUserByIdError({
            code: status.category,
            message: status.errorData,
            data: response.data as User,
          })
        );
      } else {
        dispatch(
          userRetrievedById({
            data: response.data as User,
          })
        );
      }
    }
  );
};

export const createUserActionListener = <T extends Identifiable>(
  dispatch: Dispatch<UserUpdatedAction<T> | UserDeletedAction<T>>
) => ({
  user: (payload: ObjectsActionPayload<T>) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(
          userUpdated({
            data: payload.message.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          userDeleted({
            data: payload.message.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
