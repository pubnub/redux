import { ObjectsResponsePayload } from 'api/Objects';
import {
  UserDeletedAction,
  DeletingUserAction,
  ErrorDeletingUserAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Dispatch } from 'redux';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from 'api/PubNubApi';

const deletingUser = (payload: string): DeletingUserAction => ({
  type: ActionType.DELETING_USER,
  payload,
});

const userDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: ActionType.USER_DELETED,
  payload,
});

const errorDeletingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorDeletingUserAction<T> => ({
  type: ActionType.ERROR_DELETING_USER,
  payload,
});

export const deleteUser = (pubnub: any, id: string) => (dispatch: Dispatch) => {
  dispatch(deletingUser(id));

  pubnub.deleteUser(
    id,
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: id };

        dispatch(
          errorDeletingUser({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userDeleted({
            data: response.data,
          })
        );
      }
    }
  );
};
