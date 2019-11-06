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
import { MembersActions, Member } from '../../features/members/MembersActions';
import { MembershipActions, Membership } from '../../features/membership/MembershipActions';
import { Space } from 'features/space/SpaceActions';

export type UsersByIdState<UserType extends User, CustomType> = {
  byId: {
    [userId: string]: UserResponseItem<UserType, CustomType>
  },
};

// tag::RDX-054[]
const createInitialState = <UserType extends User, CustomType>(): UsersByIdState<UserType, CustomType> => ({
  byId: {},
});
// end::RDX-054[]

// tag::RDX-056[]
const userCreated = <UserType extends User, CustomType>(
  state: UsersByIdState<UserType, CustomType>,
  payload: UserSuccess<UserType, CustomType>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};
// end::RDX-056[]

// tag::RDX-059[]
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
// end::RDX-059[]

// tag::RDX-062[]
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
// end::RDX-062[]

// tag::RDX-064[]
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
// end::RDX-064[]

// tag::RDX-066[]
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
// end::RDX-066[]

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

// // tag::RDX-068[]
// const membersRetrieved = <UserType extends User, CustomType>(
//   state: UsersByIdState<UserType, CustomType>,
//   payload: PubNubObjectApiSuccess<MembersResult>
// ) => {
//   let newState = state;

//   if (payload.data.users.length > 0) {
//     for (let i = 0; i < payload.data.users.length; i++) {
//       let currentUser = payload.data.users[i].user;

//       if (currentUser !== undefined) {
//         newState = successObjectById<T>(
//           newState,
//           {
//             data: (currentUser as unknown) as T,
//           },
//           currentUser.id
//         );
//       }
//     }
//   }

//   return newState;
// };
// // end::RDX-068[]

// const membersAddedToSpace = <UserType extends User, CustomType>(
//   state: UsersByIdState<UserType, CustomType>,
//   payload: PubNubObjectApiSuccess<MembersResult>
// ) => ({
// }):

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
    // case MembersActionType.MEMBERS_RETRIEVED:
    //   return membersRetrieved<UserType, CustomType>(state, action.payload);
    // case MembershipActionType.USER_ADDED_TO_SPACE:
    //     return membersAddedToSpace<UserType, CustomType>(state, action.payload);
    default:
      return state;
  }
};
