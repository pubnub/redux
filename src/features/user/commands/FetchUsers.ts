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
import { ActionMeta } from 'common/ActionMeta';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const fetchingUsers = <MetaType>(
  payload: FetchUsersRequest,
  meta?: ActionMeta<MetaType>,
): FetchingUsersAction<MetaType> => ({
  type: UserActionType.FETCHING_USERS,
  payload,
  meta,
});

export const usersRetrieved = <UserType extends User, CustomType, MetaType>(
  payload: FetchUsersSuccess<UserType, CustomType>,
  meta?: ActionMeta<MetaType>
): UsersRetrievedAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.USERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUsers = <MetaType>(
  payload: FetchUsersError,
  meta?: ActionMeta<MetaType>
): ErrorFetchingUsersAction<MetaType> => ({
  type: UserActionType.ERROR_FETCHING_USERS,
  payload,
  meta,
  error: true,
});

export const fetchUsers = <UserType extends User, CustomType, MetaType>(
  request: FetchUsersRequest = {},
  meta?: ActionMeta<MetaType>
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingUsers<MetaType>(request, meta));

      pubnub.api.getUsers(
        { ...request },
        (status: PubNubApiStatus, response: FetchUsersResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: FetchUsersError = {
              request,
              status,
            };

            dispatch(errorFetchingUsers<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchUsersSuccess<UserType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(
              usersRetrieved<UserType, CustomType, MetaType>(payload, meta)
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.FETCH_USERS_COMMAND;

  return thunkFunction;
};
