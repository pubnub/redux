import { ObjectsResponsePayload, ObjectsListInput } from 'api/Objects';
import {
  UserDeletedAction,
  UserUpdatedAction,
  ErrorCreatingUserAction,
  ErrorFetchingUserByIdAction,
  ErrorFetchingUsersAction,
  UserRetrievedAction,
  UsersRetrievedAction,
  UserCreatedAction,
  CreatingUserAction,
  FetchingUsersAction,
  FetchingUserByIdAction,
  UpdatingUserAction,
  ErrorUpdatingUserAction,
  DeletingUserAction,
  ErrorDeletingUserAction,
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

export const creatingUser = <T>(payload: T): CreatingUserAction<T> => ({
  type: ActionType.CREATING_USER,
  payload,
});

export const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserCreatedAction<T> => ({
  type: ActionType.USER_CREATED,
  payload,
});

export const errorCreatingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorCreatingUserAction<T> => ({
  type: ActionType.ERROR_CREATING_USER,
  payload,
});

export const fetchingUsers = (payload: {
  label: string;
}): FetchingUsersAction => ({
  type: ActionType.FETCHING_USERS,
  payload,
});

export const usersRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): UsersRetrievedAction<T> => ({
  type: ActionType.USERS_RETRIEVED,
  payload,
});

export const errorFetchingUsers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingUsersAction<T> => ({
  type: ActionType.ERROR_FETCHING_USERS,
  payload,
});

export const fetchingUserById = (payload: string): FetchingUserByIdAction => ({
  type: ActionType.FETCHING_USER_BY_ID,
  payload,
});

export const userRetrieved = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserRetrievedAction<T> => ({
  type: ActionType.USER_RETRIEVED,
  payload,
});

export const errorFetchingUserById = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingUserByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
});

export const updatingUser = <T>(payload: T): UpdatingUserAction<T> => ({
  type: ActionType.UPDATING_USER,
  payload,
});

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: ActionType.USER_UPDATED,
  payload,
});

export const errorUpdatingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingUserAction<T> => ({
  type: ActionType.ERROR_UPDATING_USER,
  payload,
});

export const deletingUser = (payload: string): DeletingUserAction => ({
  type: ActionType.DELETING_USER,
  payload,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: ActionType.USER_DELETED,
  payload,
});

export const errorDeletingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorDeletingUserAction<T> => ({
  type: ActionType.ERROR_DELETING_USER,
  payload,
});

export const createUser = (pubnub: any, user: User) => (dispatch: Dispatch) => {
  dispatch(creatingUser(user));

  pubnub.createUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: user.id, value: user };

        dispatch(
          errorCreatingUser({
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
  dispatch(updatingUser(user));

  pubnub.updateUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: user.id, value: user };

        dispatch(
          errorUpdatingUser({
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
  dispatch(deletingUser(id));

  pubnub.deleteUser(
    id,
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: id };

        dispatch(
          errorDeletingUser({
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
  dispatch(fetchingUsers({ label: label }));

  pubnub.getUsers(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: '' };

        dispatch(
          errorFetchingUsers({
            code: status.category,
            message: status.errorData,
            data: errorData,
            label: label,
          })
        );
      } else {
        dispatch(
          usersRetrieved({
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
  dispatch(fetchingUserById(userId));

  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: userId };

        dispatch(
          errorFetchingUserById({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userRetrieved({
            data: response.data,
          })
        );
      }
    }
  );
};
