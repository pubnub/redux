import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from 'api/Objects';
import { Members } from 'api/Member';
import {
  ErrorRemovingMembersAction,
  MembersRemovedAction,
  RemovingMembersAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';

const removingMembers = <T>(payload: T): RemovingMembersAction<T> => ({
  type: ActionType.REMOVING_MEMBERS,
  payload,
});

const membersRemoved = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersRemovedAction<T> => ({
  type: ActionType.MEMBERS_REMOVED,
  payload,
});

const errorRemovingMembers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorRemovingMembersAction<T> => ({
  type: ActionType.ERROR_REMOVING_MEMBERS,
  payload,
});

export const removeMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(removingMembers(members));

  pubnub.removeMembers(
    {
      spaceId: members.spaceId,
      users: members.users.map((user) => user.id),
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          errorRemovingMembers({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersRemoved({
            data: response.data,
          })
        );
      }
    }
  );
};
