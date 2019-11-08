import {
  ErrorFetchingUsersAction,
  UsersRetrievedAction,
  FetchingUsersAction,
  FetchUsersRequest,
  FetchUsersResponse,
  FetchUsersError,
  User,
  FetchUsersSuccess,
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingUsers = <Meta extends ActionMeta>(
  payload: FetchUsersRequest,
  meta?: Meta,
): FetchingUsersAction<Meta> => ({
  type: UserActionType.FETCHING_USERS,
  payload,
  meta,
});

export const usersRetrieved = <UserType extends User<ObjectsCustom>, Meta extends ActionMeta>(
  payload: FetchUsersSuccess<UserType>,
  meta?: Meta
): UsersRetrievedAction<UserType, Meta> => ({
  type: UserActionType.USERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUsers = <Meta extends ActionMeta = never>(
  payload: FetchUsersError,
  meta?: Meta
): ErrorFetchingUsersAction<Meta> => ({
  type: UserActionType.ERROR_FETCHING_USERS,
  payload,
  meta,
  error: true,
});

export const fetchUsers = <UserType extends User<ObjectsCustom>, Meta extends ActionMeta = never>(
  request: FetchUsersRequest = {},
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingUsers<Meta>(request, meta));

      pubnub.api.getUsers(
        { ...request },
        (status: PubNubApiStatus, response: FetchUsersResponse<UserType>) => {
          if (status.error) {
            let payload: FetchUsersError = {
              request,
              status,
            };

            dispatch(errorFetchingUsers<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchUsersSuccess<UserType> = {
              request,
              response,
              status,
            };

            dispatch(
              usersRetrieved<UserType, Meta>(payload, meta)
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.FETCH_USERS_COMMAND;

  return thunkFunction;
};
