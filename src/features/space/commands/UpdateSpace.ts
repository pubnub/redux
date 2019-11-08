import {
  SpaceRequest,
  UpdatingSpaceAction,
  SpaceUpdatedAction,
  ErrorUpdatingSpaceAction,
  SpaceResponse,
  SpaceError,
  Space,
  SpaceSuccess,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-174[]
export const updatingSpace = <Meta extends ActionMeta>(
  payload: SpaceRequest,
  meta?: Meta
): UpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.UPDATING_SPACE,
  payload,
  meta,
});
// end::RDX-174[]

// tag::RDX-175[]
export const spaceUpdated = <SpaceType extends Space<ObjectsCustom>, Meta extends ActionMeta>(
  payload: SpaceSuccess<SpaceType>,
  meta?: Meta
): SpaceUpdatedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACE_UPDATED,
  payload,
  meta,
});
// end::RDX-175[]

// tag::RDX-176[]
export const errorUpdatingSpace = <Meta extends ActionMeta>(
  payload: SpaceError,
  meta?: Meta
): ErrorUpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_UPDATING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-176[]

export const updateSpace = <SpaceType extends Space<ObjectsCustom>, Meta extends ActionMeta = never>(request: SpaceRequest, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingSpace<Meta>(request, meta));

      pubnub.api.updateSpace(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType>) => {
          if (status.error) {
            let payload: SpaceError = {
              request,
              status
            };

            dispatch(errorUpdatingSpace<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: SpaceSuccess<SpaceType> = {
              request,
              response,
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
