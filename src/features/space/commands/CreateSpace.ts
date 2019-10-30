import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  ErrorCreatingSpaceAction,
  SpaceCreatedAction,
  CreatingSpaceAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import { Space } from '../../../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from '../../../api/PubNubApi';

const creatingSpace = <T>(payload: T): CreatingSpaceAction<T> => ({
  type: ActionType.CREATING_SPACE,
  payload,
});

const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: ActionType.SPACE_CREATED,
  payload,
});

const errorCreatingSpace = <T>(
  payload: PubNubObjectApiError<T>
): ErrorCreatingSpaceAction<T> => ({
  type: ActionType.ERROR_CREATING_SPACE,
  payload,
});

export const createSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(creatingSpace(space));

  pubnub.createSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: space.id, value: space };

        dispatch(
          errorCreatingSpace({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceCreated({
            data: response.data,
          })
        );
      }
    }
  );
};
