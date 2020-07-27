import { Dispatch } from 'redux';
import {
  ErrorFetchingAllUserDataAction,
  AllUserDataRetrievedAction,
  FetchingAllUserDataAction,
  FetchUserDataError,
  FetchUserDataSuccess,
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
  payload: FetchUserDataSuccess<UserCustom>,
  meta?: Meta
): AllUserDataRetrievedAction<UserCustom, Meta> => ({
  type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingAllUserData = <Meta extends ActionMeta = AnyMeta>(
  payload: FetchUserDataError,
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
    new Promise<void>((resolve, reject) => {
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

            dispatch(allUserDataRetrieved<UserCustom, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserDataActionType.FETCH_ALL_USER_DATA_COMMAND;

  return thunkFunction;
};
