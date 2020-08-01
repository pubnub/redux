import { Dispatch } from 'redux';
import {
  ErrorFetchingAllChannelDataAction,
  AllChannelDataRetrievedAction,
  FetchingAllChannelDataAction,
  FetchAllChannelDataError,
  FetchAllChannelDataSuccess,
  FetchAllChannelDataRequest,
} from '../ChannelDataActions';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingAllChannelData = <Meta extends ActionMeta>(
  payload: FetchAllChannelDataRequest,
  meta?: Meta
): FetchingAllChannelDataAction<Meta> => ({
  type: ChannelDataActionType.FETCHING_ALL_CHANNEL_DATA,
  payload,
  meta,
});

export const allChannelDataRetrieved = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchAllChannelDataSuccess<ChannelCustom>,
  meta?: Meta
): AllChannelDataRetrievedAction<ChannelCustom, Meta> => ({
  type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingAllChannelData = <Meta extends ActionMeta>(
  payload: FetchAllChannelDataError,
  meta?: Meta
): ErrorFetchingAllChannelDataAction<Meta> => ({
  type: ChannelDataActionType.ERROR_FETCHING_ALL_CHANNEL_DATA,
  payload,
  meta,
  error: true,
});

export const fetchAllChannelData = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchAllChannelDataRequest = {},
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<AllChannelDataRetrievedAction<ChannelCustom, Meta>>(
      (resolve, reject) => {
        dispatch(fetchingAllChannelData<Meta>(request, meta));

        pubnub.api.objects.getAllChannelMetadata<ChannelCustom>(
          {
            ...request,
          },
          (status, response) => {
            if (status.error) {
              const payload = {
                request,
                status,
              };

              dispatch(errorFetchingAllChannelData<Meta>(payload, meta));
              reject(payload);
            } else {
              const payload = {
                request,
                response,
                status,
              };

              const action = allChannelDataRetrieved<ChannelCustom, Meta>(
                payload,
                meta
              );

              dispatch(action);
              resolve(action);
            }
          }
        );
      }
    );

  thunkFunction.type = ChannelDataActionType.FETCH_ALL_CHANNEL_DATA_COMMAND;

  return thunkFunction;
};
