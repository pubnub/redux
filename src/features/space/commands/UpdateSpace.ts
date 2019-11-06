import { Dispatch } from 'redux';
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
import { ActionMeta } from '../../../common/ActionMeta';
import { PubNubApiStatus } from '../../../common/PubNubApi';

export const updatingSpace = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceType | SpaceRequest<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): UpdatingSpaceAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.UPDATING_SPACE,
  payload,
  meta,
});

export const spaceUpdated = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceSuccess<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): SpaceUpdatedAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.SPACE_UPDATED,
  payload,
  meta,
});

export const errorUpdatingSpace = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceError<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): ErrorUpdatingSpaceAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.ERROR_UPDATING_SPACE,
  payload,
  meta,
  error: true,
});

export const updateSpace = <SpaceType extends Space, CustomType, MetaType>(request: SpaceRequest<SpaceType, CustomType>, meta?: ActionMeta<MetaType>) => {
  const thunkFunction = (dispatch: Dispatch, { pubnub }: { pubnub: any }) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingSpace<SpaceType, CustomType, MetaType>(request, meta));

      pubnub.updateSpace(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: SpaceError<SpaceType, CustomType> = {
              request,
              status
            };

            dispatch(errorUpdatingSpace<SpaceType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: SpaceSuccess<SpaceType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(spaceUpdated<SpaceType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.UPDATE_SPACE_COMMAND;

  return thunkFunction;
};
