import {
  MembershipEventMessage,
  FetchMembershipSuccess,
  MembershipSuccess,
  MembershipListenerActions,
  MembershipActions,
  Membership
} from './MembershipActions';
import { Space } from '../../features/space/SpaceActions';
import { MembershipActionType } from './MembershipActionType.enum';

export type MembershipByUserIdState<CustomType> = {
  byId: {
    [userId: string]: Membership<CustomType>[]
  },
};

const createInitialState = <CustomType>(): MembershipByUserIdState<CustomType> => ({
  byId: {},
});

const userAddedToSpace = <CustomType>(
  state: MembershipByUserIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>
) => {
  if (state.byId[payload.data.userId].filter((membership) => membership.spaceId === payload.data.spaceId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.userId] = [
      ...newState.byId[payload.data.userId],
      {
        spaceId: payload.data.spaceId,
        custom: payload.data.custom,
      }
    ];

    return newState;
  }

  return state;
};

const userRemovedFromSpace = <CustomType>(
  state: MembershipByUserIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>
) => {
  if (state.byId[payload.data.userId].filter((membership) => membership.spaceId === payload.data.spaceId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.userId] = newState.byId[payload.data.userId].filter(
      (membership) => membership.spaceId !== payload.data.spaceId
    );

    return newState;
  }

  return state;
};

const userMembershipUpdatedOnSpace = <CustomType>(
  state: MembershipByUserIdState<CustomType>,
  payload: MembershipEventMessage<CustomType>,
) => {
  console.log(payload)
  // TODO: need to update the custom object
  return state;
};


const membershipResult = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType>(
  state: MembershipByUserIdState<CustomType>,
  payload: FetchMembershipSuccess<SpaceType, CustomType> | MembershipSuccess<SpaceType, MembershipType, CustomType>
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.request.userId] = payload.response.data.map((space) => ({ spaceId: space.id }));

  return newState;
};

export const createMembershipReducer = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType = {}>() => (
  state = createInitialState<CustomType>(),
  action: MembershipActions<SpaceType, MembershipType, CustomType, MetaType>| MembershipListenerActions<CustomType>
): MembershipByUserIdState<CustomType> => {
  switch (action.type) {
    case MembershipActionType.MEMBERSHIP_RETRIEVED:
    case MembershipActionType.MEMBERSHIP_UPDATED:
    case MembershipActionType.SPACES_JOINED:
    case MembershipActionType.SPACES_LEFT:
      return membershipResult<SpaceType, MembershipType, CustomType>(state, action.payload);
    case MembershipActionType.USER_ADDED_TO_SPACE_EVENT:
      return userAddedToSpace<CustomType>(state, action.payload);
    case MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT:
      return userRemovedFromSpace<CustomType>(state, action.payload);
    case MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT:
      return userMembershipUpdatedOnSpace<CustomType>(state, action.payload);
    default:
      return state;
  }
};
