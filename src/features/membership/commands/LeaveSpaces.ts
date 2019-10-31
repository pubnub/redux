import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  LeavingSpacesAction,
  SpacesLeftAction,
  ErrorLeavingSpacesAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';
import { Membership } from '../../../api/Membership';

export const leavingSpaces = <T>(
  payload: T,
  meta?: Meta
): LeavingSpacesAction<T> => ({
  type: ActionType.LEAVING_SPACES,
  payload,
  meta,
});

export const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpacesLeftAction<T> => ({
  type: ActionType.SPACES_LEFT,
  payload,
  meta,
});

export const errorLeavingSpaces = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorLeavingSpacesAction<T> => ({
  type: ActionType.ERROR_LEAVING_SPACES,
  payload,
  meta,
});

export const leaveSpaces = (
  pubnub: any,
  membership: Membership,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(leavingSpaces(membership, meta));

      pubnub.leaveSpaces(
        {
          userId: membership.userId,
          spaces: membership.spaces.map((space) => space.id),
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: membership.userId, value: { ...membership } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorLeavingSpaces(payload, meta));
            reject(payload);
          } else {
            dispatch(spacesLeft({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
