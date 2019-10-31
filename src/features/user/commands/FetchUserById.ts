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
  Meta,
} from '../../../api/PubNubApi';

export const fetchingUserById = (
  payload: string,
  meta?: Meta
): FetchingUserByIdAction => ({
  type: ActionType.FETCHING_USER_BY_ID,
  payload,
  meta,
});

export const userRetrieved = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): UserRetrievedAction<T> => ({
  type: ActionType.USER_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingUserById = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingUserByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_USER_BY_ID,
  payload,
  meta,
});

export const fetchUserById = (
  pubnub: any,
  userId: string,
  include?: object,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingUserById(userId, meta));

      pubnub.getUser(
        {
          userId,
          ...include,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: userId };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingUserById(payload, meta));
            reject(payload);
          } else {
            dispatch(userRetrieved({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
