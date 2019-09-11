import { Objects } from '../types/Objects';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const SpaceUpdated = (payload: Objects): AppActions => ({
  type: 'pubnub/SPACE_UPDATED',
  payload,
});

export const SpaceDeleted = (payload: Objects): AppActions => ({
  type: 'pubnub/SPACE_DELETED',
  payload,
});

export const createSpaceActions = (payload: Objects) => (
  dispatch: Dispatch<AppActions>
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
