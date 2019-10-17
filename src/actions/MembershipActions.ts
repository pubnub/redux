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
  OBJECTS_FETCH_MEMBERS,
  OBJECTS_FETCH_MEMBERSHIPS,
  OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  OBJECTS_FETCH_MEMBERS_ERROR,
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  MembershipListenerActions,
  FetchMembersErrorAction,
  FetchMemershipsErrorAction,
  FetchMembershipsAction,
  FetchMembersAction,
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
): FetchMembersAction => ({
  type: OBJECTS_FETCH_MEMBERS,
  payload,
});

const membershipsRetrieved = (
  payload: ObjectsResponsePayload
): FetchMembershipsAction => ({
  type: OBJECTS_FETCH_MEMBERSHIPS,
  payload,
});

const fetchMembershipsError = (
  payload: ObjectsStatusPayload
): FetchMemershipsErrorAction => ({
  type: OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  payload,
});

const fetchMembersError = (
  payload: ObjectsStatusPayload
): FetchMembersErrorAction => ({
  type: OBJECTS_FETCH_MEMBERS_ERROR,
  payload,
});

export const fetchMembers = (
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
        dispatch(fetchMembersError(status));
      } else {
        dispatch(memberListRetrieved(response));
      }
    }
  );
};

export const fetchMemberships = (
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
        dispatch(fetchMembershipsError(status));
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
