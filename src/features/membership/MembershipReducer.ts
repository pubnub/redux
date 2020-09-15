import { AnyAction } from 'redux';
import {
  FetchMembershipsSuccess,
  SetMembershipsSuccess,
  MembershipListenerActions,
  MembershipActions,
  MembershipEventMessage,
  SetMembershipEventMessage,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';
import { AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type MembershipByUuidState<MembershipCustom extends ObjectsCustom> = {
  byId: {
    [uuid: string]: {
      id: string;
      custom: MembershipCustom | null;
    }[];
  };
};

const createInitialState = () => ({
  byId: {},
});

const uuidRemovedFromChannel = <MembershipCustom extends ObjectsCustom>(
  state: MembershipByUuidState<MembershipCustom>,
  payload: MembershipEventMessage<MembershipCustom>
) => {
  if (
    state.byId[payload.data.uuid.id] &&
    state.byId[payload.data.uuid.id].filter(
      (membership) => membership.id === payload.data.channel.id
    ).length > 0
  ) {
    const newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.uuid.id] = newState.byId[
      payload.data.uuid.id
    ].filter((membership) => membership.id !== payload.data.channel.id);

    return newState;
  }

  return state;
};

const uuidMembershipUpdatedOnChannel = <MembershipCustom extends ObjectsCustom>(
  state: MembershipByUuidState<MembershipCustom>,
  payload: SetMembershipEventMessage<MembershipCustom>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  let clonedUUID = [...(newState.byId[payload.data.uuid.id] || [])];

  let exists = false;
  clonedUUID = clonedUUID.map((channel) => {
    if (channel.id === payload.data.channel.id) {
      exists = true;
      return {
        ...channel,
        custom: payload.data.custom,
      };
    } else {
      return channel;
    }
  });
  if (!exists) {
    clonedUUID.push({
      id: payload.data.channel.id,
      custom: payload.data.custom,
    });
  }

  newState.byId[payload.data.uuid.id] = clonedUUID;

  return newState;
};

const membershipResult = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom
>(
  state: MembershipByUuidState<MembershipCustom>,
  payload:
    | FetchMembershipsSuccess<MembershipCustom, ChannelCustom>
    | SetMembershipsSuccess<MembershipCustom, ChannelCustom>
) => {
  const newState = {
    byId: { ...state.byId },
  };
  const uuid = payload.request.uuid;
  const memberships = payload.response.data.map((complete) => ({
    id: complete.channel.id,
    custom: complete.custom || null,
  }));

  if (
    payload.request.page &&
    (payload.request.page.next || payload.request.page.prev)
  ) {
    // append and deduplicate
    const previous = newState.byId[uuid] || [];
    const ids = previous.map((m) => m.id);
    newState.byId[uuid] = [
      ...previous,
      ...memberships.filter(({ id }) => ids.indexOf(id) === -1),
    ];
  } else {
    // reset if pagination was not used
    newState.byId[uuid] = memberships;
  }

  return newState;
};

type MembershipReducerActions<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom
> =
  | MembershipActions<MembershipCustom, ChannelCustom, AnyMeta>
  | MembershipListenerActions<MembershipCustom>;

export type MembershipReducer<
  MembershipCustom extends ObjectsCustom,
  MembershipAction extends AnyAction
> = (
  state: MembershipByUuidState<MembershipCustom> | undefined,
  action: MembershipAction
) => MembershipByUuidState<MembershipCustom>;

export const createMembershipReducer = <
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  ChannelCustom extends ObjectsCustom = ObjectsCustom,
  MembershipAction extends AnyAction = MembershipReducerActions<
    MembershipCustom,
    ChannelCustom
  >
>(): MembershipReducer<MembershipCustom, MembershipAction> => (
  state = createInitialState(),
  action: MembershipAction
): MembershipByUuidState<MembershipCustom> => {
  switch (action.type) {
    case MembershipActionType.MEMBERSHIPS_RETRIEVED:
    case MembershipActionType.MEMBERSHIPS_SET:
    case MembershipActionType.MEMBERSHIPS_REMOVED:
      return membershipResult<MembershipCustom, ChannelCustom>(
        state,
        action.payload
      );
    case MembershipActionType.MEMBERSHIP_SET_EVENT:
      return uuidMembershipUpdatedOnChannel<MembershipCustom>(
        state,
        action.payload
      );
    case MembershipActionType.MEMBERSHIP_REMOVED_EVENT:
      return uuidRemovedFromChannel<MembershipCustom>(state, action.payload);
    default:
      return state;
  }
};
