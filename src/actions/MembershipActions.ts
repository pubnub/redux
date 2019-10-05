import { ObjectsActionPayload } from '../types/Objects';
import {
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  MembershipListenerActions,
} from '../types/actions';
import { Dispatch } from 'redux';

export const userMembershipUpdatedOnSpace = (
  payload: ObjectsActionPayload
): UserMembershipUpdatedOnSpaceAction => ({
  type: OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = (
  payload: ObjectsActionPayload
): UserAddedToSpaceAction => ({
  type: OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = (
  payload: ObjectsActionPayload
): UserRemovedFromSpaceAction => ({
  type: OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});

export const createMembershipActionListener = (
  dispatch: Dispatch<MembershipListenerActions>
) => ({
  membership: (payload: ObjectsActionPayload) => {
    switch (payload.message.event) {
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
  },
});
