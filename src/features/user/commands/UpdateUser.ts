import {
  UpdatingUserAction,
  UserUpdatedAction,
  ErrorUpdatingUserAction,
  UserRequest,
  UserResponse,
  UserError,
  User,
  UserSuccess,
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';

export const updatingUser = <UserType extends User, CustomType, MetaType>(
  payload: UserRequest<UserType, CustomType>,
  meta?: MetaType
): UpdatingUserAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.UPDATING_USER,
  payload,
  meta,
});

export const userUpdated = <UserType extends User, CustomType, MetaType>(
  payload: UserSuccess<UserType, CustomType>,
  meta?: MetaType
): UserUpdatedAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.USER_UPDATED,
  payload,
  meta,
});

export const errorUpdatingUser = <UserType extends User, CustomType, MetaType>(
  payload: UserError<UserType, CustomType>,
  meta?: MetaType
): ErrorUpdatingUserAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.ERROR_UPDATING_USER,
  payload,
  meta,
  error: true,
});

export const updateUser = <UserType extends User, CustomType, MetaType>(request: UserRequest<UserType, CustomType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingUser<UserType, CustomType, MetaType>(request, meta));

      pubnub.api.updateUser(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: UserResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: UserError<UserType, CustomType> = {
              request,
              status
            };

            dispatch(errorUpdatingUser<UserType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: UserSuccess<UserType, CustomType> = {
              request,
              response,
              status
            };

            dispatch(userUpdated<UserType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.UPDATE_USER_COMMAND;

  return thunkFunction;
};
