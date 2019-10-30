import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  ErrorFetchingUserByIdAction,
  UserRetrievedAction,
  FetchingUserByIdAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from '../../../api/PubNubApi';

const fetchingUserById = (payload: string): FetchingUserByIdAction => ({
  type: ActionType.FETCHING_USER_BY_ID,
  payload,
});

const userRetrieved = <T>(
  payload: PubNubObjectApiSuccess<T>
): UserRetrievedAction<T> => ({
  type: ActionType.USER_RETRIEVED,
  payload,
});

const errorFetchingUserById = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingUserByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
});

export const fetchUserById = (
  pubnub: any,
  userId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(fetchingUserById(userId));

  pubnub.getUser(
    {
      userId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: userId };

        dispatch(
          errorFetchingUserById({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          userRetrieved({
            data: response.data,
          })
        );
      }
    }
  );
};
