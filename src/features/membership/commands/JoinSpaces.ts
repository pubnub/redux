import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from 'api/Objects';
import {
  JoiningSpacesAction,
  SpacesJoinedAction,
  ErrorJoiningSpacesAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';
import { Membership } from 'api/Membership';

const joiningSpaces = <T>(payload: T): JoiningSpacesAction<T> => ({
  type: ActionType.JOINING_SPACES,
  payload,
});

const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesJoinedAction<T> => ({
  type: ActionType.SPACES_JOINED,
  payload,
});

const errorJoiningSpaces = <T>(
  payload: PubNubObjectApiError<T>
): ErrorJoiningSpacesAction<T> => ({
  type: ActionType.ERROR_JOINING_SPACES,
  payload,
});

export const joinSpaces = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(joiningSpaces(membership));

  pubnub.joinSpaces(
    {
      ...membership,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          errorJoiningSpaces({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spacesJoined({
            data: response.data,
          })
        );
      }
    }
  );
};
