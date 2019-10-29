import { Dispatch } from 'redux';
import { ObjectsActionMessage, ObjectsResponsePayload } from 'api/Objects';
import {
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  MembershipsRetrievedAction,
  FetchingMembershipsAction,
  UpdatingMembershipAction,
  ErrorUpdatingMembershipAction,
  MembershipUpdatedAction,
  JoiningSpacesAction,
  SpacesJoinedAction,
  ErrorJoiningSpacesAction,
  LeavingSpacesAction,
  SpacesLeftAction,
  ErrorLeavingSpacesAction,
  ErrorFetchingMembershipsAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  Identifiable,
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';
import {
  MembershipList,
  MembershipResult,
  Membership,
  MembershipOptions,
} from 'api/Membership';

export const userMembershipUpdatedOnSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: ActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

export const userAddedToSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserAddedToSpaceAction<T> => ({
  type: ActionType.USER_ADDED_TO_SPACE,
  payload,
});

export const userRemovedFromSpace = <T extends Identifiable>(
  payload: ObjectsActionMessage<T>
): UserRemovedFromSpaceAction<T> => ({
  type: ActionType.USER_REMOVED_FROM_SPACE,
  payload,
});

export const fetchMembershipsBegin = (
  payload: string
): FetchingMembershipsAction => ({
  type: ActionType.FETCHING_MEMBERSHIPS,
  payload,
});

const membershipsRetrieved = (
  payload: PubNubObjectApiSuccess<MembershipResult>
): MembershipsRetrievedAction => ({
  type: ActionType.MEMBERSHIPS_RETRIEVED,
  payload,
});

const fetchMembershipsError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingMembershipsAction<T> => ({
  type: ActionType.ERROR_FETCHING_MEMBERSHIPS,
  payload,
});

export const updateMembershipBegin = (
  payload: string
): UpdatingMembershipAction => ({
  type: ActionType.UPDATING_MEMBERSHIP,
  payload,
});

export const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembershipUpdatedAction<T> => ({
  type: ActionType.MEMBERSHIP_UPDATED,
  payload,
});

export const updateMembershipError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingMembershipAction<T> => ({
  type: ActionType.ERROR_UPDATING_MEMBERSHIP,
  payload,
});

export const joinSpacesBegin = <T>(payload: T): JoiningSpacesAction<T> => ({
  type: ActionType.JOINING_SPACES,
  payload,
});

export const spacesJoined = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesJoinedAction<T> => ({
  type: ActionType.SPACES_JOINED,
  payload,
});

export const joinSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorJoiningSpacesAction<T> => ({
  type: ActionType.ERROR_JOINING_SPACES,
  payload,
});

export const leaveSpacesBegin = <T>(payload: T): LeavingSpacesAction<T> => ({
  type: ActionType.LEAVING_SPACES,
  payload,
});

export const spacesLeft = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpacesLeftAction<T> => ({
  type: ActionType.SPACES_LEFT,
  payload,
});

export const leaveSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorLeavingSpacesAction<T> => ({
  type: ActionType.ERROR_LEAVING_SPACES,
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
