
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
} from '../../../api/PubNubApi';

const updatingUser = <T>(payload: T): UpdatingUserAction<T> => ({
  type: ActionType.UPDATING_USER,
  payload,
});

const userUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: ActionType.USER_UPDATED,
  payload,
});

const errorUpdatingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingUserAction<T> => ({
  type: ActionType.ERROR_UPDATING_USER,
  payload,
});

export const updateUser = (pubnub: any, user: User) => (dispatch: Dispatch) => {
  dispatch(updatingUser(user));

  pubnub.updateUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: user.id, value: user };

        dispatch(
          errorUpdatingUser({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};
