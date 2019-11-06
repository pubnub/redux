import { Dispatch } from 'redux';
import {
  UserUpdatedEventAction,
  UserDeletedEventAction,
  UserEventMessage,
  UserListenerActions,
  User,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';

export const userUpdated = <UserType extends User, CustomType>(
  payload: UserEventMessage<UserType, CustomType>
): UserUpdatedEventAction<UserType, CustomType> => ({
  type: UserActionType.USER_UPDATED_EVENT,
  payload,
});

export const userDeleted = <UserType extends User, CustomType>(
  payload: UserEventMessage<UserType, CustomType>
): UserDeletedEventAction<UserType, CustomType> => ({
  type: UserActionType.USER_DELETED_EVENT,
  payload,
});

export const createUserListener = <UserType extends User, CustomType>(
  dispatch: Dispatch<UserListenerActions<UserType, CustomType>>
) => ({
  user: (payload: UserEventMessage<UserType, CustomType>) => {
    switch (payload.event) {
      case 'update':
        dispatch(userUpdated<UserType, CustomType>(payload));
        break;
      case 'delete':
        dispatch(userDeleted<UserType, CustomType>(payload));
        break;
      default:
        break;
    }
  },
});
