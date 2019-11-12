import { AnyAction } from 'redux';
import {
  MembershipEventMessage,
  FetchMembershipSuccess,
  MembershipSuccess,
  MembershipListenerActions,
  MembershipActions,
  Membership,
  AnyMembership,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { AnyMeta } from '../../foundations/ActionMeta';
import { User } from '../user/UserActions';

export type MembershipByUserIdState<
  ReceivedMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>
> = {
  byId: {
    [userId: string]: ReceivedMembership[];
  };
};

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
    state.byId[payload.data.userId].filter(
      (membership) => membership.id === payload.data.spaceId
    ).length === 0
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
  console.log(payload);
  // TODO: need to update the custom object
  return state;
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

export type MembershipReducer<
  StoredMembership extends Membership<ObjectsCustom, User<ObjectsCustom>>,
  MembershipAction extends AnyAction
> = (
  state: MembershipByUserIdState<StoredMembership> | undefined,
  action: MembershipAction
) => MembershipByUserIdState<StoredMembership>;

export const createMembershipReducer = <
  StoredMembership extends Membership<
    ObjectsCustom,
    User<ObjectsCustom>
  > = AnyMembership,
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
