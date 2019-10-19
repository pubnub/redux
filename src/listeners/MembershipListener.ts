import { Dispatch } from 'redux';
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
import { PubNubObjectApiSuccess, MembershipInfo } from '../types/PubNubApi';

export const userMembershipUpdatedOnSpace = <T extends MembershipInfo>(
  payload: PubNubObjectApiSuccess<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = <T extends MembershipInfo>(
  payload: PubNubObjectApiSuccess<T>
): UserAddedToSpaceAction<T> => ({
  type: OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = <T extends MembershipInfo>(
  payload: PubNubObjectApiSuccess<T>
): UserRemovedFromSpaceAction<T> => ({
  type: OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});

export const createMembershipActionListener = <T extends MembershipInfo>(
  dispatch: Dispatch<MembershipListenerActions<T>>
) => ({
  membership: (payload: ObjectsActionPayload<T>) => {
    let result = {
      id: payload.data.userId + '_' + payload.data.spaceId,
      data: payload.data,
    };
    switch (payload.event) {
      case 'create':
        dispatch(userAddedToSpace(result));
        break;
      case 'update':
        dispatch(userMembershipUpdatedOnSpace(result));
        break;
      case 'delete':
        dispatch(userRemovedFromSpace(result));
        break;
      default:
        break;
    }
  },
});
