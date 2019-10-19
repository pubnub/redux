import { ObjectsActionPayload } from '../types/Objects';
import {
  OBJECTS_UPDATE_SPACE,
  OBJECTS_DELETE_SPACE,
  SpaceDeletedAction,
  SpaceUpdatedAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import { PubNubObjectApiSuccess, Identifiable } from 'types/PubNubApi';

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_SPACE,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: OBJECTS_DELETE_SPACE,
  payload,
});

export const createSpaceActionListener = <T extends Identifiable>(
  dispatch: Dispatch<SpaceUpdatedAction<T> | SpaceDeletedAction<T>>
) => ({
  space: (payload: ObjectsActionPayload<T>) => {
    switch (payload.event) {
      case 'update':
        dispatch(
          spaceUpdated({
            data: payload.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          spaceDeleted({
            data: payload.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
