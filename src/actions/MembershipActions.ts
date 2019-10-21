import { Dispatch } from 'redux';
import { ObjectsActionPayload, ObjectsResponsePayload } from '../api/Objects';
import {
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  FetchMembershipsAction,
  FetchMembershipsBeginAction,
  UpdateMembershipBeginAction,
  UpdateMembershipErrorAction,
  MembershipUpdatedAction,
  JoinSpacesBeginAction,
  SpacesJoinedAction,
  JoinSpacesErrorAction,
  LeaveSpacesBeginAction,
  SpacesLeftAction,
  LeaveSpacesErrorAction,
  FetchMembershipsErrorAction,
} from './Actions';
import { actionType } from './ActionType.enum';
import {
  Identifiable,
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../api/PubNubApi';
import {
  MembershipList,
  MembershipResult,
  Membership,
  MembershipOptions,
} from '../api/Membership';

export const userMembershipUpdatedOnSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserAddedToSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = <T extends Identifiable>(
  payload: ObjectsActionPayload<T>
): UserRemovedFromSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});

export const fetchMembershipsBegin = (
  payload: string
): FetchMembershipsBeginAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN,
  payload,
});

const membershipsRetrieved = (
  payload: PubNubObjectApiSuccess<MembershipResult>
): FetchMembershipsAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS,
  payload,
});

const fetchMembershipsError = <T>(
  payload: PubNubObjectApiError<T>
): FetchMembershipsErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  payload,
});

export const updateMembershipBegin = <T>(
  payload: T
): UpdateMembershipBeginAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN,
  payload,
});

export const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembershipUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP,
  payload,
});

export const updateMembershipError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateMembershipErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR,
  payload,
});

export const joinSpacesBegin = <T>(payload: T): JoinSpacesBeginAction<T> => ({
  type: actionType.OBJECTS_JOIN_SPACES_BEGIN,
  payload,
});

export const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesJoinedAction<T> => ({
  type: actionType.OBJECTS_SPACES_JOINED,
  payload,
});

export const joinSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): JoinSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_JOIN_SPACES_ERROR,
  payload,
});

export const leaveSpacesBegin = <T>(payload: T): LeaveSpacesBeginAction<T> => ({
  type: actionType.OBJECTS_LEAVE_SPACES_BEGIN,
  payload,
});

export const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesLeftAction<T> => ({
  type: actionType.OBJECTS_SPACES_LEFT,
  payload,
});

export const leaveSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): LeaveSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_LEAVE_SPACES_ERROR,
  payload,
});

export const fetchMemberships = (
  pubnub: any,
  userId: string,
  options: MembershipOptions = {}
) => (dispatch: Dispatch) => {
  dispatch(fetchMembershipsBegin(userId));

  pubnub.getMemberships(
    {
      userId,
      ...options,
    },
    (status: PubNubApiStatus, response: { data: MembershipList }) => {
      if (status.error) {
        let errorData = { id: userId };

        dispatch(
          fetchMembershipsError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        let result = {
          id: userId,
          spaces: response.data,
        };
        dispatch(membershipsRetrieved({ data: result }));
      }
    }
  );
};

export const updateMembership = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(updateMembershipBegin(membership));

  pubnub.updateMembership(
    {
      ...membership,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          updateMembershipError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membershipUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};

export const joinSpaces = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(joinSpacesBegin(membership));

  pubnub.joinSpaces(
    {
      ...membership,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          joinSpacesError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spacesJoined({
            data: response.data,
          })
        );
      }
    }
  );
};

export const leaveSpaces = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(leaveSpacesBegin(membership));

  pubnub.leaveSpaces(
    {
      ...membership,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          leaveSpacesError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spacesLeft({
            data: response.data,
          })
        );
      }
    }
  );
};
