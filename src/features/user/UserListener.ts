import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import {
  UserUpdatedEventAction,
  UserDeletedEventAction,
  UserListenerActions,
  User,
  UserEventMessage,
  UserListenerPayload,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

// tag::RDX-event-user-updated[]
export const userUpdated = <UserType extends User<ObjectsCustom>>(
  payload: UserEventMessage<UserType>
): UserUpdatedEventAction<UserType> => ({
  type: UserActionType.USER_UPDATED_EVENT,
  payload,
});
// end::RDX-event-user-updated[]

// tag::RDX-event-user-deleted[]
export const userDeleted = <UserType extends User<ObjectsCustom>>(
  payload: UserEventMessage<UserType>
): UserDeletedEventAction<UserType> => ({
  type: UserActionType.USER_DELETED_EVENT,
  payload,
});
// end::RDX-event-user-deleted[]

// tag::RDX-method-listener-user[]
export const createUserListener = <UserType extends User<ObjectsCustom> = User>(
  dispatch: Dispatch<UserListenerActions<UserType>>
) => ({
  user: (payload: Pubnub.UserEvent) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(
          userUpdated<UserType>(
            ((payload as unknown) as UserListenerPayload<UserType>).message
          )
        );
        break;
      case 'delete':
        dispatch(
          userDeleted<UserType>(
            ((payload as unknown) as UserListenerPayload<UserType>).message
          )
        );
        break;
      default:
        break;
    }
  },
});
// end::RDX-method-listener-user[]
