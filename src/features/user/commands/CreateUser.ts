import { Dispatch } from 'redux';
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
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';

export const creatingUser = <Meta extends ActionMeta>(
  payload: UserRequest,
  meta?: Meta
): CreatingUserAction<Meta> => ({
  type: UserActionType.CREATING_USER,
  payload,
  meta,
});

export const userCreated = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: UserSuccess<UserType>,
  meta?: Meta
): UserCreatedAction<UserType, Meta> => ({
  type: UserActionType.USER_CREATED,
  payload,
  meta,
});

export const errorCreatingUser = <Meta extends ActionMeta>(
  payload: UserError,
  meta?: Meta
): ErrorCreatingUserAction<Meta> => ({
  type: UserActionType.ERROR_CREATING_USER,
  payload,
  meta,
  error: true,
});

export const createUser = <
  UserType extends User<ObjectsCustom>,
  Meta extends ActionMeta = never
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
      dispatch(creatingUser<Meta>(request, meta));

      pubnub.api.createUser(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: UserResponse<UserType>) => {
          if (status.error) {
            let payload: UserError = {
              request,
              status,
            };

            dispatch(errorCreatingUser<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload = {
              request,
              response,
              status,
            };

            dispatch(userCreated<UserType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = UserActionType.CREATE_USER_COMMAND;

  return thunkFunction;
};
