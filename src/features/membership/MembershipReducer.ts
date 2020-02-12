import { AnyAction } from 'redux';
import {
  MembershipEventMessage,
  FetchMembershipSuccess,
  MembershipSuccess,
  MembershipListenerActions,
  MembershipActions,
  Membership,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { AnyMeta } from '../../foundations/ActionMeta';
import { User } from '../user/UserActions';

// tag::RDX-type-memberships-byuserid[]
export type MembershipByUserIdState<
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
> = {
  byId: {
    [userId: string]: ReceivedMembership[];
  };
};
// end::RDX-type-memberships-byuserid[]

const createInitialState = () => ({
  byId: {},
});

const userAddedToSpace = <
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
>(
  state: MembershipByUserIdState<ReceivedMembership>,
  payload: MembershipEventMessage<ReceivedMembership>
) => {
  if (
    state.byId[payload.data.userId] &&
    state.byId[payload.data.userId].filter(
      (membership) => membership.id === payload.data.spaceId
    ).length === 0
  ) {
    let newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.userId] = [
      ...newState.byId[payload.data.userId],
      ({
        id: payload.data.spaceId,
        custom: payload.data.custom,
      } as unknown) as ReceivedMembership, // TODO: find out a better pattern here
    ];

    return newState;
  }

  return state;
};

const userRemovedFromSpace = <
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
>(
  state: MembershipByUserIdState<ReceivedMembership>,
  payload: MembershipEventMessage<ReceivedMembership>
) => {
  if (
    state.byId[payload.data.userId] &&
    state.byId[payload.data.userId].filter(
      (membership) => membership.id === payload.data.spaceId
    ).length > 0
  ) {
    let newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.userId] = newState.byId[
      payload.data.userId
    ].filter((membership) => membership.id !== payload.data.spaceId);

    return newState;
  }

  return state;
};

const userMembershipUpdatedOnSpace = <
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
>(
  state: MembershipByUserIdState<ReceivedMembership>,
  payload: MembershipEventMessage<ReceivedMembership>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  let clonedUser = [...newState.byId[payload.data.userId]];

  if (clonedUser !== undefined) {
    clonedUser = clonedUser.map((space) => {
      if (space.id === payload.data.spaceId) {
        return {
          ...space,
          custom: payload.data.custom,
        };
      } else {
        return space;
      }
    });
  }

  newState.byId[payload.data.userId] = clonedUser;

  return newState;
};

const membershipResult = <
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
>(
  state: MembershipByUserIdState<ReceivedMembership>,
  payload:
    | FetchMembershipSuccess<ReceivedMembership>
    | MembershipSuccess<ReceivedMembership>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.request.userId] = payload.response.data;

  return newState;
};

type MembershipReducerActions<
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
> =
  | MembershipActions<ReceivedMembership, AnyMeta>
  | MembershipListenerActions<ReceivedMembership>;

// tag::RDX-type-membership[]
export type MembershipReducer<
  StoredMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>,
  MembershipAction extends AnyAction
> = (
  state: MembershipByUserIdState<StoredMembership> | undefined,
  action: MembershipAction
) => MembershipByUserIdState<StoredMembership>;
// end::RDX-type-membership[]

// tag::RDX-method-reducer-membership[]
export const createMembershipReducer = <
  StoredMembership extends Membership<
    ObjectsCustom,
    User<ObjectsCustom>
  > = Membership,
  MembershipAction extends AnyAction = MembershipReducerActions<
    StoredMembership
  >
>(): MembershipReducer<StoredMembership, MembershipAction> => (
  state = createInitialState(),
  action: MembershipAction
): MembershipByUserIdState<StoredMembership> => {
  switch (action.type) {
    case MembershipActionType.MEMBERSHIP_RETRIEVED:
    case MembershipActionType.MEMBERSHIP_UPDATED:
    case MembershipActionType.SPACES_JOINED:
    case MembershipActionType.SPACES_LEFT:
      return membershipResult<StoredMembership>(state, action.payload);
    case MembershipActionType.USER_ADDED_TO_SPACE_EVENT:
      return userAddedToSpace<StoredMembership>(state, action.payload);
    case MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT:
      return userRemovedFromSpace<StoredMembership>(state, action.payload);
    case MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT:
      return userMembershipUpdatedOnSpace<StoredMembership>(
        state,
        action.payload
      );
    default:
      return state;
  }
};
// end::RDX-method-reducer-membership[]
