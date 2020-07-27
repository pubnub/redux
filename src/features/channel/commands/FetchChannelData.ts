import { Dispatch } from 'redux';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import {
  ErrorFetchingChannelDataAction,
  ChannelDataRetrievedAction,
  FetchingChannelDataAction,
  FetchChannelDataError,
  FetchChannelDataSuccess,
  FetchChannelDataRequest,
} from '../ChannelDataActions';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingChannelData = <Meta extends ActionMeta>(
  payload: FetchChannelDataRequest,
  meta?: Meta
): FetchingChannelDataAction<Meta> => ({
  type: ChannelDataActionType.FETCHING_CHANNEL_DATA,
  payload,
  meta,
});

export const channelDataRetrieved = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchChannelDataSuccess<ChannelCustom>,
  meta?: Meta
): ChannelDataRetrievedAction<ChannelCustom, Meta> => ({
  type: ChannelDataActionType.CHANNEL_DATA_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingChannelData = <Meta extends ActionMeta>(
  payload: FetchChannelDataError,
  meta?: Meta
): ErrorFetchingChannelDataAction<Meta> => ({
  type: ChannelDataActionType.ERROR_FETCHING_CHANNEL_DATA,
  payload,
  meta,
  error: true,
});

export const fetchChannelData = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchChannelDataRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(
        fetchingChannelData<Meta>(
          {
            ...request,
          },
          meta
        )
      );

      pubnub.api.objects.getChannelMetadata<ChannelCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingChannelData<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(channelDataRetrieved<ChannelCustom, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ChannelDataActionType.FETCH_CHANNEL_DATA_COMMAND;

  return thunkFunction;
};
