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

export const updatingSpace = <Meta extends ActionMeta>(
  payload: SpaceRequest,
  meta?: Meta
): UpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.UPDATING_SPACE,
  payload,
  meta,
});

export const spaceUpdated = <SpaceType extends Space<ObjectsCustom>, Meta extends ActionMeta>(
  payload: SpaceSuccess<SpaceType>,
  meta?: Meta
): SpaceUpdatedAction<SpaceType, Meta> => ({
  type: SpaceActionType.SPACE_UPDATED,
  payload,
  meta,
});

export const errorUpdatingSpace = <Meta extends ActionMeta>(
  payload: SpaceError,
  meta?: Meta
): ErrorUpdatingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_UPDATING_SPACE,
  payload,
  meta,
  error: true,
});

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
