import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  UserUpdatedAction,
  UpdatingUserAction,
  ErrorUpdatingUserAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { User } from '../../../api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Meta,
} from '../../../api/PubNubApi';

export const updatingUser = <T>(
  payload: T,
  meta?: Meta
): UpdatingUserAction<T> => ({
  type: ActionType.UPDATING_USER,
  payload,
  meta,
});

export const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): UserUpdatedAction<T> => ({
  type: ActionType.USER_UPDATED,
  payload,
  meta,
});

export const errorUpdatingUser = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorUpdatingUserAction<T> => ({
  type: ActionType.ERROR_UPDATING_USER,
  payload,
  meta,
});

export const updateUser = (pubnub: any, user: User, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingUser(user, meta));

      pubnub.updateUser(
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

            dispatch(errorUpdatingUser(payload, meta));
            reject(payload);
          } else {
            dispatch(userUpdated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
