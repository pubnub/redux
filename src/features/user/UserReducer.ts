import { AnyAction } from 'redux';
import {
  UserActions,
  UserListenerActions,
  User,
  UserEventMessage,
  UserSuccess,
  DeleteUserSuccess,
  FetchUsersSuccess,
  FetchUserByIdSuccess,
  AnyUser,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';
import {
  MembersActions,
  Members,
  FetchMembersSuccess,
} from '../../features/members/MembersActions';
import {
  MembershipActions,
  Membership,
} from '../../features/membership/MembershipActions';
import { AnySpace } from '../../features/space/SpaceActions';
import { MembersActionType } from '../../features/members/MembersActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { AnyMeta } from '../../foundations/ActionMeta';

// tag::RDX-059[]
export interface UsersByIdState<ReceivedUser extends User<ObjectsCustom>> {
  byId: {
    [userId: string]: ReceivedUser;
  };
}
// end::RDX-059[]

const createInitialState = () => ({
  byId: {},
});

const userCreated = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: UserSuccess<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userUpdated = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: UserSuccess<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userDeleted = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: DeleteUserSuccess
) => {
  let newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.request.userId];

  return newState;
};

const usersRetrieved = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: FetchUsersSuccess<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  payload.response.data.forEach((item) => {
    newState.byId[item.id] = item;
  });

  return newState;
};

const userRetrieved = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: FetchUserByIdSuccess<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userUpdatedEventReceived = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: UserEventMessage<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.data.id] = payload.data;

  return newState;
};

const userDeletedEventReceived = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: UserEventMessage<ReceivedUser>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.data.id];

  return newState;
};

const membersRetrieved = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: FetchMembersSuccess<Members<ObjectsCustom, ReceivedUser>>
) => {
  let newState = state;

  if (payload.response.data.length > 0) {
    newState = {
      byId: {
        ...state.byId,
      },
    };

    for (let i = 0; i < payload.response.data.length; i++) {
      let currentMember = payload.response.data[i];

      if (currentMember.user) {
        newState.byId[currentMember.id] = currentMember.user;
      }
    }
  }

  return newState;
};

type UserReducerActions<StoredUser extends User<ObjectsCustom>> =
  | UserActions<StoredUser, AnyMeta>
  | UserListenerActions<StoredUser>
  | MembersActions<Members<ObjectsCustom, AnySpace>, AnyMeta>
  | MembershipActions<Membership<ObjectsCustom, AnySpace>, AnyMeta>;

export type UserReducer<
  StoredUser extends User<ObjectsCustom>,
  UserAction extends AnyAction
> = (
  state: UsersByIdState<StoredUser> | undefined,
  action: UserAction
) => UsersByIdState<StoredUser>;

export const createUserReducer = <
  StoredUser extends User<ObjectsCustom> = AnyUser,
  UserAction extends AnyAction = UserReducerActions<StoredUser>
>(): UserReducer<StoredUser, UserAction> => (
  state: UsersByIdState<StoredUser> = createInitialState(),
  action: UserAction
): UsersByIdState<StoredUser> => {
  switch (action.type) {
    case UserActionType.USER_CREATED:
      return userCreated<StoredUser>(state, action.payload);
    case UserActionType.USER_UPDATED:
      return userUpdated<StoredUser>(state, action.payload);
    case UserActionType.USER_DELETED:
      return userDeleted<StoredUser>(state, action.payload);
    case UserActionType.USERS_RETRIEVED:
      return usersRetrieved<StoredUser>(state, action.payload);
    case UserActionType.USER_RETRIEVED:
      return userRetrieved<StoredUser>(state, action.payload);
    case UserActionType.USER_UPDATED_EVENT:
      return userUpdatedEventReceived<StoredUser>(state, action.payload);
    case UserActionType.USER_DELETED_EVENT:
      return userDeletedEventReceived<StoredUser>(state, action.payload);
    case MembersActionType.MEMBERS_RETRIEVED:
      return membersRetrieved<StoredUser>(state, action.payload);
    default:
      return state;
  }
};
