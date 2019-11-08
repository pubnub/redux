import {
  MembersActions,
  Members,
  FetchMembersSuccess,
  MembersSuccess,
  AnyMembers,
} from './MembersActions';
import { MembersActionType } from './MembersActionType.enum';
import { MembershipListenerActions, MembershipEventMessage, AnyMembership } from '../../features/membership/MembershipActions';
import { MembershipActionType } from '../../features/membership/MembershipActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { Space } from '../space/SpaceActions';
import { AnyMeta } from '../../foundations/ActionMeta';
import { AnyAction } from 'redux';

export type MembersBySpaceIdState<ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>> = {
  byId: {
    [spaceId: string]: ReceivedMembers[]
  },
};

const createInitialState = () => ({
  byId: {},
});

const userAddedToSpace = <ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<AnyMembership>
) => {
  if (state.byId[payload.data.spaceId].filter((membership) => membership.id === payload.data.userId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.spaceId] = [
      ...newState.byId[payload.data.spaceId],
      {
        id: payload.data.userId,
        custom: payload.data.custom,
      } as unknown as ReceivedMembers  // TODO: find out a better pattern here
    ];

    return newState;
  }

  return state;
};

const userRemovedFromSpace = <ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<AnyMembership>
) => {
  if (state.byId[payload.data.spaceId].filter((membership) => membership.id === payload.data.userId).length === 0) {
    let newState = {
      byId: { ...state.byId },
    };
    
    newState.byId[payload.data.userId] = newState.byId[payload.data.spaceId].filter(
      (membership) => membership.id !== payload.data.userId
    );

    return newState;
  }

  return state;
};

const userMembershipUpdatedOnSpace = <ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<AnyMembership>,
) => {
  console.log(payload)
  // TODO: need to update the custom object
  return state;
};

const membersResult = <ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: FetchMembersSuccess<ReceivedMembers> | MembersSuccess<ReceivedMembers>
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.request.spaceId] = payload.response.data;

  return newState;
};

type MembersReducerActions<ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>> =
| MembersActions<ReceivedMembers, AnyMeta>
| MembershipListenerActions<AnyMembership>;

export type MembersReducer<StoredMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>, MembersAction extends AnyAction> = 
  (state: MembersBySpaceIdState<StoredMembers>, action: MembersAction)
   => MembersBySpaceIdState<StoredMembers>;

export const createMembersReducer = <
  StoredMembers extends Members<ObjectsCustom, Space<ObjectsCustom>> = AnyMembers,
  MembersAction extends AnyAction = MembersReducerActions<StoredMembers>,
>(): MembersReducer<StoredMembers, MembersAction> => (
  state = createInitialState(),
  action: MembersAction
) => {
  switch (action.type) {
    case MembersActionType.MEMBERS_RETRIEVED:
    case MembersActionType.MEMBERS_UPDATED:
    case MembersActionType.MEMBERS_ADDED:
    case MembersActionType.MEMBERS_REMOVED:
      return membersResult<StoredMembers>(state, action.payload);
    case MembershipActionType.USER_ADDED_TO_SPACE_EVENT:
      return userAddedToSpace<StoredMembers>(state, action.payload);
    case MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT:
      return userRemovedFromSpace<StoredMembers>(state, action.payload);
    case MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT:
      return userMembershipUpdatedOnSpace<StoredMembers>(state, action.payload);
    default:
      return state;
  }
};
