import {
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsResponsePayload,
} from '../types/Objects';
import {
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  AppActions,
  OBJECTS_GET_MEMBERS_ERROR,
  OBJECTS_GET_MEMBERS,
  OBJECTS_GET_MEMBERSHIPS,
  OBJECTS_GET_MEMBERSHIPS_ERROR,
} from '../types/actions';
import { Dispatch } from 'redux';
import { MembershipListInput } from '../types/Membership';

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

const memberListRetrieved = (payload: ObjectsResponsePayload): AppActions => ({
  type: OBJECTS_GET_MEMBERS,
  payload,
});

const membershipsRetrieved = (payload: ObjectsResponsePayload): AppActions => ({
  type: OBJECTS_GET_MEMBERSHIPS,
  payload,
});

const getMembershipsError = (payload: ObjectsStatusPayload): AppActions => ({
  type: OBJECTS_GET_MEMBERSHIPS_ERROR,
  payload,
});

const getMembersError = (payload: ObjectsStatusPayload): AppActions => ({
  type: OBJECTS_GET_MEMBERS_ERROR,
  payload,
});

export const getMembers = (
  pubnub: any,
  spaceId: string,
  options?: MembershipListInput
) => (dispatch: Dispatch) => {
  pubnub.getMembers(
    {
      spaceId,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) dispatch(getMembersError(status));
      else dispatch(memberListRetrieved(response));
    }
  );
};

export const getMemberships = (
  pubnub: any,
  userId: string,
  options?: MembershipListInput
) => (dispatch: Dispatch) => {
  pubnub.getMemberships(
    {
      userId,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) dispatch(getMembershipsError(status));
      else dispatch(membershipsRetrieved(response));
    }
  );
};

export const createMembershipActionListener = (
  dispatch: Dispatch<AppActions>
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
