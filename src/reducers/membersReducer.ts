import { MembershipListenerActions, MembersActions } from '../actions/actions';
import { actionType } from '../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  ListenerEventData,
  PubNubObjectApiError,
} from '../api/PubNubApi';
import { MembersList, MembersResult } from '../api/Member';

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
  let newState = { ...state };

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
  let newState = { ...state };

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
  let newState = { ...state };

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
  let newState = { ...state };

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
  let newState = { ...state };

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
  let newState = { ...state };

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

export const createMembersReducer = <T extends MembersList = MembersList>() => (
  state = createInitialState<T>(),
  action: MembersActions<T> | MembershipListenerActions<ListenerEventData>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case actionType.OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace<T>(state, action.payload);
    case actionType.OBJECTS_USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace(state, action.payload);
    case actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembersUpdatedOnSpace(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERS_BEGIN:
      return beginFetchMembers(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERS:
      return fetchMembers(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERS_ERROR:
      return fetchMembersError(state, action.payload);
    default:
      return state;
  }
};

// export type MembersListenerActions<T extends Identifiable> =
//   | UserAddedToSpaceAction<T>
//   | UserRemovedFromSpaceAction<T>
//   | UserMembersUpdatedOnSpaceAction<T>;

// export type MembersActions<T> =
//   | FetchMemberssBeginAction
//   | FetchMemberssAction
//   | FetchMemberssErrorAction
//   | UpdateMembersBeginAction<T>
//   | MembersUpdatedAction<T>
//   | UpdateMembersErrorAction<T>
//   | JoinSpacesBeginAction<T>
//   | SpacesJoinedAction<T>
//   | JoinSpacesErrorAction<T>
//   | LeaveSpacesBeginAction<T>
//   | SpacesLeftAction<T>
//   | LeaveSpacesErrorAction<T>;
