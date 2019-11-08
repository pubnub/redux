import { UserActionType } from '../UserActionType.enum';
import {
  ErrorFetchingUserByIdAction,
  UserRetrievedAction,
  FetchingUserByIdAction,
  FetchUserByIdRequest,
  FetchUserByIdError,
  UserResponse,
  User,
  FetchUserByIdSuccess,
} from '../UserActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';

export const fetchingUserById = <Meta extends ActionMeta>(
  payload: FetchUserByIdRequest,
  meta?: Meta,
): FetchingUserByIdAction<Meta> => ({
  type: UserActionType.FETCHING_USER_BY_ID,
  payload,
  meta,
});

export const userRetrieved = <UserType extends User<ObjectsCustom>, Meta extends ActionMeta>(
  payload: FetchUserByIdSuccess<UserType>,
  meta?: Meta
): UserRetrievedAction<UserType, Meta> => ({
  type: UserActionType.USER_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUserById = <Meta extends ActionMeta>(
  payload: FetchUserByIdError,
  meta?: Meta
): ErrorFetchingUserByIdAction<Meta> => ({
  type: UserActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
  meta,
  error: true,
});

export const fetchUserById = <UserType extends User<ObjectsCustom>, Meta extends ActionMeta = never>(
  request: FetchUserByIdRequest,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingUserById<Meta>({
        ...request,
      }, meta));

      pubnub.api.getUser(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: UserResponse<UserType>) => {
          if (status.error) {
            let payload: FetchUserByIdError = {
              request,
              status,
            };

            dispatch(errorFetchingUserById<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchUserByIdSuccess<UserType> = {
              request,
              response,
              status,
            };

            dispatch(userRetrieved<UserType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.FETCH_USER_BY_ID_COMMAND;

  return thunkFunction;
};
