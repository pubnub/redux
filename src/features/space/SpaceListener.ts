import { Dispatch } from 'redux';
import { SpaceDeletedAction, SpaceUpdatedAction } from 'actions/Actions';
import { ObjectsActionPayload } from 'api/Objects';
import { ActionType } from 'actions/ActionType.enum';
import { PubNubObjectApiSuccess, Identifiable } from 'api/PubNubApi';

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: ActionType.OBJECTS_UPDATE_SPACE,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: ActionType.OBJECTS_DELETE_SPACE,
  payload,
});

export const createSpaceActionListener = <T extends Identifiable>(
  dispatch: Dispatch<SpaceUpdatedAction<T> | SpaceDeletedAction<T>>
) => ({
  space: (payload: ObjectsActionPayload<T>) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(
          spaceUpdated({
            data: payload.message.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          spaceDeleted({
            data: payload.message.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
