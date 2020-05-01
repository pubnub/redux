import { Dispatch } from 'redux';
import {
  ErrorCreatingSpaceAction,
  SpaceCreatedAction,
  CreatingSpaceAction,
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

// tag::RDX-function-space-create[]
export const creatingSpace = <Meta extends ActionMeta>(
  payload: SpaceRequest,
  meta?: Meta
): CreatingSpaceAction<Meta> => ({
  type: SpaceActionType.CREATING_SPACE,
  payload,
  meta,
});
// end::RDX-function-space-create[]

// tag::RDX-function-space-create-success[]
export const spaceCreated = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta
>(
  payload: SpaceSuccess<SpaceType>,
  meta?: Meta
): SpaceCreatedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACE_CREATED,
  payload,
  meta,
});
// end::RDX-function-space-create-success[]

// tag::RDX-function-space-create-error[]
export const errorCreatingSpace = <Meta extends ActionMeta>(
  payload: SpaceError,
  meta?: Meta
): ErrorCreatingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_CREATING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-function-space-create-error[]

// tag::RDX-command-space-create[]
export const createSpace = <
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
      dispatch(creatingSpace<Meta>(request, meta));

      pubnub.api.createSpace(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorCreatingSpace<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as SpaceResponse<SpaceType>,
              status,
            };

            dispatch(spaceCreated<SpaceType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.CREATE_SPACE_COMMAND;

  return thunkFunction;
};
// end::RDX-command-space-create[]
