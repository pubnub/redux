import { Dispatch } from 'redux';
import {
  SettingUserDataAction,
  UserDataSetAction,
  ErrorSettingUserDataAction,
  UserDataError,
  UserDataSuccess,
  SetUserDataRequest,
} from '../UserDataActions';
import { UserDataActionType } from '../UserDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const settingUserData = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetUserDataRequest<UserCustom>,
  meta?: Meta
): SettingUserDataAction<Meta> => ({
  type: UserDataActionType.SETTING_USER_DATA,
  payload,
  meta,
});

export const UserDataSet = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: UserDataSuccess<UserCustom>,
  meta?: Meta
): UserDataSetAction<UserCustom, Meta> => ({
  type: UserDataActionType.USER_DATA_SET,
  payload,
  meta,
});

export const errorSettingUserData = <Meta extends ActionMeta>(
  payload: UserDataError,
  meta?: Meta
): ErrorSettingUserDataAction<Meta> => ({
  type: UserDataActionType.ERROR_SETTING_USER_DATA,
  payload,
  meta,
  error: true,
});

export const setUserData = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: SetUserDataRequest<UserCustom>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(settingUserData<UserCustom, Meta>(request, meta));

      pubnub.api.objects.setUUIDMetadata<UserCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorSettingUserData<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(UserDataSet<UserCustom, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserDataActionType.SET_USER_DATA_COMMAND;

  return thunkFunction;
};
