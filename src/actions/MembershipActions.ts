import { ObjectsActionPayload } from '../types/Objects';
import {
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  AppActions,
} from '../types/actions';
import { Dispatch } from 'redux';

export const userMembershipUpdatedOnSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = (
  payload: ObjectsActionPayload
): AppActions => ({
  type: OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});

export const createMembershipActionListener = (
  dispatch: Dispatch<AppActions>
) => ({
  membership: (payload: ObjectsActionPayload) => {
    switch (payload.type) {
      case 'membership':
        switch (payload.event) {
          case 'create':
            dispatch(userAddedToSpace(payload));
            break;
          case 'update':
            dispatch(userMembershipUpdatedOnSpace(payload));
            break;
          case 'delete':
            dispatch(userRemovedFromSpace(payload));
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
