import {
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
  OBJECTS_UPDATE_USER,
  ObjectsActionTypes,
  OBJECTS_GET_USER_BY_ID_ERROR,
  OBJECTS_GET_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_DELETE_USER,
  OBJECTS_CREATE_USER,
} from '../types/actions';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
  ObjectsData,
} from 'types/Objects';

interface UserState {
  usersById: {
    byId: Record<string, ObjectsData>;
    allIds: string[];
  };
  error: string;
  user: object;
}

let initialState: UserState = {
  usersById: {
    byId: {},
    allIds: [],
  },
  error: '',
  user: {},
};

const createUser = (state: UserState, payload: ObjectsResponsePayload) =>
  'id' in payload.data
    ? {
        ...state,
        usersById: {
          ...state.usersById,
          byId: {
            ...state.usersById.byId,
            [payload.data.id]: payload.data,
          },
          allIds: [...state.usersById.allIds, payload.data.id],
        },
      }
    : state;

const createUserError = (state: UserState, payload: ObjectsStatusPayload) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

const updateUser = (state: UserState, payload: ObjectsActionPayload) => ({
  ...state,
  usersById: {
    ...state.usersById,
    byId: {
      ...state.usersById.byId,
      [payload.message.data.id]: payload.message.data,
    },
  },
});

const deleteUser = (state: UserState, payload: ObjectsActionPayload) => {
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

const getUsers = (state: UserState, payload: ObjectsResponsePayload) => {
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
    usersById: {
      ...state.usersById,
      byId: receivedUsers.usersById.byId,
      allIds: receivedUsers.usersById.allIds,
    },
  };
};

const getUserById = (state: UserState, payload: ObjectsResponsePayload) => ({
  ...state,
  user: payload.data,
});

const getUserError = (state: UserState, payload: ObjectsStatusPayload) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

export const userReducer = (
  state = initialState,
  action: ObjectsActionTypes
): UserState => {
  switch (action.type) {
    case OBJECTS_CREATE_USER:
      return createUser(state, action.payload);
    case OBJECTS_CREATE_USER_ERROR:
      return createUserError(state, action.payload);
    case OBJECTS_DELETE_USER:
      return deleteUser(state, action.payload);
    case OBJECTS_GET_USERS:
      return getUsers(state, action.payload);
    case OBJECTS_GET_USER_BY_ID:
      return getUserById(state, action.payload);
    case OBJECTS_GET_USERS_ERROR:
    case OBJECTS_GET_USER_BY_ID_ERROR:
      return getUserError(state, action.payload);
    case OBJECTS_UPDATE_USER:
      return updateUser(state, action.payload);
    default:
      return state;
  }
};
