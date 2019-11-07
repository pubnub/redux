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
import { ObjectsCustom } from 'foundations/ObjectsCustom';

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


const membershipResult = <ReceivedSpace extends Space<CustomSpaceFields>, MembershipType extends Membership<CustomMembershipFields>, CustomMembershipFields extends ObjectsCustom, CustomSpaceFields extends ObjectsCustom>(
  state: MembershipByUserIdState<CustomMembershipFields>,
  payload: FetchMembershipSuccess<ReceivedSpace, CustomMembershipFields, CustomSpaceFields> | MembershipSuccess<ReceivedSpace, MembershipType, CustomMembershipFields, CustomSpaceFields>
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.request.userId] = payload.response.data.map((space) => ({ spaceId: space.id }));

  return newState;
};

export const createMembershipReducer = <ReceivedSpace extends Space<CustomSpaceFields>, MembershipType extends Membership<CustomMembershipFields>, CustomMembershipFields extends ObjectsCustom, CustomSpaceFields extends ObjectsCustom, Meta = {}>() => (
  state = createInitialState<CustomMembershipFields>(),
  action: MembershipActions<ReceivedSpace, MembershipType, CustomMembershipFields, CustomSpaceFields, Meta>| MembershipListenerActions<CustomMembershipFields>
): MembershipByUserIdState<CustomMembershipFields> => {
  switch (action.type) {
    case MembershipActionType.MEMBERSHIP_RETRIEVED:
    case MembershipActionType.MEMBERSHIP_UPDATED:
    case MembershipActionType.SPACES_JOINED:
    case MembershipActionType.SPACES_LEFT:
      return membershipResult<ReceivedSpace, MembershipType, CustomMembershipFields, CustomSpaceFields>(state, action.payload);
    case MembershipActionType.USER_ADDED_TO_SPACE_EVENT:
      return userAddedToSpace<CustomMembershipFields>(state, action.payload);
    case MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT:
      return userRemovedFromSpace<CustomMembershipFields>(state, action.payload);
    case MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT:
      return userMembershipUpdatedOnSpace<CustomMembershipFields>(state, action.payload);
    default:
      return state;
  }
};
