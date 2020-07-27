import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import {
  ChannelDataSetEventAction,
  ChannelDataRemovedEventAction,
  ChannelDataListenerActions,
  ChannelDataEventMessage,
  Channel,
} from './ChannelDataActions';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import { ObjectsCustom, GetChannelCustom } from 'foundations/ObjectsCustom';

export const channelDataSet = <ChannelCustom extends ObjectsCustom>(
  payload: ChannelDataEventMessage<ChannelCustom>
): ChannelDataSetEventAction<ChannelCustom> => ({
  type: ChannelDataActionType.CHANNEL_DATA_SET_EVENT,
  payload,
});

export const channelDataRemoved = <ChannelCustom extends ObjectsCustom>(
  payload: ChannelDataEventMessage<ChannelCustom>
): ChannelDataRemovedEventAction<ChannelCustom> => ({
  type: ChannelDataActionType.CHANNEL_DATA_REMOVED_EVENT,
  payload,
});

export const createChannelDataListener = <ChannelType extends Channel>(
  dispatch: Dispatch<ChannelDataListenerActions<GetChannelCustom<ChannelType>>>
) => ({
  objects: (
    payload: Pubnub.ObjectsEvent<
      ObjectsCustom,
      GetChannelCustom<ChannelType>,
      ObjectsCustom
    >
  ) => {
    if (payload.message.type !== 'channel') {
      return;
    }
    switch (payload.message.event) {
      case 'set':
        dispatch(
          channelDataSet<GetChannelCustom<ChannelType>>(payload.message)
        );
        break;
      case 'delete':
        dispatch(
          channelDataRemoved<GetChannelCustom<ChannelType>>(payload.message)
        );
        break;
      default:
        break;
    }
  },
});
