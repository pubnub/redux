import {
  MembershipListenerActions,
  MembershipActions,
} from '../actions/actions';
import { actionType } from '../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  ListenerEventData,
  PubNubObjectApiError,
} from '../api/PubNubApi';
import { MembershipList, MembershipResult } from '../api/Membership';

let createInitialState = <T extends MembershipList>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
  loadingById: {},
  errorById: {},
});

const userAddedToSpace = <T extends MembershipList>(
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

const userRemovedFromSpace = <T extends MembershipList>(
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

const userMembershipUpdatedOnSpace = <T extends MembershipList>(
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

const beginFetchMemberships = <T extends MembershipList>(
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

const fetchMemberships = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembershipResult>
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
  newState.byId[id] = ([...payload.data.spaces] as unknown) as T;

  return newState;
};

const fetchMembershipsError = <T extends MembershipList>(
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

export const createMembershipReducer = <
  T extends MembershipList = MembershipList
>() => (
  state = createInitialState<T>(),
  action: MembershipActions<T> | MembershipListenerActions<ListenerEventData>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case actionType.OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace<T>(state, action.payload);
    case actionType.OBJECTS_USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace(state, action.payload);
    case actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembershipUpdatedOnSpace(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN:
      return beginFetchMemberships(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS:
      return fetchMemberships(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR:
      return fetchMembershipsError(state, action.payload);
    default:
      return state;
  }
};

// export type MembershipListenerActions<T extends Identifiable> =
//   | UserAddedToSpaceAction<T>
//   | UserRemovedFromSpaceAction<T>
//   | UserMembershipUpdatedOnSpaceAction<T>;

// export type MembershipActions<T> =
//   | FetchMembershipsBeginAction
//   | FetchMembershipsAction
//   | FetchMembershipsErrorAction
//   | UpdateMembershipBeginAction<T>
//   | MembershipUpdatedAction<T>
//   | UpdateMembershipErrorAction<T>
//   | JoinSpacesBeginAction<T>
//   | SpacesJoinedAction<T>
//   | JoinSpacesErrorAction<T>
//   | LeaveSpacesBeginAction<T>
//   | SpacesLeftAction<T>
//   | LeaveSpacesErrorAction<T>;
