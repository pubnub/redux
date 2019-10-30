import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  ErrorAddingMembersAction,
  MembersAddedAction,
  AddingMembersAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../../../api/PubNubApi';
import { Members } from '../../../api/Member';

const addingMembers = <T>(payload: T): AddingMembersAction<T> => ({
  type: ActionType.ADDING_MEMBERS,
  payload,
});

const membersAdded = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersAddedAction<T> => ({
  type: ActionType.MEMBERS_ADDED,
  payload,
});

const errorAddingMembers = <T>(
  payload: PubNubObjectApiError<T>
): ErrorAddingMembersAction<T> => ({
  type: ActionType.ERROR_ADDING_MEMBERS,
  payload,
});

export const addMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(addingMembers(members));

  pubnub.addMembers(
    {
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          errorAddingMembers({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersAdded({
            data: response.data,
          })
        );
      }
    }
  );
};
