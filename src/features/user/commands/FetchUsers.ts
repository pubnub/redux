import { Dispatch } from 'redux';
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
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';

// tag::RDX-function-user-fetch[]
export const fetchingUsers = <Meta extends ActionMeta>(
  payload: FetchUsersRequest,
  meta?: Meta
): FetchingUsersAction<Meta> => ({
  type: UserActionType.FETCHING_USERS,
  payload,
  meta,
});
// end::RDX-function-user-fetch[]

// tag::RDX-function-user-fetch-success[]
export const usersRetrieved = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: FetchUsersSuccess<UserType>,
  meta?: Meta
): UsersRetrievedAction<UserType, Meta> => ({
  type: UserActionType.USERS_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-user-fetch-success[]

// tag::RDX-function-user-fetch-error[]
export const errorFetchingUsers = <Meta extends ActionMeta = AnyMeta>(
  payload: FetchUsersError,
  meta?: Meta
): ErrorFetchingUsersAction<Meta> => ({
  type: UserActionType.ERROR_FETCHING_USERS,
  payload,
  meta,
  error: true,
});
// end::RDX-function-user-fetch-error[]

// tag::RDX-command-user-fetch[]
export const fetchUsers = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchUsersRequest = {},
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
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

            dispatch(usersRetrieved<UserType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.FETCH_USERS_COMMAND;

  return thunkFunction;
};
// end::RDX-command-user-fetch[]
