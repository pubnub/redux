import { ObjectsActionPayload } from '../types/Objects';
import { AppActions, SPACE_UPDATED, SPACE_DELETED } from '../types/actions';
import { Dispatch } from 'redux';

export const SpaceUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_UPDATED,
  payload,
});

export const SpaceDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_DELETED,
  payload,
});

export const createSpaceActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: ObjectsActionPayload
) => {
  switch (payload.type) {
    case 'space':
      switch (payload.event) {
        case 'update':
          dispatch(SpaceUpdated(payload));
          break;
        case 'delete':
          dispatch(SpaceDeleted(payload));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
