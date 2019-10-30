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
} from '../../../api/PubNubApi';

const creatingUser = <T>(payload: T): CreatingUserAction<T> => ({
  type: ActionType.CREATING_USER,
  payload,
});

const userCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserCreatedAction<T> => ({
  type: ActionType.USER_CREATED,
  payload,
});

const errorCreatingUser = <T>(
  payload: PubNubObjectApiError<T>
): ErrorCreatingUserAction<T> => ({
  type: ActionType.ERROR_CREATING_USER,
  payload,
});

export const createUser = (pubnub: any, user: User) => (dispatch: Dispatch) => {
  dispatch(creatingUser(user));

  pubnub.createUser(
    {
      ...user,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: user.id, value: user };

        dispatch(
          errorCreatingUser({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userCreated({
            data: response.data,
          })
        );
      }
    }
  );
};
