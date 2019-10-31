import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  ErrorCreatingUserAction,
  UserCreatedAction,
  CreatingUserAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { User } from '../../../api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Meta,
} from '../../../api/PubNubApi';

export const creatingUser = <T>(
  payload: T,
  meta?: Meta
): CreatingUserAction<T> => ({
  type: ActionType.CREATING_USER,
  payload,
  meta,
});

export const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): UserCreatedAction<T> => ({
  type: ActionType.USER_CREATED,
  payload,
  meta,
});

export const errorCreatingUser = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorCreatingUserAction<T> => ({
  type: ActionType.ERROR_CREATING_USER,
  payload,
  meta,
});

export const createUser = (pubnub: any, user: User, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(creatingUser(user, meta));

      pubnub.createUser(
        {
          ...user,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: user.id, value: user };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorCreatingUser(payload, meta));
            reject(payload);
          } else {
            dispatch(userCreated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
