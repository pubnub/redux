import {
  AllChannelDataRetrievedAction,
  FetchAllChannelDataSuccess,
} from './ChannelDataActions';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

interface ChannelListState {
  channelIds: string[];
}

const createInitialState = (): ChannelListState => ({
  channelIds: [],
});

const allChannelDataRetrieved = <ChannelCustom extends ObjectsCustom>(
  state: ChannelListState,
  payload: FetchAllChannelDataSuccess<ChannelCustom>
) => {
  if (
    payload.request.page &&
    (payload.request.page.next || payload.request.page.prev)
  ) {
    // append and deduplicate
    return {
      channelIds: [
        ...state.channelIds,
        ...payload.response.data
          .map((channel) => channel.id)
          .filter((id) => state.channelIds.indexOf(id) === -1),
      ],
    };
  } else {
    // reset if pagination was not used
    return {
      channelIds: payload.response.data.map((channel) => channel.id),
    };
  }
};

export const createChannelsListReducer = <
  ChannelCustom extends ObjectsCustom = ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>() => (
  state: ChannelListState = createInitialState(),
  action: AllChannelDataRetrievedAction<ChannelCustom, Meta>
): ChannelListState => {
  switch (action.type) {
    case ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED:
      return allChannelDataRetrieved<ChannelCustom>(state, action.payload);
    default:
      return state;
  }
};
