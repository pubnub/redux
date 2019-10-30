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
} from '../../../api/PubNubApi';
import { Membership } from '../../../api/Membership';

const leavingSpaces = <T>(payload: T): LeavingSpacesAction<T> => ({
  type: ActionType.LEAVING_SPACES,
  payload,
});

const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesLeftAction<T> => ({
  type: ActionType.SPACES_LEFT,
  payload,
});

const errorLeavingSpaces = <T>(
  payload: PubNubObjectApiError<T>
): ErrorLeavingSpacesAction<T> => ({
  type: ActionType.ERROR_LEAVING_SPACES,
  payload,
});

export const leaveSpaces = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(leavingSpaces(membership));

  pubnub.leaveSpaces(
    {
      userId: membership.userId,
      spaces: membership.spaces.map((space) => space.id),
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          errorLeavingSpaces({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spacesLeft({
            data: response.data,
          })
        );
      }
    }
  );
};
