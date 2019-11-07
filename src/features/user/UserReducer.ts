import {
  UserActions,
  UserListenerActions,
  UserResponseItem,
  User,
  UserEventMessage,
  UserSuccess,
  DeleteUserSuccess,
  FetchUsersSuccess,
  FetchUserByIdSuccess,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';
import { MembersActions, Member, FetchMembersSuccess } from '../../features/members/MembersActions';
import { MembershipActions, Membership } from '../../features/membership/MembershipActions';
import { Space } from '../../features/space/SpaceActions';
import { MembersActionType } from '../../features/members/MembersActionType.enum';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

// tag::RDX-059[]
export interface UsersByIdState<ReceivedUser extends User<ObjectsCustom>> {
  byId: {
    [userId: string]: ReceivedUser
  },
};
// end::RDX-059[]

const createInitialState = <ReceivedUser extends User<ObjectsCustom>>(): UsersByIdState<ReceivedUser> => ({
  byId: {},
});

const userCreated = <ReceivedUser extends User<ObjectsCustom>>(
  state: UsersByIdState<ReceivedUser>,
  payload: UserSuccess<ReceivedUser>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userUpdated = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: UserSuccess<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userDeleted = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: DeleteUserSuccess
) => {
  let newState = {
    byId: { ...state.byId }
  };

  delete newState.byId[payload.request.userId];

  return newState;
};

const usersRetrieved = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: FetchUsersSuccess<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  payload.response.data.forEach((item) => {
    newState.byId[item.id] = item;
  });

  return newState;
};

const userRetrieved = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: FetchUserByIdSuccess<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const userUpdatedEventReceived = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: UserEventMessage<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.data.id] = payload.data;

  return newState;
};

const userDeletedEventReceived = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: UserEventMessage<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  delete newState.byId[payload.data.id];

  return newState;
}

const membersRetrieved = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: FetchMembersSuccess<UserType, CustomType>,
) => {
  let newState = state;

  if (payload.response.data.length > 0) {
    newState = {
      byId: {
        ...state.byId
      }
    };

    for (let i = 0; i < payload.response.data.length; i++) {
      let currentMember = payload.response.data[i];
      
      newState.byId[currentMember.id] = currentMember.user;
    }
  }

  return newState;
};

export const createUserReducer = <UserType extends User, SpaceType extends Space, MemberType extends Member<CustomType>, MembershipType extends Membership<CustomType>, CustomType, MetaType>() => (
  state: UsersByIdState<UserType, CustomType> = createInitialState<UserType, CustomType>(),
  action: UserActions<UserType, CustomType, MetaType> 
    | UserListenerActions<UserType, CustomType> 
    | MembersActions<UserType, MemberType, CustomType, MetaType>
    | MembershipActions<SpaceType, MembershipType, CustomType, MetaType>
): UsersByIdState<UserType, CustomType> => {
  switch (action.type) {
    case UserActionType.USER_CREATED:
      return userCreated<UserType, CustomType>(state, action.payload);
    case UserActionType.USER_UPDATED:
      return userUpdated<UserType, CustomType>(state, action.payload);
    case UserActionType.USER_DELETED:
      return userDeleted<UserType, CustomType>(state, action.payload);
    case UserActionType.USERS_RETRIEVED:
      return usersRetrieved<UserType, CustomType>(state, action.payload);
    case UserActionType.USER_RETRIEVED:
      return userRetrieved<UserType, CustomType>(state, action.payload);
    case UserActionType.USER_UPDATED_EVENT:
      return userUpdatedEventReceived<UserType, CustomType>(state, action.payload);
    case UserActionType.USER_DELETED_EVENT:
      return userDeletedEventReceived<UserType, CustomType>(state, action.payload);
    case MembersActionType.MEMBERS_RETRIEVED:
      return membersRetrieved<UserType, CustomType>(state, action.payload);
    default:
      return state;
  }
};
