import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from 'api/Objects';
import {
  ErrorFetchingSpaceByIdAction,
  SpaceRetrievedAction,
  FetchingSpaceByIdAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from 'api/PubNubApi';

const fetchingSpaceById = (payload: string): FetchingSpaceByIdAction => ({
  type: ActionType.FETCHING_SPACE_BY_ID,
  payload,
});

const spaceRetrieved = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceRetrievedAction<T> => ({
  type: ActionType.SPACE_RETRIEVED,
  payload,
});

const errorFetchingSpaceById = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingSpaceByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACE_BY_ID,
  payload,
});

export const fetchSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(fetchingSpaceById(spaceId));

  pubnub.getSpace(
    {
      spaceId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: spaceId };

        dispatch(
          errorFetchingSpaceById({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceRetrieved({
            data: response.data,
          })
        );
      }
    }
  );
};
