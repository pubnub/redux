import { SpaceActionType } from '../SpaceActionType.enum';
import {
  ErrorFetchingSpaceByIdAction,
  SpaceRetrievedAction,
  FetchingSpaceByIdAction,
  FetchSpaceByIdRequest,
  FetchSpaceByIdError,
  SpaceResponse,
  Space,
  FetchSpaceByIdSuccess,
} from '../SpaceActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';

// tag::RDX-168[]
export const fetchingSpaceById = <Meta extends ActionMeta>(
  payload: FetchSpaceByIdRequest,
  meta?: Meta,
): FetchingSpaceByIdAction<Meta> => ({
  type: SpaceActionType.FETCHING_SPACE_BY_ID,
  payload,
  meta,
});
// end::RDX-168[]

// tag::RDX-169[]
export const spaceRetrieved = <SpaceType extends Space<ObjectsCustom>, Meta extends ActionMeta>(
  payload: FetchSpaceByIdSuccess<SpaceType>,
  meta?: Meta
): SpaceRetrievedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACE_RETRIEVED,
  payload,
  meta,
});
// end::RDX-169[]

// tag::RDX-170[]
export const errorFetchingSpaceById = <Meta extends ActionMeta>(
  payload: FetchSpaceByIdError,
  meta?: Meta
): ErrorFetchingSpaceByIdAction<Meta> => ({
  type: SpaceActionType.ERROR_FETCHING_SPACE_BY_ID,
  payload,
  meta,
  error: true,
});
// end::RDX-170[]

export const fetchSpaceById = <SpaceType extends Space<ObjectsCustom>, Meta extends ActionMeta = never>(
  request: FetchSpaceByIdRequest,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingSpaceById<Meta>({
        ...request,
      }, meta));

      pubnub.api.getSpace(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType>) => {
          if (status.error) {
            let payload: FetchSpaceByIdError = {
              request,
              status,
            };

            dispatch(errorFetchingSpaceById<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchSpaceByIdSuccess<SpaceType> = {
              request,
              response,
              status,
            };

            dispatch(spaceRetrieved<SpaceType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.FETCH_SPACE_BY_ID_COMMAND;

  return thunkFunction;
};
