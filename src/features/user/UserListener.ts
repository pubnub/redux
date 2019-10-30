import { ObjectsActionPayload } from 'api/Objects';
import { UserDeletedAction, UserUpdatedAction } from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Dispatch } from 'redux';
import { PubNubObjectApiSuccess, Identifiable } from 'api/PubNubApi';

const userUpdated = <T extends Identifiable>(
  payload: PubNubObjectApiSuccess<T>
): UserUpdatedAction<T> => ({
  type: ActionType.USER_UPDATED,
  payload,
});

const userDeleted = <T extends Identifiable>(
  payload: PubNubObjectApiSuccess<T>
): UserDeletedAction<T> => ({
  type: ActionType.USER_DELETED,
  payload,
});

export const createUserActionListener = <T extends Identifiable>(
  dispatch: Dispatch<UserUpdatedAction<T> | UserDeletedAction<T>>
) => ({
  user: (payload: ObjectsActionPayload<T>) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(
          userUpdated({
            data: payload.message.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          userDeleted({
            data: payload.message.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
