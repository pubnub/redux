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
  Meta,
} from '../../../api/PubNubApi';

export const updatingSpace = <T>(
  payload: T,
  meta?: Meta
): UpdatingSpaceAction<T> => ({
  type: ActionType.UPDATING_SPACE,
  payload,
  meta,
});

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpaceUpdatedAction<T> => ({
  type: ActionType.SPACE_UPDATED,
  payload,
  meta,
});

export const errorUpdatingSpace = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorUpdatingSpaceAction<T> => ({
  type: ActionType.ERROR_UPDATING_SPACE,
  payload,
  meta,
});

export const updateSpace = (pubnub: any, space: Space, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingSpace(space, meta));

      pubnub.updateSpace(
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

            dispatch(errorUpdatingSpace(payload, meta));
            reject(payload);
          } else {
            dispatch(spaceUpdated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
