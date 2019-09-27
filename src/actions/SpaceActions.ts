import { ObjectsActionPayload } from '../types/Objects';
import { AppActions, SPACE_UPDATED, SPACE_DELETED } from '../types/actions';
import { Dispatch } from 'redux';

export const spaceUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_UPDATED,
  payload,
});

export const spaceDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_DELETED,
  payload,
});

export const createSpaceActionListener = (dispatch: Dispatch<AppActions>) => ({
  space: (payload: ObjectsActionPayload) => {
    switch (payload.type) {
      case 'space':
        switch (payload.event) {
          case 'update':
            dispatch(spaceUpdated(payload));
            break;
          case 'delete':
            dispatch(spaceDeleted(payload));
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  },
});
