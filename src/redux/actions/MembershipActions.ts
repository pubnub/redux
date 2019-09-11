import { Objects } from '../types/Objects';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const UserMembershipUpdatedOnSpace = (payload: Objects): AppActions => ({
  type: 'pubnub/USER_MEMBERSHIP_UPDATED_ON_SPACE',
  payload,
});

export const UserAddedToSpace = (payload: Objects): AppActions => ({
  type: 'pubnub/USER_ADDED_TO_SPACE',
  payload,
});

export const UserRemovedFromSpace = (payload: Objects): AppActions => ({
  type: 'pubnub/USER_REMOVED_FROM_SPACE',
  payload,
});

export const createMembershipActions = (payload: Objects) => (
  dispatch: Dispatch<AppActions>
) => {
  switch (payload.type) {
    case 'membership':
      switch (payload.event) {
        case 'create':
          dispatch(UserAddedToSpace(payload));
          break;
        case 'update':
          dispatch(UserMembershipUpdatedOnSpace(payload));
          break;
        case 'delete':
          dispatch(UserRemovedFromSpace(payload));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
