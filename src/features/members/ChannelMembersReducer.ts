import { AnyAction } from 'redux';
import {
  ChannelMembersActions,
  FetchChannelMembersSuccess,
  SetChannelMembersSuccess,
} from './ChannelMembersActions';
import { ChannelMembersActionType } from './ChannelMembersActionType.enum';
import {
  MembershipListenerActions,
  SetMembershipEventMessage,
  RemoveMembershipEventMessage,
} from 'features/membership/MembershipActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
import { AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type MembersByChannelIdState<MembershipCustom extends ObjectsCustom> = {
  byId: {
    [channelId: string]: { id: string; custom: MembershipCustom | null }[];
  };
};

const createInitialState = () => ({
  byId: {},
});

const channelMembershipRemoveEventRecieved = <
  MembershipCustom extends ObjectsCustom
>(
  state: MembersByChannelIdState<MembershipCustom>,
  payload: RemoveMembershipEventMessage
) => {
  if (
    state.byId[payload.data.channel.id] &&
    state.byId[payload.data.channel.id].filter(
      (membership) => membership.id === payload.data.uuid.id
    ).length > 0
  ) {
    const newState = {
      byId: { ...state.byId },
    };

    newState.byId[payload.data.channel.id] = newState.byId[
      payload.data.channel.id
    ].filter((membership) => membership.id !== payload.data.uuid.id);

    return newState;
  }

  return state;
};

const channelMembershipSetEventRecieved = <
  MembershipCustom extends ObjectsCustom
>(
  state: MembersByChannelIdState<MembershipCustom>,
  payload: SetMembershipEventMessage<MembershipCustom>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  let clonedChannel = [...(newState.byId[payload.data.channel.id] || [])];

  let exists = false;
  clonedChannel = clonedChannel.map((uuid) => {
    if (uuid.id === payload.data.uuid.id) {
      exists = true;
      return {
        id: uuid.id,
        custom: payload.data.custom,
      };
    } else {
      return uuid;
    }
  });
  if (!exists) {
    clonedChannel.push({
      id: payload.data.uuid.id,
      custom: payload.data.custom,
    });
  }

  newState.byId[payload.data.channel.id] = clonedChannel;

  return newState;
};

const channelMembersResult = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom
>(
  state: MembersByChannelIdState<MembershipCustom>,
  payload:
    | FetchChannelMembersSuccess<MembershipCustom, UserCustom>
    | SetChannelMembersSuccess<MembershipCustom, UserCustom>
) => {
  const newState = {
    byId: { ...state.byId },
  };
  const channel = payload.request.channel;
  const members = payload.response.data.map((complete) => ({
    id: complete.uuid.id,
    custom: complete.custom || null,
  }));

  if (
    payload.request.page &&
    (payload.request.page.next || payload.request.page.prev)
  ) {
    // append and deduplicate
    const previous = newState.byId[channel] || [];
    const ids = previous.map((m) => m.id);
    newState.byId[channel] = [
      ...previous,
      ...members.filter(({ id }) => ids.indexOf(id) === -1),
    ];
  } else {
    // reset if pagination was not used
    newState.byId[channel] = members;
  }

  return newState;
};

type ChannelMembersReducerActions<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom
> =
  | ChannelMembersActions<MembershipCustom, UserCustom, AnyMeta>
  | MembershipListenerActions<MembershipCustom>;

export type ChannelMembersReducer<
  MembershipCustom extends ObjectsCustom,
  MembersAction extends AnyAction
> = (
  state: MembersByChannelIdState<MembershipCustom> | undefined,
  action: MembersAction
) => MembersByChannelIdState<MembershipCustom>;

export const createChannelMembersReducer = <
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  UserCustom extends ObjectsCustom = ObjectsCustom,
  MembersAction extends AnyAction = ChannelMembersReducerActions<
    MembershipCustom,
    UserCustom
  >
>(): ChannelMembersReducer<MembershipCustom, MembersAction> => (
  state = createInitialState(),
  action: MembersAction
): MembersByChannelIdState<MembershipCustom> => {
  switch (action.type) {
    case ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED:
    case ChannelMembersActionType.CHANNEL_MEMBERS_SET:
    case ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED:
      return channelMembersResult<MembershipCustom, UserCustom>(
        state,
        action.payload
      );
    case MembershipActionType.MEMBERSHIP_SET_EVENT:
      return channelMembershipSetEventRecieved<MembershipCustom>(
        state,
        action.payload
      );
    case MembershipActionType.MEMBERSHIP_REMOVED_EVENT:
      return channelMembershipRemoveEventRecieved<MembershipCustom>(
        state,
        action.payload
      );
    default:
      return state;
  }
};
