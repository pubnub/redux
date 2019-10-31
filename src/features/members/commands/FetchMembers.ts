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
  Meta,
} from '../../../api/PubNubApi';
import {
  MembersList,
  MembersResult,
  MembersOptions,
} from '../../../api/Member';

export const fetchingMembers = (
  payload: string,
  meta?: Meta
): FetchingMembersAction => ({
  type: ActionType.FETCHING_MEMBERS,
  payload,
  meta,
});

export const membersRetrieved = (
  payload: PubNubObjectApiSuccess<MembersResult>,
  meta?: Meta
): MembersRetrievedAction => ({
  type: ActionType.MEMBERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMembers = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorFetchingMembersAction<T> => ({
  type: ActionType.ERROR_FETCHING_MEMBERS,
  payload,
  meta,
});

export const fetchMembers = (
  pubnub: any,
  spaceId: string,
  options: MembersOptions = {}
) => {
  const thunkFunction = (dispatch: Dispatch, meta?: Meta) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMembers(spaceId, meta));

      pubnub.getMembers(
        {
          spaceId,
          ...options,
        },
        (status: PubNubApiStatus, response: { data: MembersList }) => {
          if (status.error) {
            let errorData = { id: spaceId };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorFetchingMembers(payload, meta));
            reject(payload);
          } else {
            let result = {
              id: spaceId,
              users: response.data,
            };
            dispatch(membersRetrieved({ data: result }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
