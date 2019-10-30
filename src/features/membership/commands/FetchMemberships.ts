import { Dispatch } from 'redux';
import {
  MembershipsRetrievedAction,
  FetchingMembershipsAction,
  ErrorFetchingMembershipsAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';
import {
  MembershipList,
  MembershipResult,
  MembershipOptions,
} from 'api/Membership';

const fetchingMemberships = (payload: string): FetchingMembershipsAction => ({
  type: ActionType.FETCHING_MEMBERSHIPS,
  payload,
});

const membershipsRetrieved = (
  payload: PubNubObjectApiSuccess<MembershipResult>
): MembershipsRetrievedAction => ({
  type: ActionType.MEMBERSHIPS_RETRIEVED,
  payload,
});

const errorFetchingMemberships = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingMembershipsAction<T> => ({
  type: ActionType.ERROR_FETCHING_MEMBERSHIPS,
  payload,
});

export const fetchMemberships = (
  pubnub: any,
  userId: string,
  options: MembershipOptions = {}
) => (dispatch: Dispatch) => {
  dispatch(fetchingMemberships(userId));

  pubnub.getMemberships(
    {
      userId,
      ...options,
    },
    (status: PubNubApiStatus, response: { data: MembershipList }) => {
      if (status.error) {
        let errorData = { id: userId };

        dispatch(
          errorFetchingMemberships({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        let result = {
          id: userId,
          spaces: response.data,
        };
        dispatch(membershipsRetrieved({ data: result }));
      }
    }
  );
};
