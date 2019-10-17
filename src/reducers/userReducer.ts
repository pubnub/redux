import {
  OBJECTS_FETCH_USERS,
  OBJECTS_FETCH_USERS_ERROR,
  OBJECTS_UPDATE_USER,
  UserListenerActions,
  UserUpdatedAction,
  UserDeletedAction,
  OBJECTS_FETCH_USER_BY_ID_ERROR,
  OBJECTS_FETCH_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_DELETE_USER,
  OBJECTS_CREATE_USER,
  UserActions,
  UserCreatedAction,
  UserListRetrievedAction,
  FetchUserByIdAction,
} from '../types/actions';
import { User } from '../types/User';

let initialState = {};

interface UserState {
  [key: string]: User;
}

const createUser = (
  state: UserState = initialState,
  action: UserCreatedAction
) => {
  let newState: UserState = { ...state };

  newState[action.payload.id] = action.payload;

  return newState;
};

const updateUser = (
  state: UserState = initialState,
  action: UserUpdatedAction
) => {
  let newState: UserState = { ...state };

  newState[action.payload.id] = action.payload;

  return newState;
};

const deleteUser = (
  state: UserState = initialState,
  action: UserDeletedAction
) => {
  let newState: UserState = { ...state };

  delete newState[action.payload.id];

  return newState;
};

const addUsers = (
  state: UserState = initialState,
  action: UserListRetrievedAction
) => {
  let newState: UserState = { ...state };

  action.payload.forEach((user: User) => {
    newState[user.id] = user;
  });

  return newState;
};

const addUser = (
  state: UserState = initialState,
  action: FetchUserByIdAction
) => {
  let newState: UserState = { ...state };

  newState[action.payload.id] = action.payload;

  return newState;
};

export const userReducer = (
  state = initialState,
  action: UserActions | UserListenerActions
) => {
  switch (action.type) {
    case OBJECTS_CREATE_USER:
      return createUser(state, action);
    case OBJECTS_CREATE_USER_ERROR:
      return {
        ...state,
        error: 'Error while trying to create an user',
      };
    case OBJECTS_DELETE_USER:
      return deleteUser(state, action);
    case OBJECTS_FETCH_USERS:
      return addUsers(state, action);
    case OBJECTS_FETCH_USER_BY_ID:
      return addUser(state, action);
    case OBJECTS_FETCH_USERS_ERROR:
    case OBJECTS_FETCH_USER_BY_ID_ERROR:
      return {
        ...state,
        error: 'Error while trying to retrieve user(s)',
      };
    case OBJECTS_UPDATE_USER:
      return updateUser(state, action);
    default:
      return state;
  }
};
