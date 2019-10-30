import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from 'api/Objects';
import {
  UpdatingMembersAction,
  ErrorUpdatingMembersAction,
  MembersUpdatedAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';
import { Members } from 'api/Member';

const updatingMembers = (payload: string): UpdatingMembersAction => ({
  type: ActionType.UPDATING_MEMBERS,
  payload,
});

const membersUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersUpdatedAction<T> => ({
  type: ActionType.MEMBERS_UPDATED,
  payload,
});

const errorUpdatingMembers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingMembersAction<T> => ({
  type: ActionType.ERROR_UPDATING_MEMBERS,
  payload,
});

export const updateMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(updatingMembers(members.spaceId));

  pubnub.updateMembers(
    {
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          errorUpdatingMembers({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};
