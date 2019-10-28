import { ObjectsResponsePayload, ObjectsListInput } from '../api/Objects';
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
} from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';
import { User } from '../api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
} from 'api/PubNubApi';

// tag::[RED-176]
export const createUserBegin = <T>(payload: T): CreateUserBeginAction<T> => ({
  type: actionType.OBJECTS_CREATE_USER_BEGIN,
  payload,
});
// end::[RED-176]

// tag::[RED-177]
export const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserCreatedAction<T> => ({
  type: actionType.OBJECTS_CREATE_USER,
  payload,
});
// end::[RED-177]

// tag::[RED-178]
export const createUserError = <T>(
  payload: PubNubObjectApiError<T>
): CreateUserErrorAction<T> => ({
  type: actionType.OBJECTS_CREATE_USER_ERROR,
  payload,
});
// end::[RED-178]

// tag::[RED-179]
export const userListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): UserListRetrievedAction<T> => ({
  type: actionType.OBJECTS_FETCH_USERS,
  payload,
});
// end::[RED-179]

// tag::[RED-180]
export const fetchUsersBegin = (payload: {
  label: string;
}): FetchUsersBeginAction => ({
  type: actionType.OBJECTS_FETCH_USERS_BEGIN,
  payload,
});
// end::[RED-180]

// tag::[RED-181]
export const fetchUsersError = <T>(
  payload: PubNubObjectApiError<T>
): FetchUsersErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_USERS_ERROR,
  payload,
});
// end::[RED-181]

// tag::[RED-182]
export const userRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchUserByIdAction<T> => ({
  type: actionType.OBJECTS_FETCH_USER_BY_ID,
  payload,
});
// end::[RED-182]

// tag::[RED-183]
export const fetchUserByIdBegin = (
  payload: string
): FetchUserByIdBeginAction => ({
  type: actionType.OBJECTS_FETCH_USER_BY_ID_BEGIN,
  payload,
});
// end::[RED-183]

// tag::[RED-184]
export const fetchUserByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchUserByIdErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_USER_BY_ID_ERROR,
  payload,
});
// end::[RED-184]

// tag::[RED-185]
export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_USER,
  payload,
});
// end::[RED-185]

// tag::[RED-186]
export const updateUserBegin = <T>(payload: T): UpdateUserBeginAction<T> => ({
  type: actionType.OBJECTS_UPDATE_USER_BEGIN,
  payload,
});
// end::[RED-186]

// tag::[RED-187]
export const updateUserError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateUserErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_USER_ERROR,
  payload,
});
// end::[RED-187]

// tag::[RED-188]
export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: actionType.OBJECTS_DELETE_USER,
  payload,
});
// end::[RED-188]

// tag::[RED-189]
export const deleteUserBegin = (payload: string): DeleteUserBeginAction => ({
  type: actionType.OBJECTS_DELETE_USER_BEGIN,
  payload,
});
// end::[RED-189]

// tag::[RED-190]
export const deleteUserError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteUserErrorAction<T> => ({
  type: actionType.OBJECTS_DELETE_USER_ERROR,
  payload,
});
// end::[RED-190]

// tag::[RED-191]
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
// end::[RED-191]

// tag::[RED-192]
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
// end::[RED-192]

// tag::[RED-193]
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
// end::[RED-193]

// tag::[RED-194]
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
// end::[RED-194]

// tag::[RED-195]
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
// end::[RED-195]
