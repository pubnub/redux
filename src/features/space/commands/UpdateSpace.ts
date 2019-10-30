import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  SpaceUpdatedAction,
  UpdatingSpaceAction,
  ErrorUpdatingSpaceAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { Space } from '../../../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from '../../../api/PubNubApi';

const updatingSpace = <T>(payload: T): UpdatingSpaceAction<T> => ({
  type: ActionType.UPDATING_SPACE,
  payload,
});

const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: ActionType.SPACE_UPDATED,
  payload,
});

const errorUpdatingSpace = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingSpaceAction<T> => ({
  type: ActionType.ERROR_UPDATING_SPACE,
  payload,
});

export const updateSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(updatingSpace(space));

  pubnub.updateSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: space.id, value: space };

        dispatch(
          errorUpdatingSpace({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};
