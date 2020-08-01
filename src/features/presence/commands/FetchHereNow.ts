import { Dispatch } from 'redux';
import {
  HereNowRequest,
  HereNowError,
  FetchingHereNowAction,
  ErrorFetchingHereNowAction,
  HereNowRetrievedAction,
  HereNowSuccess,
} from '../PresenceActions';
import { PresenceActionType } from '../PresenceActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';

export const fetchingHereNow = <Meta extends ActionMeta>(
  payload: HereNowRequest,
  meta?: Meta
): FetchingHereNowAction<Meta> => ({
  type: PresenceActionType.FETCHING_HERE_NOW,
  payload,
  meta,
});

export const hereNowRetrieved = <Meta extends ActionMeta>(
  payload: HereNowSuccess,
  meta?: Meta
): HereNowRetrievedAction<Meta> => ({
  type: PresenceActionType.HERE_NOW_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingHereNow = <Meta extends ActionMeta>(
  payload: HereNowError,
  meta?: Meta
): ErrorFetchingHereNowAction<Meta> => ({
  type: PresenceActionType.ERROR_FETCHING_HERE_NOW,
  payload,
  meta,
});

export const fetchHereNow = <Meta extends ActionMeta>(
  request: HereNowRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<HereNowRetrievedAction<Meta>>((resolve, reject) => {
      dispatch(fetchingHereNow(request, meta));

      pubnub.api.hereNow(
        {
          ...request,
          includeUUIDs: true,
          includeState: false,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingHereNow<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            const action = hereNowRetrieved<Meta>(payload, meta);

            dispatch(action);
            resolve(action);
          }
        }
      );
    });

  thunkFunction.type = PresenceActionType.HERE_NOW_COMMAND;

  return thunkFunction;
};
