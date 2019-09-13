import { ObjectsActionPayload } from '../types/Objects';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const UserMembershipUpdatedOnSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: 'pubnub/USER_MEMBERSHIP_UPDATED_ON_SPACE',
  payload,
});

export const UserAddedToSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: 'pubnub/USER_ADDED_TO_SPACE',
  payload,
});

export const UserRemovedFromSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: 'pubnub/USER_REMOVED_FROM_SPACE',
  payload,
});

export const createMembershipActions = (payload: ObjectsActionPayload) => (
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
