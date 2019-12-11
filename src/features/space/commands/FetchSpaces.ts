import { Dispatch } from 'redux';
import {
  ErrorFetchingSpacesAction,
  SpacesRetrievedAction,
  FetchingSpacesAction,
  FetchSpacesRequest,
  FetchSpacesResponse,
  FetchSpacesError,
  Space,
  FetchSpacesSuccess,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';

// tag::RDX-function-space-fetch[]
export const fetchingSpaces = <Meta extends ActionMeta>(
  payload: FetchSpacesRequest,
  meta?: Meta
): FetchingSpacesAction<Meta> => ({
  type: SpaceActionType.FETCHING_SPACES,
  payload,
  meta,
});
// end::RDX-function-space-fetch[]

// tag::RDX-function-space-fetch-success[]
export const spacesRetrieved = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: FetchSpacesSuccess<SpaceType>,
  meta?: Meta
): SpacesRetrievedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACES_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-space-fetch-success[]

// tag::RDX-function-space-fetch-error[]
export const errorFetchingSpaces = <Meta extends ActionMeta>(
  payload: FetchSpacesError,
  meta?: Meta
): ErrorFetchingSpacesAction<Meta> => ({
  type: SpaceActionType.ERROR_FETCHING_SPACES,
  payload,
  meta,
  error: true,
});
// end::RDX-function-space-fetch-error[]

// tag::RDX-command-space-fetch[]
export const fetchSpaces = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchSpacesRequest = {},
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingSpaces<Meta>(request, meta));

      pubnub.api.getSpaces(
        { ...request },
        (status: PubNubApiStatus, response: FetchSpacesResponse<SpaceType>) => {
          if (status.error) {
            let payload: FetchSpacesError = {
              request,
              status,
            };

            dispatch(errorFetchingSpaces<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchSpacesSuccess<SpaceType> = {
              request,
              response,
              status,
            };

            dispatch(spacesRetrieved<SpaceType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.FETCH_SPACES_COMMAND;

  return thunkFunction;
};
// end::RDX-command-space-fetch[]
