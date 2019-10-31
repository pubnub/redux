import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  UserDeletedAction,
  DeletingUserAction,
  ErrorDeletingUserAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Meta,
} from '../../../api/PubNubApi';

export const deletingUser = (
  payload: string,
  meta?: Meta
): DeletingUserAction => ({
  type: ActionType.DELETING_USER,
  payload,
  meta,
});

export const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): UserDeletedAction<T> => ({
  type: ActionType.USER_DELETED,
  payload,
  meta,
});

export const errorDeletingUser = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorDeletingUserAction<T> => ({
  type: ActionType.ERROR_DELETING_USER,
  payload,
  meta,
});

export const deleteUser = (pubnub: any, id: string, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingUser(id, meta));

      pubnub.deleteUser(
        id,
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: id };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorDeletingUser(payload, meta));
            reject(payload);
          } else {
            dispatch(userDeleted({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
