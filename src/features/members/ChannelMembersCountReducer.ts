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

interface MembershipChangesState {
  [channelId: string]: {
    [uuid: string]: boolean;
  };
}

export interface MembersCountByChannelIdState {
  byId: {
    [channelId: string]: number;
  };
  // neccessary to dedupe objects events from multiple channels
  removed: MembershipChangesState;
  added: MembershipChangesState;
}

const createInitialState = () => ({
  byId: {},
  removed: {},
  added: {},
});

const channelMembershipRemoveEventRecieved = (
  state: MembersCountByChannelIdState,
  payload: RemoveMembershipEventMessage
) => {
  const channel = payload.data.channel.id;
  const uuid = payload.data.uuid.id;

  const hasCounter = Object.prototype.hasOwnProperty.call(state.byId, channel);

  if (hasCounter) {
    const wasRemoved =
      Object.prototype.hasOwnProperty.call(state.removed[channel], uuid) &&
      state.removed[channel][uuid] === true;

    if (!wasRemoved) {
      const exclude = { ...state.added[channel] };
      delete exclude[uuid];
      return {
        byId: {
          ...state.byId,
          // decrement count
          [channel]: state.byId[channel] - 1,
        },
        added: {
          ...state.added,
          [channel]: exclude,
        },
        removed: {
          ...state.removed,
          [channel]: {
            ...state.removed[channel],
            // mark as removed
            [uuid]: true,
          },
        },
      };
    } else {
      // duplicate event
      return state;
    }
  } else {
    // no initial value for the total count
    return state;
  }
};

const channelMembershipSetEventRecieved = (
  state: MembersCountByChannelIdState,
  payload: SetMembershipEventMessage<{}>
) => {
  const channel = payload.data.channel.id;
  const uuid = payload.data.uuid.id;

  const hasCounter = Object.prototype.hasOwnProperty.call(state.byId, channel);

  if (hasCounter) {
    const wasAdded =
      Object.prototype.hasOwnProperty.call(state.added[channel], uuid) &&
      state.added[channel][uuid] === true;

    if (!wasAdded) {
      const exclude = { ...state.removed[channel] };
      delete exclude[uuid];
      return {
        byId: {
          ...state.byId,
          // increment count
          [channel]: state.byId[channel] + 1,
        },
        removed: {
          ...state.removed,
          [channel]: exclude,
        },
        added: {
          ...state.added,
          [channel]: {
            ...state.added[channel],
            // mark as added
            [uuid]: true,
          },
        },
      };
    } else {
      // duplicate event
      return state;
    }
  } else {
    // no initial value for the total count
    return state;
  }
};

const channelMembersResult = (
  state: MembersCountByChannelIdState,
  payload: FetchChannelMembersSuccess<{}, {}> | SetChannelMembersSuccess<{}, {}>
) => {
  if (payload.response.totalCount) {
    const channel = payload.request.channel;

    return {
      byId: {
        ...state.byId,
        // set count
        [channel]: payload.response.totalCount,
      },
      removed: {
        ...state.removed,
        [channel]: {},
      },
      added: {
        ...state.added,
        [channel]: {},
      },
    };
  } else {
    return state;
  }
};

type ChannelMembersCountReducerActions =
  | ChannelMembersActions<{}, {}, AnyMeta>
  | MembershipListenerActions<{}>;

export type ChannelMembersCountReducer<MembersAction extends AnyAction> = (
  state: MembersCountByChannelIdState | undefined,
  action: MembersAction
) => MembersCountByChannelIdState;

export const createChannelMembersCountReducer = <
  MembersAction extends AnyAction = ChannelMembersCountReducerActions
>(): ChannelMembersCountReducer<MembersAction> => (
  state = createInitialState(),
  action: MembersAction
): MembersCountByChannelIdState => {
  switch (action.type) {
    case ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED:
    case ChannelMembersActionType.CHANNEL_MEMBERS_SET:
    case ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED:
      return channelMembersResult(state, action.payload);
    case MembershipActionType.MEMBERSHIP_SET_EVENT:
      return channelMembershipSetEventRecieved(state, action.payload);
    case MembershipActionType.MEMBERSHIP_REMOVED_EVENT:
      return channelMembershipRemoveEventRecieved(state, action.payload);
    default:
      return state;
  }
};
