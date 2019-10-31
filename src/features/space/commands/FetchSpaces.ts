import { Dispatch } from 'redux';
import { ObjectsResponsePayload, ObjectsListInput } from '../../../api/Objects';
import {
  ErrorFetchingSpacesAction,
  SpacesRetrievedAction,
  FetchingSpacesAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { Space } from '../../../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
  Meta,
} from '../../../api/PubNubApi';

export const fetchingSpaces = (meta?: Meta): FetchingSpacesAction => ({
  type: ActionType.FETCHING_SPACES,
  meta,
});

export const spacesRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>,
  meta?: Meta
): SpacesRetrievedAction<T> => ({
  type: ActionType.SPACES_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingSpaces = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingSpacesAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACES,
  payload,
  meta,
});

export const fetchSpaces = (
  pubnub: any,
  options: ObjectsListInput = {},
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingSpaces(meta));

      pubnub.getSpaces(
        { ...options },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: '' };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingSpaces(payload, meta));
            reject(payload);
          } else {
            dispatch(
              spacesRetrieved(
                {
                  data: (response.data as Space[]).reduce(
                    (result: { [key: string]: Space }, value) => {
                      if (value.description === null) {
                        value.description = ''; // TODO: reference app cannot handle missing description
                      }

                      result[value.id] = value;
                      return result;
                    },
                    {}
                  ),
                },
                meta
              )
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
