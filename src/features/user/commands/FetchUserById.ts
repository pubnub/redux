import { Dispatch } from 'redux';
import { UserActionType } from '../UserActionType.enum';
import {
  ErrorFetchingUserByIdAction,
  UserRetrievedAction,
  FetchingUserByIdAction,
  FetchUserByIdError,
  FetchUserByIdSuccess,
  FetchUserByIdRequest,
  User,
  UserResponse,
} from '../UserActions';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

// tag::RDX-function-user-fetchbyid[]
export const fetchingUserById = <Meta extends ActionMeta>(
  payload: FetchUserByIdRequest,
  meta?: Meta
): FetchingUserByIdAction<Meta> => ({
  type: UserActionType.FETCHING_USER_BY_ID,
  payload,
  meta,
});
// end::RDX-function-user-fetchbyid[]

// tag::RDX-function-user-fetchbyid-success[]
export const userRetrieved = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: FetchUserByIdSuccess<UserType>,
  meta?: Meta
): UserRetrievedAction<UserType, Meta> => ({
  type: UserActionType.USER_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-user-fetchbyid-success[]

// tag::RDX-function-user-fetchbyid-error[]
export const errorFetchingUserById = <Meta extends ActionMeta>(
  payload: FetchUserByIdError,
  meta?: Meta
): ErrorFetchingUserByIdAction<Meta> => ({
  type: UserActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
  meta,
  error: true,
});
// end::RDX-function-user-fetchbyid-error[]

// tag::RDX-command-user-fetchbyid[]
export const fetchUserById = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchUserByIdRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(
        fetchingUserById<Meta>(
          {
            ...request,
          },
          meta
        )
      );

      pubnub.api.getUser(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingUserById<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as UserResponse<UserType>,
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
// end::RDX-command-user-fetchbyid[]
