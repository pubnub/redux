import { Dispatch } from 'redux';
import { ObjectsActionMessage, ObjectsResponsePayload } from '../api/Objects';
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

// tag::[RED-120]
export const userMembershipUpdatedOnSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});
// end::[RED-120]

// tag::[RED-121]
export const userAddedToSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserAddedToSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_ADDED_TO_SPACE,
  payload,
});
// end::[RED-121]

// tag::[RED-122]
export const userRemovedFromSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserRemovedFromSpaceAction<T> => ({
  type: actionType.OBJECTS_USER_REMOVED_FROM_SPACE,
  payload,
});
// end::[RED-122]

// tag::[RED-123]
export const fetchMembershipsBegin = (
  payload: string
): FetchMembershipsBeginAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN,
  payload,
});
// end::[RED-123]

// tag::[RED-124]
const membershipsRetrieved = (
  payload: PubNubObjectApiSuccess<MembershipResult>
): FetchMembershipsAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS,
  payload,
});
// end::[RED-124]

// tag::[RED-125]
const fetchMembershipsError = <T>(
  payload: PubNubObjectApiError<T>
): FetchMembershipsErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR,
  payload,
});
// end::[RED-125]

// tag::[RED-126]
export const updateMembershipBegin = (
  payload: string
): UpdateMembershipBeginAction => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN,
  payload,
});
// end::[RED-126]

// tag::[RED-127]
export const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembershipUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP,
  payload,
});
// end::[RED-127]

// tag::[RED-128]
export const updateMembershipError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateMembershipErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR,
  payload,
});
// end::[RED-128]

// tag::[RED-129]
export const joinSpacesBegin = <T>(payload: T): JoinSpacesBeginAction<T> => ({
  type: actionType.OBJECTS_JOIN_SPACES_BEGIN,
  payload,
});
// end::[RED-129]

// tag::[RED-130]
export const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesJoinedAction<T> => ({
  type: actionType.OBJECTS_SPACES_JOINED,
  payload,
});
// end::[RED-130]

// tag::[RED-131]
export const joinSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): JoinSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_JOIN_SPACES_ERROR,
  payload,
});
// end::[RED-131]

// tag::[RED-132]
export const leaveSpacesBegin = <T>(payload: T): LeaveSpacesBeginAction<T> => ({
  type: actionType.OBJECTS_LEAVE_SPACES_BEGIN,
  payload,
});
// end::[RED-132]

// tag::[RED-133]
export const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesLeftAction<T> => ({
  type: actionType.OBJECTS_SPACES_LEFT,
  payload,
});
// end::[RED-133]

// tag::[RED-134]
export const leaveSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): LeaveSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_LEAVE_SPACES_ERROR,
  payload,
});
// end::[RED-134]

// tag::[RED-135]
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
// end::[RED-135]

// tag::[RED-136]
export const updateMembership = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(updateMembershipBegin(membership.userId));

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
// end::[RED-136]

// tag::[RED-137]
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
// end::[RED-137]

// tag::[]
export const leaveSpaces = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(leaveSpacesBegin(membership));

  pubnub.leaveSpaces(
    {
      userId: membership.userId,
      spaces: membership.spaces.map((space) => space.id),
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
// end::[]
