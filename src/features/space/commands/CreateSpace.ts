import {
  ErrorCreatingSpaceAction,
  SpaceCreatedAction,
  CreatingSpaceAction,
  SpaceRequest,
  SpaceResponse,
  SpaceError,
  Space,
  SpaceSuccess,
} from '../SpaceActions';
import { SpaceActionType } from '../SpaceActionType.enum';
import { ActionMeta } from '../../../common/ActionMeta';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const creatingSpace = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceType | SpaceRequest<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): CreatingSpaceAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.CREATING_SPACE,
  payload,
  meta,
});

export const spaceCreated = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceSuccess<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): SpaceCreatedAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.SPACE_CREATED,
  payload,
  meta,
});

export const errorCreatingSpace = <SpaceType extends Space, CustomType, MetaType>(
  payload: SpaceError<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>
): ErrorCreatingSpaceAction<SpaceType, CustomType, MetaType> => ({
  type: SpaceActionType.ERROR_CREATING_SPACE,
  payload,
  meta,
  error: true,
});

export const createSpace = <SpaceType extends Space, CustomType, MetaType>(request: SpaceRequest<SpaceType, CustomType>, meta?: ActionMeta<MetaType>) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(creatingSpace<SpaceType, CustomType, MetaType>(request, meta));

      pubnub.api.createSpace(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: SpaceError<SpaceType, CustomType> = {
              request,
              status,
            };

            dispatch(errorCreatingSpace<SpaceType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: SpaceSuccess<SpaceType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(spaceCreated<SpaceType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = SpaceActionType.CREATE_SPACE_COMMAND;

  return thunkFunction;
};
