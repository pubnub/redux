import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  ErrorFetchingSpaceByIdAction,
  SpaceRetrievedAction,
  FetchingSpaceByIdAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Meta,
} from '../../../api/PubNubApi';

export const fetchingSpaceById = (
  payload: string,
  meta?: Meta
): FetchingSpaceByIdAction => ({
  type: ActionType.FETCHING_SPACE_BY_ID,
  payload,
  meta,
});

export const spaceRetrieved = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpaceRetrievedAction<T> => ({
  type: ActionType.SPACE_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingSpaceById = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingSpaceByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACE_BY_ID,
  payload,
  meta,
});

export const fetchSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingSpaceById(spaceId, meta));

      pubnub.getSpace(
        {
          spaceId,
          ...include,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: spaceId };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingSpaceById(payload, meta));
            reject();
          } else {
            dispatch(spaceRetrieved({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
