import { MembershipListenerActions, MembersActions } from 'actions/actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  ListenerEventData,
  PubNubObjectApiError,
} from 'api/PubNubApi';
import { MembersList, MembersResult, Members } from 'api/Member';
import {
  errorObjectById,
  successObjectById,
  beginObjectById,
} from 'utilities/reducerUtil';

let createInitialState = <T extends MembersList>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
  loadingById: {},
  errorById: {},
});

const userAddedToSpace = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...newState.byId[key]] as unknown) as T;
  });

  let currentValue = newState.byId[payload.data.userId];

  if (currentValue === undefined) {
    newState.byId[payload.data.userId] = ([
      { id: payload.data.spaceId },
    ] as unknown) as T;
  } else if (
    currentValue.filter((item) => item.id === payload.data.spaceId).length === 0
  ) {
    currentValue.push({ id: payload.data.spaceId });
  }

  return newState;
};

const userRemovedFromSpace = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  let currentValue = newState.byId[payload.data.userId];

  if (currentValue !== undefined) {
    newState.byId[payload.data.userId] = (newState.byId[
      payload.data.userId
    ].filter((item) => item.id !== payload.data.spaceId) as unknown) as T;
  }
  return newState;
};

const userMembersUpdatedOnSpace = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  let currentValue = newState.byId[payload.data.userId];

  if (currentValue !== undefined) {
    let existing = newState.byId[payload.data.userId].filter(
      (item) => item.id === payload.data.spaceId
    );

    if (existing.length > 0) {
      // existing[0];
      // update the custom properties on existing
    }
  }

  return newState;
};

const beginFetchMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: string
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  // increment loading count or set to 1
  newState.loadingById[payload] =
    newState.loadingById[payload] !== undefined
      ? newState.loadingById[payload] + 1
      : 1;

  // clear error
  delete newState.errorById[payload];

  return newState;
};

const fetchMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembersResult>
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  let id = payload.data.id;

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // set response payload
  newState.byId[id] = ([...payload.data.users] as unknown) as T;

  return newState;
};

const fetchMembersError = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => {
  let newState = {
    byId: { ...state.byId },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  if (payload.data.id) {
    let id = payload.data.id;

    // decrement loading count or set to 0
    newState.loadingById[id] =
      newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

    // set error payload
    newState.errorById[id] = payload;
  }

  return newState;
};

const beginUpdateMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const updateMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Members>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.users as T,
    },
    payload.data.spaceId
  );

const updateMembersError = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginAddMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const addMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Members>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.users as T,
    },
    payload.data.spaceId
  );

const addMembersError = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginRemoveMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const removeMembers = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Members>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.users as T,
    },
    payload.data.spaceId
  );

const removeMembersError = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

export const createMembersReducer = <T extends MembersList = MembersList>() => (
  state = createInitialState<T>(),
  action: MembersActions<T> | MembershipListenerActions<ListenerEventData>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace<T>(state, action.payload);
    case ActionType.OBJECTS_USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace<T>(state, action.payload);
    case ActionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembersUpdatedOnSpace<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERS_BEGIN:
      return beginFetchMembers<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERS:
      return fetchMembers<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERS_ERROR:
      return fetchMembersError<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_MEMBERS_BEGIN:
      return beginUpdateMembers<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_MEMBERS:
      return updateMembers(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    case ActionType.OBJECTS_UPDATE_MEMBERS_ERROR:
      return updateMembersError<T>(state, action.payload);
    case ActionType.OBJECTS_ADD_MEMBERS_BEGIN:
      return beginAddMembers<T>(state, (action.payload as unknown) as string);
    case ActionType.OBJECTS_MEMBERS_ADDED:
      return addMembers(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    case ActionType.OBJECTS_ADD_MEMBERS_ERROR:
      return addMembersError<T>(state, action.payload);
    case ActionType.OBJECTS_REMOVE_MEMBERS_BEGIN:
      return beginRemoveMembers<T>(
        state,
        (action.payload as unknown) as string
      );
    case ActionType.OBJECTS_MEMBERS_REMOVED:
      return removeMembers(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    case ActionType.OBJECTS_REMOVE_MEMBERS_ERROR:
      return removeMembersError<T>(state, action.payload);
    default:
      return state;
  }
};

//   | UpdateMembersBeginAction<T>
//   | MembersUpdatedAction<T>
//   | UpdateMembersErrorAction<T>

//   | JoinSpacesBeginAction<T>
//   | SpacesJoinedAction<T>
//   | JoinSpacesErrorAction<T>

//   | LeaveSpacesBeginAction<T>
//   | SpacesLeftAction<T>
//   | LeaveSpacesErrorAction<T>;
