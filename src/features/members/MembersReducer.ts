import {
  MembershipListenerActions,
  MembersActions,
} from '../../actions/actions';
import { ActionType } from '../../actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  ListenerEventData,
} from '../../api/PubNubApi';
import { MembersList, MembersResult, Members } from '../../api/Member';
import { successObjectById } from '../../utilities/reducerUtil';

let createInitialState = <T extends MembersList>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
});

const userAddedToSpace = <T extends MembersList>(
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

const userRemovedFromSpace = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
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

const userMembersUpdatedOnSpace = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ListenerEventData>
) => {
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

const membersRetrieved = <T extends MembersList>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembersResult>
) => {
  let newState = {
    byId: { ...state.byId },
  };

  Object.keys(newState.byId).forEach((key) => {
    newState.byId[key] = ([...state.byId[key]] as unknown) as T;
  });

  let id = payload.data.id;

  // set response payload
  newState.byId[id] = ([...payload.data.users] as unknown) as T;

  return newState;
};

const membersUpdated = <T extends MembersList>(
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

const membersAdded = <T extends MembersList>(
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

const membersRemoved = <T extends MembersList>(
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

export const createMembersReducer = <T extends MembersList = MembersList>() => (
  state = createInitialState<T>(),
  action: MembersActions<T> | MembershipListenerActions<ListenerEventData>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.USER_ADDED_TO_SPACE:
      return userAddedToSpace<T>(state, action.payload);
    case ActionType.USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace<T>(state, action.payload);
    case ActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembersUpdatedOnSpace<T>(state, action.payload);
    case ActionType.MEMBERS_RETRIEVED:
      return membersRetrieved<T>(state, action.payload);
    case ActionType.MEMBERS_UPDATED:
      return membersUpdated(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    case ActionType.MEMBERS_ADDED:
      return membersAdded(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    case ActionType.MEMBERS_REMOVED:
      return membersRemoved(
        state,
        (action.payload as unknown) as PubNubObjectApiSuccess<Members>
      );
    default:
      return state;
  }
};
