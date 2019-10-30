import { Dispatch } from 'redux';
import { ObjectsResponsePayload, ObjectsListInput } from '../../../api/Objects';
import {
  ErrorFetchingUsersAction,
  UsersRetrievedAction,
  FetchingUsersAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { User } from '../../../api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
} from '../../../api/PubNubApi';

const fetchingUsers = (payload: { label: string }): FetchingUsersAction => ({
  type: ActionType.FETCHING_USERS,
  payload,
});

const usersRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): UsersRetrievedAction<T> => ({
  type: ActionType.USERS_RETRIEVED,
  payload,
});

const errorFetchingUsers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingUsersAction<T> => ({
  type: ActionType.ERROR_FETCHING_USERS,
  payload,
});

export const fetchUsers = (
  pubnub: any,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchingUsers({ label: label }));

  pubnub.getUsers(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: '' };

        dispatch(
          errorFetchingUsers({
            code: status.category,
            message: status.errorData,
            data: errorData,
            label: label,
          })
        );
      } else {
        dispatch(
          usersRetrieved({
            label: label,
            data: (response.data as User[]).reduce(
              (result: { [key: string]: User }, value) => {
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
