import {
  MembersActions,
  Member,
  FetchMembersSuccess,
  MembersSuccess,
} from './MembersActions';
import { MembersActionType } from './MembersActionType.enum';
import { MembershipListenerActions, MembershipEventMessage } from '../../features/membership/MembershipActions';
import { MembershipActionType } from '../../features/membership/MembershipActionType.enum';
import { User } from '../../features/user/UserActions';

export type MembersBySpaceIdState<CustomType> = {
  byId: {
    [spaceId: string]: Member<CustomType>[]
  },
};

const createInitialState = <CustomType>(): MembersBySpaceIdState<CustomType> => ({
  byId: {},
});

const userAddedToSpace = <CustomType>(
  state: MembersBySpaceIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>,
) => {
  if (state.byId[payload.data.spaceId].filter((member) => member.userId === payload.data.userId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.spaceId] = [
      ...newState.byId[payload.data.spaceId],
      {
        userId: payload.data.userId,
        custom: payload.data.custom,
      }
    ];

    return newState;
  }

  return state;
};

const userRemovedFromSpace = <CustomType>(
  state: MembersBySpaceIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>,
) => {
  if (state.byId[payload.data.spaceId].filter((member) => member.userId === payload.data.userId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.spaceId] = newState.byId[payload.data.spaceId].filter(
      (member) => member.userId !== payload.data.userId
    );

    return newState;
  }

  return state;
};

const userMembersUpdatedOnSpace = <CustomType>(
  state: MembersBySpaceIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>,
) => {
  console.log(payload)
  // TODO: need to update the custom object
  return state;
};

const membersResult = <UserType extends User, MemberType extends Member<CustomType>, CustomType>(
  state: MembersBySpaceIdState<CustomType>,
  payload: FetchMembersSuccess<UserType, CustomType> | MembersSuccess<UserType, MemberType, CustomType>
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.request.spaceId] = payload.response.data.map((user) => ({ userId: user.id }));

  return newState;
};

export const createMembersReducer = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType = {}>() => (
  state = createInitialState<CustomType>(),
  action: MembersActions<UserType, MemberType, CustomType, MetaType>| MembershipListenerActions<CustomType>
): MembersBySpaceIdState<CustomType> => {
  switch (action.type) {
    case MembersActionType.MEMBERS_RETRIEVED:
    case MembersActionType.MEMBERS_UPDATED:
    case MembersActionType.MEMBERS_ADDED:
    case MembersActionType.MEMBERS_REMOVED:
      return membersResult<UserType, MemberType, CustomType>(state, action.payload);
    case MembershipActionType.USER_ADDED_TO_SPACE_EVENT:
      return userAddedToSpace<CustomType>(state, action.payload);
    case MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT:
      return userRemovedFromSpace<CustomType>(state, action.payload);
    case MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT:
      return userMembersUpdatedOnSpace<CustomType>(state, action.payload);
    default:
      return state;
  }
};
