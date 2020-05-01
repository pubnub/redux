import { Dispatch } from 'redux';
import {
  SpaceDeletedAction,
  DeletingSpaceAction,
  ErrorDeletingSpaceAction,
  DeleteSpaceRequest,
  DeleteSpaceError,
  DeleteSpaceSuccess,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-space-delete[]
export const deletingSpace = <Meta extends ActionMeta>(
  payload: DeleteSpaceRequest,
  meta?: Meta
): DeletingSpaceAction<Meta> => ({
  type: SpaceActionType.DELETING_SPACE,
  payload,
  meta,
});
// end::RDX-function-space-delete[]

// tag::RDX-function-space-delete-success[]
export const spaceDeleted = <Meta extends ActionMeta>(
  payload: DeleteSpaceSuccess,
  meta?: Meta
): SpaceDeletedAction<Meta> => ({
  type: SpaceActionType.SPACE_DELETED,
  payload,
  meta,
});
// end::RDX-function-space-delete-success[]

// tag::RDX-function-space-delete-error[]
export const errorDeletingSpace = <Meta extends ActionMeta>(
  payload: DeleteSpaceError,
  meta?: Meta
): ErrorDeletingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_DELETING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-function-space-delete-error[]

// tag::RDX-command-space-delete[]
export const deleteSpace = <Meta extends ActionMeta = AnyMeta>(
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

      pubnub.api.deleteSpace(request.spaceId, (status) => {
        if (status.error) {
          const payload = {
            request,
            status,
          };

          dispatch(errorDeletingSpace<Meta>(payload, meta));
          reject(payload);
        } else {
          const payload = {
            request,
            status,
          };

          dispatch(spaceDeleted<Meta>(payload, meta));
          resolve();
        }
      });
    });

  thunkFunction.type = SpaceActionType.DELETE_SPACE_COMMAND;

  return thunkFunction;
};
// end::RDX-command-space-delete[]
