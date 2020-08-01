import { Dispatch } from 'redux';
import { UserDataActionType } from '../UserDataActionType.enum';
import {
  ErrorFetchingUserDataAction,
  UserDataRetrievedAction,
  FetchingUserDataAction,
  FetchUserDataError,
  FetchUserDataSuccess,
  FetchUserDataRequest,
} from '../UserDataActions';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingUserData = <Meta extends ActionMeta>(
  payload: FetchUserDataRequest,
  meta?: Meta
): FetchingUserDataAction<Meta> => ({
  type: UserDataActionType.FETCHING_USER_DATA,
  payload,
  meta,
});

export const UserDataRetrieved = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchUserDataSuccess<UserCustom>,
  meta?: Meta
): UserDataRetrievedAction<UserCustom, Meta> => ({
  type: UserDataActionType.USER_DATA_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUserData = <Meta extends ActionMeta>(
  payload: FetchUserDataError,
  meta?: Meta
): ErrorFetchingUserDataAction<Meta> => ({
  type: UserDataActionType.ERROR_FETCHING_USER_DATA,
  payload,
  meta,
  error: true,
});

export const fetchUserData = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchUserDataRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<UserDataRetrievedAction<UserCustom, Meta>>(
      (resolve, reject) => {
        dispatch(
          fetchingUserData<Meta>(
            {
              ...request,
            },
            meta
          )
        );

        pubnub.api.objects.getUUIDMetadata<UserCustom>(
          {
            ...request,
          },
          (status, response) => {
            if (status.error) {
              const payload = {
                request,
                status,
              };

              dispatch(errorFetchingUserData<Meta>(payload, meta));
              reject(payload);
            } else {
              const payload = {
                request,
                response,
                status,
              };

              const action = UserDataRetrieved<UserCustom, Meta>(payload, meta);

              dispatch(action);
              resolve(action);
            }
          }
        );
      }
    );

  thunkFunction.type = UserDataActionType.FETCH_USER_DATA_COMMAND;

  return thunkFunction;
};
