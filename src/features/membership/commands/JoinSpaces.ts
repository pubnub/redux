import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  JoiningSpacesAction,
  SpacesJoinedAction,
  ErrorJoiningSpacesAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';
import { Membership } from '../../../api/Membership';

export const joiningSpaces = <T>(
  payload: T,
  meta?: Meta
): JoiningSpacesAction<T> => ({
  type: ActionType.JOINING_SPACES,
  payload,
  meta,
});

export const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpacesJoinedAction<T> => ({
  type: ActionType.SPACES_JOINED,
  payload,
  meta,
});

export const errorJoiningSpaces = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorJoiningSpacesAction<T> => ({
  type: ActionType.ERROR_JOINING_SPACES,
  payload,
  meta,
});

export const joinSpaces = (
  pubnub: any,
  membership: Membership,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(joiningSpaces(membership, meta));

      pubnub.joinSpaces(
        {
          ...membership,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: membership.userId, value: { ...membership } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorJoiningSpaces(payload, meta));
            reject(payload);
          } else {
            dispatch(spacesJoined({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
