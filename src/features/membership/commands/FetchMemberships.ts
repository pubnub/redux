import { Dispatch } from 'redux';
import {
  MembershipsRetrievedAction,
  FetchingMembershipsAction,
  ErrorFetchingMembershipsAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';
import {
  MembershipList,
  MembershipResult,
  MembershipOptions,
} from '../../../api/Membership';

export const fetchingMemberships = (
  payload: string,
  meta?: Meta
): FetchingMembershipsAction => ({
  type: ActionType.FETCHING_MEMBERSHIPS,
  payload,
  meta,
});

export const membershipsRetrieved = (
  payload: PubNubObjectApiSuccess<MembershipResult>,
  meta?: Meta
): MembershipsRetrievedAction => ({
  type: ActionType.MEMBERSHIPS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMemberships = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingMembershipsAction<T> => ({
  type: ActionType.ERROR_FETCHING_MEMBERSHIPS,
  payload,
  meta,
});

export const fetchMemberships = (
  pubnub: any,
  userId: string,
  options: MembershipOptions = {}
) => {
  const thunkFunction = (dispatch: Dispatch, meta?: Meta) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMemberships(userId, meta));

      pubnub.getMemberships(
        {
          userId,
          ...options,
        },
        (status: PubNubApiStatus, response: { data: MembershipList }) => {
          if (status.error) {
            let errorData = { id: userId };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingMemberships(payload, meta));
            reject(payload);
          } else {
            let result = {
              id: userId,
              spaces: response.data,
            };
            dispatch(membershipsRetrieved({ data: result }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
