import { Dispatch } from 'redux';
import {
  UserDeletedAction,
  DeletingUserAction,
  ErrorDeletingUserAction,
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  DeleteUserSuccess,
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-user-delete[]
export const deletingUser = <Meta extends ActionMeta>(
  payload: DeleteUserRequest,
  meta?: Meta
): DeletingUserAction<Meta> => ({
  type: UserActionType.DELETING_USER,
  payload,
  meta,
});
// end::RDX-function-user-delete[]

// tag::RDX-function-user-delete-success[]
export const userDeleted = <Meta extends ActionMeta>(
  payload: DeleteUserSuccess,
  meta?: Meta
): UserDeletedAction<Meta> => ({
  type: UserActionType.USER_DELETED,
  payload,
  meta,
});
// end::RDX-function-user-delete-success[]

// tag::RDX-function-user-delete-error[]
export const errorDeletingUser = <Meta extends ActionMeta>(
  payload: DeleteUserError,
  meta?: Meta
): ErrorDeletingUserAction<Meta> => ({
  type: UserActionType.ERROR_DELETING_USER,
  payload,
  meta,
  error: true,
});
// end::RDX-function-user-delete-error[]

// tag::RDX-command-user-delete[]
export const deleteUser = <Meta extends ActionMeta = AnyMeta>(
  request: DeleteUserRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingUser<Meta>(request, meta));

      pubnub.api.deleteUser(
        request.userId,
        (status: PubNubApiStatus, response: DeleteUserResponse) => {
          if (status.error) {
            let payload: DeleteUserError = {
              request,
              status,
            };

            dispatch(errorDeletingUser<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: DeleteUserSuccess = {
              request,
              response,
              status,
            };

            dispatch(userDeleted<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.DELETE_USER_COMMAND;

  return thunkFunction;
};
// end::RDX-command-user-delete[]
