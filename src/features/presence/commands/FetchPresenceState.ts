import { Dispatch } from 'redux';
import {
  PresenceStateRequest,
  PresenceStateError,
  FetchingPresenceStateAction,
  ErrorFetchingPresenceStateAction,
  PresenceStateRetrievedAction,
  PresenceStateSuccess,
} from '../PresenceActions';
import { PresenceActionType } from '../PresenceActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-presence-fetch[]
export const fetchingPresenceState = <Meta extends ActionMeta>(
  payload: PresenceStateRequest,
  meta?: Meta
): FetchingPresenceStateAction<Meta> => ({
  type: PresenceActionType.FETCHING_PRESENCE_STATE,
  payload,
  meta,
});
// end::RDX-function-presence-fetch[]

// tag::RDX-function-presence-fetch-success[]
export const presenceStateRetrieved = <Meta extends ActionMeta>(
  payload: PresenceStateSuccess,
  meta?: Meta
): PresenceStateRetrievedAction<Meta> => ({
  type: PresenceActionType.PRESENCE_STATE_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-presence-fetch-success[]

// tag::RDX-function-presence-fetch-error[]
export const errorFetchingPresenceState = <Meta extends ActionMeta>(
  payload: PresenceStateError,
  meta?: Meta
): ErrorFetchingPresenceStateAction<Meta> => ({
  type: PresenceActionType.ERROR_FETCHING_PRESENCE_STATE,
  payload,
  meta,
});
// end::RDX-function-presence-fetch-error[]

// tag::RDX-command-presence-fetch[]
export const fetchPresenceState = <Meta extends ActionMeta>(
  request: PresenceStateRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingPresenceState(request, meta));

      pubnub.api.getState(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingPresenceState<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(presenceStateRetrieved<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = PresenceActionType.PRESENCE_STATE_COMMAND;

  return thunkFunction;
};
// end::RDX-command-presence-fetch[]
