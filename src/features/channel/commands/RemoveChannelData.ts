import { Dispatch } from 'redux';
import {
  ChannelDataRemovedAction,
  RemovingChannelDataAction,
  ErrorRemovingChannelDataAction,
  RemoveChannelRequest,
  RemoveChannelError,
  RemoveChannelSuccess,
} from '../ChannelDataActions';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';

export const removingChannelData = <Meta extends ActionMeta>(
  payload: RemoveChannelRequest,
  meta?: Meta
): RemovingChannelDataAction<Meta> => ({
  type: ChannelDataActionType.REMOVING_CHANNEL_DATA,
  payload,
  meta,
});

export const channelDataRemoved = <Meta extends ActionMeta>(
  payload: RemoveChannelSuccess,
  meta?: Meta
): ChannelDataRemovedAction<Meta> => ({
  type: ChannelDataActionType.CHANNEL_DATA_REMOVED,
  payload,
  meta,
});

export const errorRemovingChannelData = <Meta extends ActionMeta>(
  payload: RemoveChannelError,
  meta?: Meta
): ErrorRemovingChannelDataAction<Meta> => ({
  type: ChannelDataActionType.ERROR_REMOVING_CHANNEL_DATA,
  payload,
  meta,
  error: true,
});

export const removeChannelData = <Meta extends ActionMeta = AnyMeta>(
  request: RemoveChannelRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(removingChannelData<Meta>(request, meta));

      pubnub.api.objects.removeChannelMetadata(
        { channel: request.channel },
        (status) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorRemovingChannelData<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              status,
            };

            dispatch(channelDataRemoved<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ChannelDataActionType.REMOVE_CHANNEL_DATA_COMMAND;

  return thunkFunction;
};
