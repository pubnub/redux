import { Dispatch } from 'redux';
import { ObjectsListInput, ObjectsResponsePayload } from '../types/Objects';
import {
  OBJECTS_REMOVE_MEMBERS_ERROR,
  OBJECTS_MEMBERS_REMOVED,
  OBJECTS_REMOVE_MEMBERS_BEGIN,
  OBJECTS_ADD_MEMBERS_ERROR,
  OBJECTS_MEMBERS_ADDED,
  OBJECTS_ADD_MEMBERS_BEGIN,
  OBJECTS_FETCH_MEMBERS_BEGIN,
  OBJECTS_FETCH_MEMBERS,
  OBJECTS_UPDATE_MEMBERS_BEGIN,
  OBJECTS_UPDATE_MEMBERS,
  OBJECTS_UPDATE_MEMBERS_ERROR,
  OBJECTS_FETCH_MEMBERS_ERROR,
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
} from '../types/actions';
import {
  Identifiable,
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
} from '../types/PubNubApi';
import { MembersList, MembersResult, Members } from '../types/Member';

export const fetchMembersBegin = (payload: {
  label: string;
}): FetchMembersBeginAction => ({
  type: OBJECTS_FETCH_MEMBERS_BEGIN,
  payload,
});

const membersRetrieved = (payload: MembersResult): FetchMembersAction => ({
  type: OBJECTS_FETCH_MEMBERS,
  payload,
});

const fetchMembersError = (
  payload: PubNubObjectApiError
): FetchMembersErrorAction => ({
  type: OBJECTS_FETCH_MEMBERS_ERROR,
  payload,
});

export const updateMembersBegin = <T>(
  payload: T
): UpdateMembersBeginAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERS_BEGIN,
  payload,
});

export const membersUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERS,
  payload,
});

export const updateMembersError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateMembersErrorAction<T> => ({
  type: OBJECTS_UPDATE_MEMBERS_ERROR,
  payload,
});

export const addMembersBegin = <T>(payload: T): AddMembersBeginAction<T> => ({
  type: OBJECTS_ADD_MEMBERS_BEGIN,
  payload,
});

export const membersAdded = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersAddedAction<T> => ({
  type: OBJECTS_MEMBERS_ADDED,
  payload,
});

export const addMembersError = <T>(
  payload: PubNubObjectApiError<T>
): AddMembersErrorAction<T> => ({
  type: OBJECTS_ADD_MEMBERS_ERROR,
  payload,
});

export const removeMembersBegin = <T>(
  payload: T
): RemoveMembersBeginAction<T> => ({
  type: OBJECTS_REMOVE_MEMBERS_BEGIN,
  payload,
});

export const membersRemoved = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembersRemovedAction<T> => ({
  type: OBJECTS_MEMBERS_REMOVED,
  payload,
});

export const removeMembersError = <T>(
  payload: PubNubObjectApiError<T>
): RemoveMembersErrorAction<T> => ({
  type: OBJECTS_REMOVE_MEMBERS_ERROR,
  payload,
});

export const fetchMembers = (
  pubnub: any,
  spaceId: string,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchMembersBegin({ label: label }));

  pubnub.getMembers(
    {
      spaceId,
      ...options,
    },
    (status: PubNubApiStatus, response: MembersList) => {
      if (status.error) {
        dispatch(
          fetchMembersError({
            code: status.category,
            message: status.errorData,
            data: { id: spaceId },
          })
        );
      } else {
        let result = {
          id: spaceId,
          spaces: response,
        };
        dispatch(membersRetrieved(result));
      }
    }
  );
};

export const updateMembers = (pubnub: any, members: Members) => (
  dispatch: Dispatch
) => {
  dispatch(updateMembersBegin(members));

  pubnub.updateMembers(
    {
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          updateMembersError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...members },
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
        dispatch(
          addMembersError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...members },
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
      ...members,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          removeMembersError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...members },
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
