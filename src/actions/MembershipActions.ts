import { ObjectsActionPayload } from '../types/Objects';
import {
  USER_MEMBERSHIP_UPDATED_ON_SPACE,
  USER_ADDED_TO_SPACE,
  USER_REMOVED_FROM_SPACE,
  AppActions,
} from '../types/actions';
import { Dispatch } from 'redux';

export const UserMembershipUpdatedOnSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const UserAddedToSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: USER_ADDED_TO_SPACE,
  payload,
});

export const UserRemovedFromSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: USER_REMOVED_FROM_SPACE,
  payload,
});

export const createMembershipActionListener = (
  dispatch: Dispatch<AppActions>
) => (payload: ObjectsActionPayload) => {
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
