import { Dispatch } from 'redux';
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
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-162[]
export const creatingSpace = <Meta extends ActionMeta>(
  payload: SpaceRequest,
  meta?: Meta
): CreatingSpaceAction<Meta> => ({
  type: SpaceActionType.CREATING_SPACE,
  payload,
  meta,
});
// end::RDX-162[]

// tag::RDX-163[]
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
// end::RDX-163[]

// tag::RDX-164[]
export const errorCreatingSpace = <Meta extends ActionMeta>(
  payload: SpaceError,
  meta?: Meta
): ErrorCreatingSpaceAction<Meta> => ({
  type: SpaceActionType.ERROR_CREATING_SPACE,
  payload,
  meta,
  error: true,
});
// end::RDX-164[]

export const createSpace = <
  SpaceType extends Space<ObjectsCustom>,
  Meta extends ActionMeta = never
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
        (status: PubNubApiStatus, response: SpaceResponse<SpaceType>) => {
          if (status.error) {
            let payload: SpaceError = {
              request,
              status,
            };

            dispatch(errorCreatingSpace<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: SpaceSuccess<SpaceType> = {
              request,
              response,
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
