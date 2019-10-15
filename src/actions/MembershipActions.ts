import {
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsResponsePayload,
  ObjectsListInput,
} from '../types/Objects';
import {
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  OBJECTS_GET_MEMBERS,
  OBJECTS_GET_MEMBERSHIPS,
  OBJECTS_GET_MEMBERSHIPS_ERROR,
  OBJECTS_GET_MEMBERS_ERROR,
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  MembershipListenerActions,
  GetMembersErrorAction,
  GetMemershipsErrorAction,
  GetMembershipsAction,
  GetMembersAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import { Identifiable } from 'types/PubNubApi';

export const userMembershipUpdatedOnSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserAddedToSpaceAction<T> => ({
  type: OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserRemovedFromSpaceAction<T> => ({
  type: OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});

const memberListRetrieved = (
  payload: ObjectsResponsePayload
): GetMembersAction => ({
  type: OBJECTS_GET_MEMBERS,
  payload,
});

const membershipsRetrieved = (
  payload: ObjectsResponsePayload
): GetMembershipsAction => ({
  type: OBJECTS_GET_MEMBERSHIPS,
  payload,
});

const getMembershipsError = (
  payload: ObjectsStatusPayload
): GetMemershipsErrorAction => ({
  type: OBJECTS_GET_MEMBERSHIPS_ERROR,
  payload,
});

const getMembersError = (
  payload: ObjectsStatusPayload
): GetMembersErrorAction => ({
  type: OBJECTS_GET_MEMBERS_ERROR,
  payload,
});

export const getMembers = (
  pubnub: any,
  spaceId: string,
  options?: ObjectsListInput
) => (dispatch: Dispatch) => {
  pubnub.getMembers(
    {
      spaceId,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getMembersError(status));
      } else {
        dispatch(memberListRetrieved(response));
      }
    }
  );
};

export const getMemberships = (
  pubnub: any,
  userId: string,
  options?: ObjectsListInput
) => (dispatch: Dispatch) => {
  pubnub.getMemberships(
    {
      userId,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getMembershipsError(status));
      } else {
        dispatch(membershipsRetrieved(response));
      }
    }
  );
};

export const createMembershipActionListener = <T extends Identifiable>(
  dispatch: Dispatch<MembershipListenerActions<T>>
) => ({
  membership: (payload: ObjectsActionPayload<T>) => {
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
