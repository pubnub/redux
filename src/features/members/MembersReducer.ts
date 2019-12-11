import { AnyAction } from 'redux';
import {
  MembersActions,
  Members,
  FetchMembersSuccess,
  MembersSuccess,
} from './MembersActions';
import { MembersActionType } from './MembersActionType.enum';
import {
  MembershipListenerActions,
  MembershipEventMessage,
  Membership,
} from '../../features/membership/MembershipActions';
import { MembershipActionType } from '../../features/membership/MembershipActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { Space } from '../space/SpaceActions';
import { AnyMeta } from '../../foundations/ActionMeta';

// tag::RDX-type-members-byspaceid[]
export type MembersBySpaceIdState<
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
> = {
  byId: {
    [spaceId: string]: ReceivedMembers[];
  };
};
// end::RDX-type-members-byspaceid[]

const createInitialState = () => ({
  byId: {},
});

const userAddedToSpace = <
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<Membership>
) => {
  if (
    state.byId[payload.data.spaceId].filter(
      (membership) => membership.id === payload.data.userId
    ).length === 0
  ) {
    let newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.spaceId] = [
      ...newState.byId[payload.data.spaceId],
      ({
        id: payload.data.userId,
        custom: payload.data.custom,
      } as unknown) as ReceivedMembers, // TODO: find out a better pattern here
    ];

    return newState;
  }

  return state;
};

const userRemovedFromSpace = <
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<Membership>
) => {
  if (
    state.byId[payload.data.spaceId].filter(
      (membership) => membership.id === payload.data.userId
    ).length > 0
  ) {
    let newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.spaceId] = newState.byId[
      payload.data.spaceId
    ].filter((membership) => membership.id !== payload.data.userId);

    return newState;
  }

  return state;
};

const userMembershipUpdatedOnSpace = <
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload: MembershipEventMessage<Membership>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  let clonedSpace = [...newState.byId[payload.data.spaceId]];

  if (clonedSpace !== undefined) {
    clonedSpace = clonedSpace.map((user) => {
      if (user.id === payload.data.userId) {
        return {
          ...user,
          custom: payload.data.custom,
        };
      } else {
        return user;
      }
    });
  }

  newState.byId[payload.data.spaceId] = clonedSpace;

  return newState;
};

const membersResult = <
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
>(
  state: MembersBySpaceIdState<ReceivedMembers>,
  payload:
    | FetchMembersSuccess<ReceivedMembers>
    | MembersSuccess<ReceivedMembers>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.request.spaceId] = payload.response.data;

  return newState;
};

type MembersReducerActions<
  ReceivedMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>
> =
  | MembersActions<ReceivedMembers, AnyMeta>
  | MembershipListenerActions<Membership>;

// tag::RDX-type-member[]
export type MembersReducer<
  StoredMembers extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  MembersAction extends AnyAction
> = (
  state: MembersBySpaceIdState<StoredMembers> | undefined,
  action: MembersAction
) => MembersBySpaceIdState<StoredMembers>;
// end::RDX-type-member[]

// tag::RDX-method-reducer-member[]
export const createMembersReducer = <
  StoredMembers extends Members<ObjectsCustom, Space<ObjectsCustom>> = Members,
  MembersAction extends AnyAction = MembersReducerActions<StoredMembers>
>(): MembersReducer<StoredMembers, MembersAction> => (
  state = createInitialState(),
  action: MembersAction
): MembersBySpaceIdState<StoredMembers> => {
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
// end::RDX-method-reducer-member[]
