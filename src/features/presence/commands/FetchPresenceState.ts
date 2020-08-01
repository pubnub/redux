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
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';

export const fetchingPresenceState = <Meta extends ActionMeta>(
  payload: PresenceStateRequest,
  meta?: Meta
): FetchingPresenceStateAction<Meta> => ({
  type: PresenceActionType.FETCHING_PRESENCE_STATE,
  payload,
  meta,
});

export const presenceStateRetrieved = <Meta extends ActionMeta>(
  payload: PresenceStateSuccess,
  meta?: Meta
): PresenceStateRetrievedAction<Meta> => ({
  type: PresenceActionType.PRESENCE_STATE_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingPresenceState = <Meta extends ActionMeta>(
  payload: PresenceStateError,
  meta?: Meta
): ErrorFetchingPresenceStateAction<Meta> => ({
  type: PresenceActionType.ERROR_FETCHING_PRESENCE_STATE,
  payload,
  meta,
});

export const fetchPresenceState = <Meta extends ActionMeta>(
  request: PresenceStateRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<PresenceStateRetrievedAction<Meta>>((resolve, reject) => {
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

            const action = presenceStateRetrieved<Meta>(payload, meta);

            dispatch(action);
            resolve(action);
          }
        }
      );
    });

  thunkFunction.type = PresenceActionType.PRESENCE_STATE_COMMAND;

  return thunkFunction;
};
