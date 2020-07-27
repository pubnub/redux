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
  payload: FetchAllChannelDataSuccess<ChannelCustom>
) => ({ channelIds: payload.response.data.map((channel) => channel.id) });

export const createChannelsListReducer = <
  ChannelCustom extends ObjectsCustom = ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>() => (
  state: ChannelListState = createInitialState(),
  action: AllChannelDataRetrievedAction<ChannelCustom, Meta>
): ChannelListState => {
  switch (action.type) {
    case ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED:
      return allChannelDataRetrieved<ChannelCustom>(action.payload);
    default:
      return state;
  }
};
