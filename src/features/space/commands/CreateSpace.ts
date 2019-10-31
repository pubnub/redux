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
  Meta,
} from '../../../api/PubNubApi';

export const creatingSpace = <T>(
  payload: T,
  meta?: Meta
): CreatingSpaceAction<T> => ({
  type: ActionType.CREATING_SPACE,
  payload,
  meta,
});

export const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpaceCreatedAction<T> => ({
  type: ActionType.SPACE_CREATED,
  payload,
  meta,
});

export const errorCreatingSpace = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorCreatingSpaceAction<T> => ({
  type: ActionType.ERROR_CREATING_SPACE,
  payload,
  meta,
});

export const createSpace = (pubnub: any, space: Space, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(creatingSpace(space, meta));

      pubnub.createSpace(
        {
          ...space,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: space.id, value: space };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorCreatingSpace(payload, meta));
            reject(payload);
          } else {
            dispatch(spaceCreated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
