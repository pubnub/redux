import { Dispatch } from 'redux';
import {
  UserDataRemovedAction,
  RemovingUserDataAction,
  ErrorRemovingUserDataAction,
  DeleteUserDataRequest,
  DeleteUserDataError,
  DeleteUserDataSuccess,
} from '../UserDataActions';
import { UserDataActionType } from '../UserDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';

export const removingUserData = <Meta extends ActionMeta>(
  payload: DeleteUserDataRequest,
  meta?: Meta
): RemovingUserDataAction<Meta> => ({
  type: UserDataActionType.REMOVING_USER_DATA,
  payload,
  meta,
});

export const UserDataRemoved = <Meta extends ActionMeta>(
  payload: DeleteUserDataSuccess,
  meta?: Meta
): UserDataRemovedAction<Meta> => ({
  type: UserDataActionType.USER_DATA_REMOVED,
  payload,
  meta,
});

export const errorRemovingUserData = <Meta extends ActionMeta>(
  payload: DeleteUserDataError,
  meta?: Meta
): ErrorRemovingUserDataAction<Meta> => ({
  type: UserDataActionType.ERROR_REMOVING_USER_DATA,
  payload,
  meta,
  error: true,
});

export const removeUserData = <Meta extends ActionMeta = AnyMeta>(
  request: DeleteUserDataRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(removingUserData<Meta>(request, meta));

      pubnub.api.objects.removeUUIDMetadata(
        { uuid: request.uuid },
        (status) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorRemovingUserData<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              status,
            };

            dispatch(UserDataRemoved<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserDataActionType.REMOVE_USER_DATA_COMMAND;

  return thunkFunction;
};
