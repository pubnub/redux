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
  Meta,
} from '../../../api/PubNubApi';

export const fetchingUsers = (meta?: Meta): FetchingUsersAction => ({
  type: ActionType.FETCHING_USERS,
  meta,
});

export const usersRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>,
  meta?: Meta
): UsersRetrievedAction<T> => ({
  type: ActionType.USERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUsers = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingUsersAction<T> => ({
  type: ActionType.ERROR_FETCHING_USERS,
  payload,
  meta,
});

export const fetchUsers = (
  pubnub: any,
  options: ObjectsListInput = {},
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingUsers(meta));

      pubnub.getUsers(
        { ...options },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: '' };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingUsers(payload, meta));
            reject(payload);
          } else {
            dispatch(
              usersRetrieved(
                {
                  data: (response.data as User[]).reduce(
                    (result: { [key: string]: User }, value) => {
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
