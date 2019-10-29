import { Dispatch } from 'redux';
import { SpaceDeletedAction, SpaceUpdatedAction } from 'actions/Actions';
import { ObjectsActionPayload } from 'api/Objects';
import { ActionType } from 'actions/ActionType.enum';
import { PubNubObjectApiSuccess, Identifiable } from 'api/PubNubApi';

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: ActionType.SPACE_UPDATED,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: ActionType.SPACE_DELETED,
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
