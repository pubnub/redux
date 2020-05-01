import { Dispatch } from 'redux';
import {
  UpdatingSpaceAction,
  SpaceUpdatedAction,
  ErrorUpdatingSpaceAction,
  SpaceError,
  SpaceSuccess,
  SpaceRequest,
  Space,
  SpaceResponse,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

// tag::RDX-function-space-update[]
export const updatingSpace = <Meta extends ActionMeta>(
  payload: SpaceRequest,
  meta?: Meta
): UpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.UPDATING_SPACE,
  payload,
  meta,
});
// end::RDX-function-space-update[]

// tag::RDX-function-space-update-success[]
export const spaceUpdated = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: SpaceSuccess<SpaceType>,
  meta?: Meta
): SpaceUpdatedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACE_UPDATED,
  payload,
  meta,
});
// end::RDX-function-space-update-success[]

// tag::RDX-function-space-update-error[]
export const errorUpdatingSpace = <Meta extends ActionMeta>(
  payload: SpaceError,
  meta?: Meta
): ErrorUpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_UPDATING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-function-space-update-error[]

// tag::RDX-command-space-update[]
export const updateSpace = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta = AnyMeta
>(
  request: SpaceRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingSpace<Meta>(request, meta));

      pubnub.api.updateSpace(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorUpdatingSpace<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as SpaceResponse<SpaceType>,
              status,
            };

            dispatch(spaceUpdated<SpaceType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.UPDATE_SPACE_COMMAND;

  return thunkFunction;
};
// end::RDX-command-space-update[]
