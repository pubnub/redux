import { Dispatch } from 'redux';
import {
  ObjectsActionPayload,
  ObjectsListInput,
  ObjectsResponsePayload,
} from '../types/Objects';
import {
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  OBJECTS_FETCH_MEMBERSHIPS,
  OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  OBJECTS_FETCH_MEMBERSHIPS_BEGIN,
  OBJECTS_UPDATE_MEMBERSHIP_BEGIN,
  OBJECTS_UPDATE_MEMBERSHIP_ERROR,
  OBJECTS_UPDATE_MEMBERSHIP,
  OBJECTS_JOIN_SPACES_BEGIN,
  OBJECTS_SPACES_JOINED,
  OBJECTS_JOIN_SPACES_ERROR,
  OBJECTS_LEAVE_SPACES_BEGIN,
  OBJECTS_SPACES_LEFT,
  OBJECTS_LEAVE_SPACES_ERROR,
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
} from '../types/actions';
import {
  Identifiable,
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../types/PubNubApi';
import {
  MembershipList,
  MembershipResult,
  Membership,
} from '../types/Membership';

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

export const fetchMembershipsBegin = (payload: {
  label: string;
}): FetchMembershipsBeginAction => ({
  type: OBJECTS_FETCH_MEMBERSHIPS_BEGIN,
  payload,
});

const membershipsRetrieved = (
  payload: MembershipResult
): FetchMembershipsAction => ({
  type: OBJECTS_FETCH_MEMBERSHIPS,
  payload,
});

const fetchMembershipsError = (
  payload: PubNubObjectApiError
): FetchMembershipsErrorAction => ({
  type: OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  payload,
});

export const updateMembershipBegin = <T>(
  payload: T
): UpdateMembershipBeginAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERSHIP_BEGIN,
  payload,
});

export const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembershipUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERSHIP,
  payload,
});

export const updateMembershipError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateMembershipErrorAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERSHIP_ERROR,
  payload,
});

export const joinSpacesBegin = <T>(payload: T): JoinSpacesBeginAction<T> => ({
  type: OBJECTS_JOIN_SPACES_BEGIN,
  payload,
});

export const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesJoinedAction<T> => ({
  type: OBJECTS_SPACES_JOINED,
  payload,
});

export const joinSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): JoinSpacesErrorAction<T> => ({
  type: OBJECTS_JOIN_SPACES_ERROR,
  payload,
});

export const leaveSpacesBegin = <T>(payload: T): LeaveSpacesBeginAction<T> => ({
  type: OBJECTS_LEAVE_SPACES_BEGIN,
  payload,
});

export const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesLeftAction<T> => ({
  type: OBJECTS_SPACES_LEFT,
  payload,
});

export const leaveSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): LeaveSpacesErrorAction<T> => ({
  type: OBJECTS_LEAVE_SPACES_ERROR,
  payload,
});

export const fetchMemberships = (
  pubnub: any,
  userId: string,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchMembershipsBegin({ label: label }));

  pubnub.getMemberships(
    {
      userId,
      ...options,
    },
    (status: PubNubApiStatus, response: MembershipList) => {
      if (status.error) {
        dispatch(
          fetchMembershipsError({
            code: status.category,
            message: status.errorData,
            data: { id: userId },
          })
        );
      } else {
        let result = {
          id: userId,
          spaces: response,
        };
        dispatch(membershipsRetrieved(result));
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
        dispatch(
          updateMembershipError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...membership },
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
        dispatch(
          joinSpacesError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...membership },
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
        dispatch(
          leaveSpacesError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...membership },
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
