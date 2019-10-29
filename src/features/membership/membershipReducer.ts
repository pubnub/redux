import { MembershipListenerActions, MembershipActions } from 'actions/actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  ListenerEventData,
} from 'api/PubNubApi';
import { MembershipList, MembershipResult, Membership } from 'api/Membership';
import { successObjectById } from 'utilities/reducerUtil';

let createInitialState = <T extends MembershipList>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
});

const userAddedToSpace = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
  let newState = {
    byId: { ...state.byId },
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

const userRemovedFromSpace = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
): PubNubObjectApiState<T> => {
  let newState = {
    byId: { ...state.byId },
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

const userMembershipUpdatedOnSpace = <T extends MembershipList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
): PubNubObjectApiState<T> => {
  let newState = {
    byId: { ...state.byId },
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

export const createMembershipReducer = <
  T extends MembershipList = MembershipList
>() => (
  state = createInitialState<T>(),
  action: MembershipActions<T> | MembershipListenerActions<ListenerEventData>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.USER_ADDED_TO_SPACE:
      return userAddedToSpace<T>(state, action.payload);
    case ActionType.USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace<T>(state, action.payload);
    case ActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembershipUpdatedOnSpace<T>(state, action.payload);
    case ActionType.MEMBERSHIPS_RETRIEVED:
      return fetchMemberships<T>(state, action.payload);
    case ActionType.MEMBERSHIP_UPDATED:
      return updateMembership(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Membership>
      );
    case ActionType.SPACES_JOINED:
      return joinSpaces(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Membership>
      );
    case ActionType.SPACES_LEFT:
      return leaveSpaces(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Membership>
      );
    default:
      return state;
  }
};
