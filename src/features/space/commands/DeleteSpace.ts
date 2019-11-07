import {
  SpaceDeletedAction,
  DeletingSpaceAction,
  ErrorDeletingSpaceAction,
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  DeleteSpaceSuccess
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const deletingSpace = <MetaType>(
  payload: DeleteSpaceRequest,
  meta?: MetaType
): DeletingSpaceAction<MetaType> => ({
  type: SpaceActionType.DELETING_SPACE,
  payload,
  meta,
});

export const spaceDeleted = <MetaType>(
  payload: DeleteSpaceSuccess,
  meta?: MetaType,
): SpaceDeletedAction<MetaType> => ({
  type: SpaceActionType.SPACE_DELETED,
  payload,
  meta,
});

export const errorDeletingSpace = <MetaType>(
  payload: DeleteSpaceError,
  meta?: MetaType,
): ErrorDeletingSpaceAction<MetaType> => ({
  type: SpaceActionType.ERROR_DELETING_SPACE,
  payload,
  meta,
  error: true,
});

export const deleteSpace = <MetaType>(request: DeleteSpaceRequest, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingSpace<MetaType>(request, meta));

      pubnub.api.deleteSpace(
        request.spaceId,
        (status: PubNubApiStatus , response: DeleteSpaceResponse) => {
          if (status.error) {
            let payload: DeleteSpaceError = {
              request,
              status,
            };

            dispatch(errorDeletingSpace<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: DeleteSpaceSuccess = {
              request,
              response,
              status,
            };

            dispatch(spaceDeleted<MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.DELETE_SPACE_COMMAND;

  return thunkFunction;
};
