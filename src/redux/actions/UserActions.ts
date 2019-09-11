import { Objects } from '../types/Objects';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const UserUpdated = (payload: Objects): AppActions => ({
  type: 'pubnub/USER_UPDATED',
  payload,
});

export const UserDeleted = (payload: Objects): AppActions => ({
  type: 'pubnub/USER_DELETED',
  payload,
});

export const createUserActions = (payload: Objects) => (
  dispatch: Dispatch<AppActions>
) => {
  switch (payload.type) {
    case 'user':
      switch (payload.event) {
        case 'update':
          dispatch(UserUpdated(payload));
          break;
        case 'delete':
          dispatch(UserDeleted(payload));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
