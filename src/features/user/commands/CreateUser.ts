import {
  ErrorCreatingUserAction,
  UserCreatedAction,
  CreatingUserAction,
  UserRequest,
  UserResponse,
  UserSuccess,
  UserError,
  User,
} from '../UserActions';
import { UserActionType } from '../UserActionType.enum';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';


export const creatingUser = <UserType extends User, CustomType, MetaType>(
  payload: UserRequest<UserType, CustomType>,
  meta?: MetaType
): CreatingUserAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.CREATING_USER,
  payload,
  meta,
});

export const userCreated = <UserType extends User, CustomType, MetaType>(
  payload: UserSuccess<UserType, CustomType>,
  meta?: MetaType
): UserCreatedAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.USER_CREATED,
  payload,
  meta,
});

export const errorCreatingUser = <UserType extends User, CustomType, MetaType>(
  payload: UserError<UserType, CustomType>,
  meta?: MetaType
): ErrorCreatingUserAction<UserType, CustomType, MetaType> => ({
  type: UserActionType.ERROR_CREATING_USER,
  payload,
  meta,
  error: true,
});

export const createUser = <UserType extends User, CustomType, MetaType>(request: UserRequest<UserType, CustomType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(creatingUser<UserType, CustomType, MetaType>(request, meta));

      pubnub.api.createUser(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: UserResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: UserError<UserType, CustomType> = {
              request,
              status,
            };

            dispatch(errorCreatingUser<UserType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload = {
              request,
              response,
              status,
            };

            dispatch(userCreated<UserType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.CREATE_USER_COMMAND;

  return thunkFunction;
};
