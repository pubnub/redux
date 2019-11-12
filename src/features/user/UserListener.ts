import { Dispatch } from 'redux';
import {
  UserUpdatedEventAction,
  UserDeletedEventAction,
  UserEventMessage,
  UserListenerActions,
  User,
  AnyUser,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';

export const userUpdated = <UserType extends User<ObjectsCustom>>(
  payload: UserEventMessage<UserType>
): UserUpdatedEventAction<UserType> => ({
  type: UserActionType.USER_UPDATED_EVENT,
  payload,
});

export const userDeleted = <UserType extends User<ObjectsCustom>>(
  payload: UserEventMessage<UserType>
): UserDeletedEventAction<UserType> => ({
  type: UserActionType.USER_DELETED_EVENT,
  payload,
});

export const createUserListener = <
  UserType extends User<ObjectsCustom> = AnyUser
>(
  dispatch: Dispatch<UserListenerActions<UserType>>
) => ({
  user: (payload: UserEventMessage<UserType>) => {
    switch (payload.event) {
      case 'update':
        dispatch(userUpdated<UserType>(payload));
        break;
      case 'delete':
        dispatch(userDeleted<UserType>(payload));
        break;
      default:
        break;
    }
  },
});
