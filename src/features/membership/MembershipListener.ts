import { Dispatch } from 'redux';
import {
  MembershipListenerActions,
  UserMembershipUpdatedOnSpaceEventAction,
  MembershipEventMessage,
  UserAddedToSpaceEventAction,
  UserRemovedFromSpaceEventAction,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';

const userMembershipUpdatedOnSpace = <CustomType>(
  payload: MembershipEventMessage<CustomType>,
): UserMembershipUpdatedOnSpaceEventAction<CustomType> => ({
  type: MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT,
  payload,
});

const userAddedToSpace = <CustomType>(
  payload: MembershipEventMessage<CustomType>,
): UserAddedToSpaceEventAction<CustomType> => ({
  type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
  payload,
});

const userRemovedFromSpace = <CustomType>(
  payload: MembershipEventMessage<CustomType>,
): UserRemovedFromSpaceEventAction<CustomType> => ({
  type: MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT,
  payload,
});

export const createMembershipListener = <CustomType>(
  dispatch: Dispatch<MembershipListenerActions<CustomType>>
) => ({
  membership: (payload: MembershipEventMessage<CustomType>) => {
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
  },
});
