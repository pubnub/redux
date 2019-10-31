import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  SpaceDeletedAction,
  DeletingSpaceAction,
  ErrorDeletingSpaceAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Meta,
} from '../../../api/PubNubApi';

export const deletingSpace = (
  payload: string,
  meta?: Meta
): DeletingSpaceAction => ({
  type: ActionType.DELETING_SPACE,
  payload,
  meta,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): SpaceDeletedAction<T> => ({
  type: ActionType.SPACE_DELETED,
  payload,
  meta,
});

export const errorDeletingSpace = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorDeletingSpaceAction<T> => ({
  type: ActionType.ERROR_DELETING_SPACE,
  payload,
  meta,
});

export const deleteSpace = (pubnub: any, id: string, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingSpace(id, meta));

      pubnub.deleteSpace(
        id,
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: id };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorDeletingSpace(payload, meta));
            reject(payload);
          } else {
            dispatch(spaceDeleted({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
