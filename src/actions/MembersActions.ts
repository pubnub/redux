import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../api/Objects';
import {
  RemoveMembersErrorAction,
  MembersRemovedAction,
  RemoveMembersBeginAction,
  AddMembersErrorAction,
  MembersAddedAction,
  AddMembersBeginAction,
  FetchMembersBeginAction,
  FetchMembersAction,
  FetchMembersErrorAction,
  UpdateMembersBeginAction,
  UpdateMembersErrorAction,
  MembersUpdatedAction,
} from './Actions';
import { actionType } from './ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../api/PubNubApi';
import {
  MembersList,
  MembersResult,
  Members,
  MembersOptions,
} from '../api/Member';

export const fetchMembersBegin = (
  payload: string
): FetchMembersBeginAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERS_BEGIN,
  payload,
});

const membersRetrieved = (
  payload: PubNubObjectApiSuccess<MembersResult>
): FetchMembersAction => ({
  type: actionType.OBJECTS_FETCH_MEMBERS,
  payload,
});

const fetchMembersError = <T>(
  payload: PubNubObjectApiError<T>
): FetchMembersErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_MEMBERS_ERROR,
  payload,
});

export const updateMembersBegin = (
  payload: string
): UpdateMembersBeginAction => ({
  type: actionType.OBJECTS_UPDATE_MEMBERS_BEGIN,
  payload,
});

export const membersUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERS,
  payload,
});

export const updateMembersError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateMembersErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_MEMBERS_ERROR,
  payload,
});

export const addMembersBegin = <T>(payload: T): AddMembersBeginAction<T> => ({
  type: actionType.OBJECTS_ADD_MEMBERS_BEGIN,
  payload,
});

export const membersAdded = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersAddedAction<T> => ({
  type: actionType.OBJECTS_MEMBERS_ADDED,
  payload,
});

export const addMembersError = <T>(
  payload: PubNubObjectApiError<T>
): AddMembersErrorAction<T> => ({
  type: actionType.OBJECTS_ADD_MEMBERS_ERROR,
  payload,
});

export const removeMembersBegin = <T>(
  payload: T
): RemoveMembersBeginAction<T> => ({
  type: actionType.OBJECTS_REMOVE_MEMBERS_BEGIN,
  payload,
});

export const membersRemoved = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersRemovedAction<T> => ({
  type: actionType.OBJECTS_MEMBERS_REMOVED,
  payload,
});

export const removeMembersError = <T>(
  payload: PubNubObjectApiError<T>
): RemoveMembersErrorAction<T> => ({
  type: actionType.OBJECTS_REMOVE_MEMBERS_ERROR,
  payload,
});

export const fetchMembers = (
  pubnub: any,
  spaceId: string,
  options: MembersOptions = {}
) => (dispatch: Dispatch) => {
  dispatch(fetchMembersBegin(spaceId));

  pubnub.getMembers(
    {
      spaceId,
      ...options,
    },
    (status: PubNubApiStatus, response: { data: MembersList }) => {
      if (status.error) {
        let errorData = { id: spaceId };

        dispatch(
          fetchMembersError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        let result = {
          id: spaceId,
          users: response.data,
        };
        dispatch(membersRetrieved({ data: result }));
      }
    }
  );
};

export const updateMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(updateMembersBegin(members.spaceId));

  pubnub.updateMembers(
    {
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          updateMembersError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};

export const addMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(addMembersBegin(members));

  pubnub.addMembers(
    {
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          addMembersError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersAdded({
            data: response.data,
          })
        );
      }
    }
  );
};

export const removeMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(removeMembersBegin(members));

  pubnub.removeMembers(
    {
      spaceId: members.spaceId,
      users: members.users.map((user) => user.id),
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: members.spaceId, value: { ...members } };

        dispatch(
          removeMembersError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membersRemoved({
            data: response.data,
          })
        );
      }
    }
  );
};
