import { ObjectsResponsePayload, ObjectsListInput } from 'api/Objects';
import {
  UserDeletedAction,
  UserUpdatedAction,
  CreateUserErrorAction,
  FetchUserByIdErrorAction,
  FetchUsersErrorAction,
  FetchUserByIdAction,
  UserListRetrievedAction,
  UserCreatedAction,
  CreateUserBeginAction,
  FetchUsersBeginAction,
  FetchUserByIdBeginAction,
  UpdateUserBeginAction,
  UpdateUserErrorAction,
  DeleteUserBeginAction,
  DeleteUserErrorAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Dispatch } from 'redux';
import { User } from 'api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
} from 'api/PubNubApi';

export const createUserBegin = <T>(payload: T): CreateUserBeginAction<T> => ({
  type: ActionType.CREATING_USER,
  payload,
});

export const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserCreatedAction<T> => ({
  type: ActionType.USER_CREATED,
  payload,
});

export const createUserError = <T>(
  payload: PubNubObjectApiError<T>
): CreateUserErrorAction<T> => ({
  type: ActionType.ERROR_CREATING_USER,
  payload,
});

export const userListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): UserListRetrievedAction<T> => ({
  type: ActionType.USERS_RETRIEVED,
  payload,
});

export const fetchUsersBegin = (payload: {
  label: string;
}): FetchUsersBeginAction => ({
  type: ActionType.FETCHING_USERS,
  payload,
});

export const fetchUsersError = <T>(
  payload: PubNubObjectApiError<T>
): FetchUsersErrorAction<T> => ({
  type: ActionType.ERROR_FETCHING_USERS,
  payload,
});

export const userRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchUserByIdAction<T> => ({
  type: ActionType.USER_RETRIEVED,
  payload,
});

export const fetchUserByIdBegin = (
  payload: string
): FetchUserByIdBeginAction => ({
  type: ActionType.FETCHING_USER_BY_ID,
  payload,
});

export const fetchUserByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchUserByIdErrorAction<T> => ({
  type: ActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
});

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: ActionType.USER_UPDATED,
  payload,
});

export const updateUserBegin = <T>(payload: T): UpdateUserBeginAction<T> => ({
  type: ActionType.UPDATING_USER,
  payload,
});

export const updateUserError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateUserErrorAction<T> => ({
  type: ActionType.ERROR_UPDATING_USER,
  payload,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: ActionType.USER_DELETED,
  payload,
});

export const deleteUserBegin = (payload: string): DeleteUserBeginAction => ({
  type: ActionType.DELETING_USER,
  payload,
});

export const deleteUserError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteUserErrorAction<T> => ({
  type: ActionType.ERROR_DELETING_USER,
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
        let errorData = { id: user.id, value: user };

        dispatch(
          createUserError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userCreated({
            data: response.data,
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
        let errorData = { id: user.id, value: user };

        dispatch(
          updateUserError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userUpdated({
            data: response.data,
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
        let errorData = { id: id };

        dispatch(
          deleteUserError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userDeleted({
            data: response.data,
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
        let errorData = { id: '' };

        dispatch(
          fetchUsersError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
        let errorData = { id: userId };

        dispatch(
          fetchUserByIdError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userRetrievedById({
            data: response.data,
          })
        );
      }
    }
  );
};
