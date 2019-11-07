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

export const fetchingSpaceById = <MetaType>(
  payload: FetchSpaceByIdRequest,
  meta?: MetaType,
): FetchingSpaceByIdAction<MetaType> => ({
  type: SpaceActionType.FETCHING_SPACE_BY_ID,
  payload,
  meta,
});

export const spaceRetrieved = <SpaceType extends Space, CustomType, MetaType>(
  payload: FetchSpaceByIdSuccess<SpaceType, CustomType>,
  meta?: MetaType
): SpaceRetrievedAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.SPACE_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingSpaceById = <MetaType>(
  payload: FetchSpaceByIdError,
  meta?: MetaType
): ErrorFetchingSpaceByIdAction<MetaType> => ({
  type: SpaceActionType.ERROR_FETCHING_SPACE_BY_ID,
  payload,
  meta,
  error: true,
});

export const fetchSpaceById = <SpaceType extends Space, CustomType, MetaType>(
  request: FetchSpaceByIdRequest,
  meta?: MetaType
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingSpaceById<MetaType>({
        ...request,
      }, meta));

      pubnub.api.getSpace(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: FetchSpaceByIdError = {
              request,
              status,
            };

            dispatch(errorFetchingSpaceById<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchSpaceByIdSuccess<SpaceType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(spaceRetrieved<SpaceType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.FETCH_SPACE_BY_ID_COMMAND;

  return thunkFunction;
};
