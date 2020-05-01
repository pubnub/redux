import { Dispatch } from 'redux';
import {
  UpdatingUserAction,
  UserUpdatedAction,
  ErrorUpdatingUserAction,
  UserError,
  UserSuccess,
  UserRequest,
  User,
  UserResponse,
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

// tag::RDX-function-user-update[]
export const updatingUser = <Meta extends ActionMeta>(
  payload: UserRequest,
  meta?: Meta
): UpdatingUserAction<Meta> => ({
  type: UserActionType.UPDATING_USER,
  payload,
  meta,
});
// end::RDX-function-user-update[]

// tag::RDX-function-user-update-success[]
export const userUpdated = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: UserSuccess<UserType>,
  meta?: Meta
): UserUpdatedAction<UserType, Meta> => ({
  type: UserActionType.USER_UPDATED,
  payload,
  meta,
});
// end::RDX-function-user-update-success[]

// tag::RDX-function-user-update-error[]
export const errorUpdatingUser = <Meta extends ActionMeta>(
  payload: UserError,
  meta?: Meta
): ErrorUpdatingUserAction<Meta> => ({
  type: UserActionType.ERROR_UPDATING_USER,
  payload,
  meta,
  error: true,
});
// end::RDX-function-user-update-error[]

// tag::RDX-command-user-update[]
export const updateUser = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta = AnyMeta
>(
  request: UserRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingUser<Meta>(request, meta));

      pubnub.api.updateUser(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorUpdatingUser<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as UserResponse<UserType>,
              status,
            };

            dispatch(userUpdated<UserType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.UPDATE_USER_COMMAND;

  return thunkFunction;
};
// end::RDX-command-user-update[]
