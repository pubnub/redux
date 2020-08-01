import { Dispatch } from 'redux';
import {
  SettingChannelDataAction,
  ChannelDataSetAction,
  ErrorSettingChannelDataAction,
  SetChannelDataError,
  SetChannelDataSuccess,
  SetChannelDataRequest,
} from '../ChannelDataActions';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const settingChannelData = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelDataRequest<ChannelCustom>,
  meta?: Meta
): SettingChannelDataAction<ChannelCustom, Meta> => ({
  type: ChannelDataActionType.SETTING_CHANNEL_DATA,
  payload,
  meta,
});

export const channelDataSet = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelDataSuccess<ChannelCustom>,
  meta?: Meta
): ChannelDataSetAction<ChannelCustom, Meta> => ({
  type: ChannelDataActionType.CHANNEL_DATA_SET,
  payload,
  meta,
});

export const errorSettingChannelData = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelDataError<ChannelCustom>,
  meta?: Meta
): ErrorSettingChannelDataAction<ChannelCustom, Meta> => ({
  type: ChannelDataActionType.ERROR_SETTING_CHANNEL_DATA,
  payload,
  meta,
  error: true,
});

export const setChannelData = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: SetChannelDataRequest<ChannelCustom>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<ChannelDataSetAction<ChannelCustom, Meta>>(
      (resolve, reject) => {
        dispatch(settingChannelData<ChannelCustom, Meta>(request, meta));

        pubnub.api.objects.setChannelMetadata<ChannelCustom>(
          {
            ...request,
          },
          (status, response) => {
            if (status.error) {
              const payload = {
                request,
                status,
              };

              dispatch(
                errorSettingChannelData<ChannelCustom, Meta>(payload, meta)
              );
              reject(payload);
            } else {
              const payload = {
                request,
                response,
                status,
              };

              const action = channelDataSet<ChannelCustom, Meta>(payload, meta);

              dispatch(action);
              resolve(action);
            }
          }
        );
      }
    );

  thunkFunction.type = ChannelDataActionType.SET_CHANNEL_DATA_COMMAND;

  return thunkFunction;
};
