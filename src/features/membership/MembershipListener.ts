import { Dispatch } from 'redux';
import {
  MembershipListenerActions,
  UserMembershipUpdatedOnSpaceEventAction,
  MembershipEventMessage,
  UserAddedToSpaceEventAction,
  UserRemovedFromSpaceEventAction,
  Membership,
  AnyMembership,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { Space } from '../space/SpaceActions';

const userMembershipUpdatedOnSpace = <ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>>(
  payload: MembershipEventMessage<ReceivedMembership>,
): UserMembershipUpdatedOnSpaceEventAction<ReceivedMembership> => ({
  type: MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT,
  payload,
});

const userAddedToSpace = <ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>>(
  payload: MembershipEventMessage<ReceivedMembership>,
): UserAddedToSpaceEventAction<ReceivedMembership> => ({
  type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
  payload,
});

const userRemovedFromSpace = <ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>>(
  payload: MembershipEventMessage<ReceivedMembership>,
): UserRemovedFromSpaceEventAction<ReceivedMembership> => ({
  type: MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT,
  payload,
});

export const createMembershipListener = <ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>> = AnyMembership>(
  dispatch: Dispatch<MembershipListenerActions<ReceivedMembership>>
) => ({
  membership: (payload: MembershipEventMessage<ReceivedMembership>) => {
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
