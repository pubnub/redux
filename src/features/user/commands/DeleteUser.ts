import {
  UserDeletedAction,
  DeletingUserAction,
  ErrorDeletingUserAction,
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  DeleteUserSuccess
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const deletingUser = <MetaType>(
  payload: DeleteUserRequest,
  meta?: MetaType
): DeletingUserAction<MetaType> => ({
  type: UserActionType.DELETING_USER,
  payload,
  meta,
});

export const userDeleted = <MetaType>(
  payload: DeleteUserSuccess,
  meta?: MetaType,
): UserDeletedAction<MetaType> => ({
  type: UserActionType.USER_DELETED,
  payload,
  meta,
});

export const errorDeletingUser = <MetaType>(
  payload: DeleteUserError,
  meta?: MetaType,
): ErrorDeletingUserAction<MetaType> => ({
  type: UserActionType.ERROR_DELETING_USER,
  payload,
  meta,
  error: true,
});

export const deleteUser = <MetaType>(request: DeleteUserRequest, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingUser<MetaType>(request, meta));

      pubnub.api.deleteUser(
        request.userId,
        (status: PubNubApiStatus , response: DeleteUserResponse) => {
          if (status.error) {
            let payload: DeleteUserError = {
              request,
              status,
            };

            dispatch(errorDeletingUser<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: DeleteUserSuccess = {
              request,
              response,
              status,
            };

            dispatch(userDeleted<MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.DELETE_USER_COMMAND;

  return thunkFunction;
};
