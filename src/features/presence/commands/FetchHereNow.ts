import { Dispatch } from 'redux';
import {
  HereNowRequest,
  HereNowResponse,
  HereNowError,
  FetchingHereNowAction,
  ErrorFetchingHereNowAction,
  HereNowRetrievedAction,
  HereNowSuccess,
} from '../PresenceActions';
import { PresenceActionType } from '../PresenceActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-presence-herenow[]
export const fetchingHereNow = <Meta extends ActionMeta>(
  payload: HereNowRequest,
  meta?: Meta
): FetchingHereNowAction<Meta> => ({
  type: PresenceActionType.FETCHING_HERE_NOW,
  payload,
  meta,
});
// end::RDX-function-presence-herenow[]

// tag::RDX-function-presence-herenow-success[]
export const hereNowRetrieved = <Meta extends ActionMeta>(
  payload: HereNowSuccess,
  meta?: Meta
): HereNowRetrievedAction<Meta> => ({
  type: PresenceActionType.HERE_NOW_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-presence-herenow-success[]

// tag::RDX-function-presence-herenow-error[]
export const errorFetchingHereNow = <Meta extends ActionMeta>(
  payload: HereNowError,
  meta?: Meta
): ErrorFetchingHereNowAction<Meta> => ({
  type: PresenceActionType.ERROR_FETCHING_HERE_NOW,
  payload,
  meta,
});
// end::RDX-function-presence-herenow-error[]

// tag::RDX-command-presence-herenow[]
export const fetchHereNow = <Meta extends ActionMeta>(
  request: HereNowRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingHereNow(request, meta));

      pubnub.api.hereNow(
        {
          ...request,
          includeUUIDs: true,
          includeState: false,
        },
        (status: PubNubApiStatus, response: HereNowResponse) => {
          if (status.error) {
            let payload: HereNowError = {
              request,
              status,
            };

            dispatch(errorFetchingHereNow<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: HereNowSuccess = {
              request,
              response,
              status,
            };

            dispatch(hereNowRetrieved<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = PresenceActionType.HERE_NOW_COMMAND;

  return thunkFunction;
};
// end::RDX-command-presence-herenow[]
