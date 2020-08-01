import { Dispatch } from 'redux';
import {
  ErrorFetchingAllUserDataAction,
  AllUserDataRetrievedAction,
  FetchingAllUserDataAction,
  FetchAllUserDataError,
  FetchAllUserDataSuccess,
  FetchAllUserDataRequest,
} from '../UserDataActions';
import { UserDataActionType } from '../UserDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingAllUserData = <Meta extends ActionMeta>(
  payload: FetchAllUserDataRequest,
  meta?: Meta
): FetchingAllUserDataAction<Meta> => ({
  type: UserDataActionType.FETCHING_ALL_USER_DATA,
  payload,
  meta,
});

export const allUserDataRetrieved = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchAllUserDataSuccess<UserCustom>,
  meta?: Meta
): AllUserDataRetrievedAction<UserCustom, Meta> => ({
  type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingAllUserData = <Meta extends ActionMeta = AnyMeta>(
  payload: FetchAllUserDataError,
  meta?: Meta
): ErrorFetchingAllUserDataAction<Meta> => ({
  type: UserDataActionType.ERROR_FETCHING_ALL_USER_DATA,
  payload,
  meta,
  error: true,
});

export const fetchAllUserData = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchAllUserDataRequest = {},
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<AllUserDataRetrievedAction<UserCustom, Meta>>(
      (resolve, reject) => {
        dispatch(fetchingAllUserData<Meta>(request, meta));

        pubnub.api.objects.getAllUUIDMetadata<UserCustom>(
          {
            ...request,
          },
          (status, response) => {
            if (status.error) {
              const payload = {
                request,
                status,
              };

              dispatch(errorFetchingAllUserData<Meta>(payload, meta));
              reject(payload);
            } else {
              const payload = {
                request,
                response,
                status,
              };

              const action = allUserDataRetrieved<UserCustom, Meta>(
                payload,
                meta
              );

              dispatch(action);
              resolve(action);
            }
          }
        );
      }
    );

  thunkFunction.type = UserDataActionType.FETCH_ALL_USER_DATA_COMMAND;

  return thunkFunction;
};
