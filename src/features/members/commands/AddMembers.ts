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
  Meta,
} from '../../../api/PubNubApi';
import { Members } from '../../../api/Member';

export const addingMembers = <T>(
  payload: T,
  meta?: Meta
): AddingMembersAction<T> => ({
  type: ActionType.ADDING_MEMBERS,
  payload,
  meta,
});

export const membersAdded = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): MembersAddedAction<T> => ({
  type: ActionType.MEMBERS_ADDED,
  payload,
  meta,
});

export const errorAddingMembers = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorAddingMembersAction<T> => ({
  type: ActionType.ERROR_ADDING_MEMBERS,
  payload,
  meta,
});

export const addMembers = (pubnub: any, members: Members, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(addingMembers(members, meta));

      pubnub.addMembers(
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

            dispatch(errorAddingMembers(payload, meta));
            reject(payload);
          } else {
            dispatch(membersAdded({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
