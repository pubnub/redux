import { Dispatch } from 'redux';
import {
  FetchingMembersAction,
  MembersRetrievedAction,
  ErrorFetchingMembersAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../../../api/PubNubApi';
import { MembersList, MembersResult, MembersOptions } from '../../../api/Member';

const fetchingMembers = (payload: string): FetchingMembersAction => ({
  type: ActionType.FETCHING_MEMBERS,
  payload,
});

const membersRetrieved = (
  payload: PubNubObjectApiSuccess<MembersResult>
): MembersRetrievedAction => ({
  type: ActionType.MEMBERS_RETRIEVED,
  payload,
});

const errorFetchingMembers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingMembersAction<T> => ({
  type: ActionType.ERROR_FETCHING_MEMBERS,
  payload,
});

export const fetchMembers = (
  pubnub: any,
  spaceId: string,
  options: MembersOptions = {}
) => (dispatch: Dispatch) => {
  dispatch(fetchingMembers(spaceId));

  pubnub.getMembers(
    {
      spaceId,
      ...options,
    },
    (status: PubNubApiStatus, response: { data: MembersList }) => {
      if (status.error) {
        let errorData = { id: spaceId };

        dispatch(
          errorFetchingMembers({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        let result = {
          id: spaceId,
          users: response.data,
        };
        dispatch(membersRetrieved({ data: result }));
      }
    }
  );
};
