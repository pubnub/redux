import { AnyAction } from 'redux';
import {
  ChannelDataActions,
  ChannelDataListenerActions,
  SetChannelDataSuccess,
  RemoveChannelSuccess,
  FetchAllChannelDataSuccess,
  FetchChannelDataSuccess,
  Channel,
  SetChannelDataEventMessage,
  RemoveChannelDataEventMessage,
} from './ChannelDataActions';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import {
  MembershipActions,
  FetchMembershipsSuccess,
  MembershipsRetrievedAction,
} from '../membership/MembershipActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
import { AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom, GetChannelCustom } from 'foundations/ObjectsCustom';

export type ChannelsByIdState<ChannelType extends Channel> = {
  byId: {
    [channelId: string]: ChannelType;
  };
};

const createInitialState = () => ({
  byId: {},
});

const channelDataSet = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: SetChannelDataSuccess<GetChannelCustom<ChannelType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  // partial update
  newState.byId[payload.response.data.id] = {
    ...state.byId[payload.response.data.id],
    ...payload.response.data,
  };

  return newState;
};

const channelDataRemoved = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: RemoveChannelSuccess
) => {
  const newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.request.channel];

  return newState;
};

const allChannelDataRetrieved = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: FetchAllChannelDataSuccess<GetChannelCustom<ChannelType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  payload.response.data.forEach((item) => {
    newState.byId[item.id] = (item as unknown) as ChannelType;
  });

  return newState;
};

const channelDataRetrieved = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: FetchChannelDataSuccess<GetChannelCustom<ChannelType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.response.data.id] = (payload.response
    .data as unknown) as ChannelType;

  return newState;
};

const channelDataSetEventReceived = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: SetChannelDataEventMessage<GetChannelCustom<ChannelType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  // partial update
  newState.byId[payload.data.id] = {
    ...state.byId[payload.data.id],
    ...payload.data,
  };

  return newState;
};

const channelDataRemovedEventReceived = <ChannelType extends Channel>(
  state: ChannelsByIdState<ChannelType>,
  payload: RemoveChannelDataEventMessage
) => {
  const newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.data.id];

  return newState;
};

const membershipRetrieved = <
  MembershipCustom extends ObjectsCustom,
  ChannelType extends Channel
>(
  state: ChannelsByIdState<ChannelType>,
  payload: FetchMembershipsSuccess<
    MembershipCustom,
    GetChannelCustom<ChannelType>
  >
) => {
  let newState = state;

  if (payload.response.data.length > 0) {
    newState = {
      byId: {
        ...state.byId,
      },
    };

    for (let i = 0; i < payload.response.data.length; i++) {
      const currentMembership = payload.response.data[i];

      // important: consumers *must* include ChannelFields for the state to be updated
      if (currentMembership.channel && 'eTag' in currentMembership.channel) {
        newState.byId[
          currentMembership.channel.id
        ] = (currentMembership.channel as unknown) as ChannelType;
      }
    }
  }

  return newState;
};

type ChannelDataReducerActions<
  ChannelCustom extends ObjectsCustom,
  MembershipCustom extends ObjectsCustom
> =
  | ChannelDataActions<ChannelCustom, AnyMeta>
  | ChannelDataListenerActions<ChannelCustom>
  | MembershipsRetrievedAction<ChannelCustom, MembershipCustom, AnyMeta>
  | MembershipActions<ChannelCustom, MembershipCustom, AnyMeta>;

export type ChannelDataReducer<
  ChannelType extends Channel,
  ChannelAction extends AnyAction
> = (
  state: ChannelsByIdState<ChannelType> | undefined,
  action: ChannelAction
) => ChannelsByIdState<ChannelType>;

export const createChannelDataReducer = <
  ChannelType extends Channel = Channel,
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  ChannelAction extends AnyAction = ChannelDataReducerActions<
    GetChannelCustom<ChannelType>,
    MembershipCustom
  >
>(): ChannelDataReducer<ChannelType, ChannelAction> => (
  state: ChannelsByIdState<ChannelType> = createInitialState(),
  action: ChannelAction
): ChannelsByIdState<ChannelType> => {
  switch (action.type) {
    case ChannelDataActionType.CHANNEL_DATA_SET:
      return channelDataSet<ChannelType>(state, action.payload);
    case ChannelDataActionType.CHANNEL_DATA_REMOVED:
      return channelDataRemoved<ChannelType>(state, action.payload);
    case ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED:
      return allChannelDataRetrieved<ChannelType>(state, action.payload);
    case ChannelDataActionType.CHANNEL_DATA_RETRIEVED:
      return channelDataRetrieved<ChannelType>(state, action.payload);
    case ChannelDataActionType.CHANNEL_DATA_SET_EVENT:
      return channelDataSetEventReceived<ChannelType>(state, action.payload);
    case ChannelDataActionType.CHANNEL_DATA_REMOVED_EVENT:
      return channelDataRemovedEventReceived<ChannelType>(
        state,
        action.payload
      );
    case MembershipActionType.MEMBERSHIPS_RETRIEVED:
      return membershipRetrieved<MembershipCustom, ChannelType>(
        state,
        action.payload
      );
    default:
      return state;
  }
};
