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
} from '../../../api/PubNubApi';

const fetchingSpaces = (payload: { label: string }): FetchingSpacesAction => ({
  type: ActionType.FETCHING_SPACES,
  payload,
});

const spacesRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): SpacesRetrievedAction<T> => ({
  type: ActionType.SPACES_RETRIEVED,
  payload,
});

const errorFetchingSpaces = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingSpacesAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACES,
  payload,
});

export const fetchSpaces = (
  pubnub: any,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchingSpaces({ label: label }));

  pubnub.getSpaces(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: '' };

        dispatch(
          errorFetchingSpaces({
            code: status.category,
            message: status.errorData,
            data: errorData,
            label: label,
          })
        );
      } else {
        dispatch(
          spacesRetrieved({
            label: label,
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
          })
        );
      }
    }
  );
};
