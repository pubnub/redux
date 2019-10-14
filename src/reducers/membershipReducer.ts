import {
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_GET_MEMBERS,
  OBJECTS_GET_MEMBERS_ERROR,
  OBJECTS_GET_MEMBERSHIPS,
  OBJECTS_GET_MEMBERSHIPS_ERROR,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
  MembershipListenerActions,
  MembershipActions,
} from '../types/actions';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
  ObjectsData,
} from '../types/Objects';

interface MembershipState {
  usersById: {
    byId: Record<string, ObjectsData>;
    allIds: string[];
  };
  spacesById: {
    byId: Record<string, ObjectsData>;
    allIds: string[];
  };
  error: string;
  space: object;
}

let initialState: MembershipState = {
  usersById: {
    byId: {},
    allIds: [],
  },
  spacesById: {
    byId: {},
    allIds: [],
  },
  error: '',
  space: {},
};

const userAddedToSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) =>
  'id' in payload.message.data
    ? {
        ...state,
        usersById: {
          ...state.usersById,
          byId: {
            ...state.usersById.byId,
            [payload.message.data.id]: payload.message.data,
          },
          allIds: [...state.usersById.allIds, payload.message.data.id],
        },
      }
    : state;

const userRemovedFromSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) => {
  const idToDelete = payload.message.data.id;
  const { [idToDelete]: value, ...otherUsers } = state.usersById.byId;
  return {
    ...state,
    usersById: {
      ...state.usersById,
      byId: otherUsers,
      allIds: state.usersById.allIds.filter(
        id => id !== payload.message.data.id
      ),
    },
  };
};

const userMembershipUpdatedOnSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) => ({
  ...state,
  user: payload.message.data,
});

const getMembers = (
  state: MembershipState,
  payload: ObjectsResponsePayload
) => {
  let receivedUsers = initialState;
  if (Array.isArray(payload.data)) {
    payload.data.forEach((user: ObjectsData) => {
      receivedUsers.usersById.byId[user.id] = user;
      receivedUsers.usersById.allIds = receivedUsers.usersById.allIds.concat(
        user.id
      );
    });
  }

  return {
    ...state,
    spacesById: {
      ...state.usersById,
      byId: receivedUsers.usersById.byId,
      allIds: receivedUsers.usersById.allIds,
    },
  };
};

const getMembeberships = (
  state: MembershipState,
  payload: ObjectsResponsePayload
) => {
  let receivedSpaces = initialState;
  if (Array.isArray(payload.data)) {
    payload.data.forEach((space: ObjectsData) => {
      receivedSpaces.spacesById.byId[space.id] = space;
      receivedSpaces.spacesById.allIds = receivedSpaces.spacesById.allIds.concat(
        space.id
      );
    });
  }

  return {
    ...state,
    spacesById: {
      ...state.spacesById,
      byId: receivedSpaces.spacesById.byId,
      allIds: receivedSpaces.spacesById.allIds,
    },
  };
};

const getMemberError = (
  state: MembershipState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error:
    payload.errorData !== undefined
      ? payload.errorData.error.message
      : payload.message,
});

export const membershipReducer = (
  state = initialState,
  action: MembershipActions | MembershipListenerActions
): MembershipState => {
  switch (action.type) {
    case OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace(state, action.payload);
    case OBJECTS_USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace(state, action.payload);
    case OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembershipUpdatedOnSpace(state, action.payload);
    case OBJECTS_GET_MEMBERS:
      return getMembers(state, action.payload);
    case OBJECTS_GET_MEMBERSHIPS:
      return getMembeberships(state, action.payload);
    case OBJECTS_GET_MEMBERSHIPS_ERROR:
    case OBJECTS_GET_MEMBERS_ERROR:
      return getMemberError(state, action.payload);
    default:
      return state;
  }
};
