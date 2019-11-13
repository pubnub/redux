import { Dispatch } from 'redux';
import {
  SpaceDeletedAction,
  DeletingSpaceAction,
  ErrorDeletingSpaceAction,
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  DeleteSpaceSuccess,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-165[]
export const deletingSpace = <Meta extends ActionMeta>(
  payload: DeleteSpaceRequest,
  meta?: Meta
): DeletingSpaceAction<Meta> => ({
  type: SpaceActionType.DELETING_SPACE,
  payload,
  meta,
});
// end::RDX-165[]

// tag::RDX-166[]
export const spaceDeleted = <Meta extends ActionMeta>(
  payload: DeleteSpaceSuccess,
  meta?: Meta
): SpaceDeletedAction<Meta> => ({
  type: SpaceActionType.SPACE_DELETED,
  payload,
  meta,
});
// end::RDX-166[]

// tag::RDX-167[]
export const errorDeletingSpace = <Meta extends ActionMeta>(
  payload: DeleteSpaceError,
  meta?: Meta
): ErrorDeletingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_DELETING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-167[]

export const deleteSpace = <Meta extends ActionMeta = never>(
  request: DeleteSpaceRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(deletingSpace<Meta>(request, meta));

      pubnub.api.deleteSpace(
        request.spaceId,
        (status: PubNubApiStatus, response: DeleteSpaceResponse) => {
          if (status.error) {
            let payload: DeleteSpaceError = {
              request,
              status,
            };

            dispatch(errorDeletingSpace<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: DeleteSpaceSuccess = {
              request,
              response,
              status,
            };

            dispatch(spaceDeleted<Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.DELETE_SPACE_COMMAND;

  return thunkFunction;
};
