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
import {
  MembershipList,
  MembershipResult,
  Membership,
} from '../api/Membership';
import {
  beginObjectById,
  successObjectById,
  errorObjectById,
} from './reducerUtil';

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
  console.log('user added to space', JSON.stringify(payload));
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
) => beginObjectById(state, payload);

const fetchMemberships = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembershipResult>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.spaces as T,
    },
    payload.data.id
  );

const fetchMembershipsError = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<MembershipResult>
) =>
  errorObjectById<T>(
    state,
    {
      code: payload.code,
      message: payload.message,
      data: {
        id: payload.data.id,
      },
    },
    payload.data.id
  );

const beginUpdateMembership = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const updateMembership = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Membership>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.spaces as T,
    },
    payload.data.userId
  );

const updateMembershipError = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginJoinSpaces = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const joinSpaces = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Membership>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.spaces as T,
    },
    payload.data.userId
  );

const joinSpacesError = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginLeaveSpaces = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: string
): PubNubObjectApiState<T> => beginObjectById<T>(state, payload);

const leaveSpaces = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<Membership>
) =>
  successObjectById<T>(
    state,
    {
      data: payload.data.spaces as T,
    },
    payload.data.userId
  );

const leaveSpacesError = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

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
      return userRemovedFromSpace<T>(state, action.payload);
    case actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembershipUpdatedOnSpace<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN:
      return beginFetchMemberships<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS:
      return fetchMemberships<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR:
      return fetchMembershipsError<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN:
      return beginUpdateMembership<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_MEMBERSHIP:
      return updateMembership(state, action.payload);
    case actionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR:
      return updateMembershipError<T>(state, action.payload);
    case actionType.OBJECTS_JOIN_SPACES_BEGIN:
      return beginJoinSpaces<T>(state, action.payload);
    case actionType.OBJECTS_SPACES_JOINED:
      return joinSpaces(state, action.payload);
    case actionType.OBJECTS_JOIN_SPACES_ERROR:
      return joinSpacesError<T>(state, action.payload);
    case actionType.OBJECTS_LEAVE_SPACES_BEGIN:
      return beginLeaveSpaces<T>(state, action.payload);
    case actionType.OBJECTS_SPACES_LEFT:
      return leaveSpaces(state, action.payload);
    case actionType.OBJECTS_LEAVE_SPACES_ERROR:
      return leaveSpacesError<T>(state, action.payload);
    default:
      return state;
  }
};
