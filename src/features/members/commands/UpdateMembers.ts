import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  UpdatingMembersAction,
  ErrorUpdatingMembersAction,
  MembersUpdatedAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';
import { Members } from '../../../api/Member';

export const updatingMembers = (
  payload: string,
  meta?: Meta
): UpdatingMembersAction => ({
  type: ActionType.UPDATING_MEMBERS,
  payload,
  meta,
});

export const membersUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): MembersUpdatedAction<T> => ({
  type: ActionType.MEMBERS_UPDATED,
  payload,
  meta,
});

export const errorUpdatingMembers = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorUpdatingMembersAction<T> => ({
  type: ActionType.ERROR_UPDATING_MEMBERS,
  payload,
  meta,
});

export const updateMembers = (pubnub: any, members: Members, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingMembers(members.spaceId, meta));

      pubnub.updateMembers(
        {
          ...members,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: members.spaceId, value: { ...members } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorUpdatingMembers(payload, meta));
            reject(payload);
          } else {
            dispatch(membersUpdated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
