import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import { Members } from '../../../api/Member';
import {
  ErrorRemovingMembersAction,
  MembersRemovedAction,
  RemovingMembersAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';

export const removingMembers = <T>(
  payload: T,
  meta?: Meta
): RemovingMembersAction<T> => ({
  type: ActionType.REMOVING_MEMBERS,
  payload,
  meta,
});

export const membersRemoved = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): MembersRemovedAction<T> => ({
  type: ActionType.MEMBERS_REMOVED,
  payload,
  meta,
});

export const errorRemovingMembers = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorRemovingMembersAction<T> => ({
  type: ActionType.ERROR_REMOVING_MEMBERS,
  payload,
  meta,
});

export const removeMembers = (pubnub: any, members: Members, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(removingMembers(members, meta));

      pubnub.removeMembers(
        {
          spaceId: members.spaceId,
          users: members.users.map((user) => user.id),
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: members.spaceId, value: { ...members } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorRemovingMembers(payload, meta));
            reject(payload);
          } else {
            dispatch(membersRemoved({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
