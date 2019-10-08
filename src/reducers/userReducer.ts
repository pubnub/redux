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
import { UserState } from '../types/User';
import { ObjectsActionPayload, ObjectsResponsePayload } from 'types/Objects';

let initialState: UserState = {
  data: [],
  error: '',
  user: {},
};

const createUser = (state: UserState, payload: ObjectsResponsePayload) => ({
  ...state,
  data: [...state.data, payload.data],
});

const updateUser = (state: UserState, payload: ObjectsActionPayload) => {
  let userIndex = state.data.findIndex(
    (user: any) => user.id === payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, userIndex),
      payload.message.data,
      ...state.data.slice(userIndex + 1),
    ],
  };
};

const deleteUser = (state: UserState, payload: ObjectsActionPayload) => {
  let userIndex = state.data.findIndex(
    (user: any) => user.id === payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, userIndex),
      ...state.data.slice(userIndex + 1),
    ],
  };
};

const getUsers = (state: UserState, payload: ObjectsResponsePayload) => ({
  ...state,
  data: payload.data,
});

const getUserById = (state: UserState, payload: ObjectsResponsePayload) => ({
  ...state,
  user: payload.data,
});

export const userReducer = (
  state = initialState,
  action: ObjectsActionTypes
): UserState => {
  switch (action.type) {
    case OBJECTS_CREATE_USER:
      return createUser(state, action.payload);
    case OBJECTS_CREATE_USER_ERROR:
      return {
        ...state,
        error: 'Error while trying to create an user',
      };
    case OBJECTS_DELETE_USER:
      return deleteUser(state, action.payload);
    case OBJECTS_GET_USERS:
      return getUsers(state, action.payload);
    case OBJECTS_GET_USER_BY_ID:
      return getUserById(state, action.payload);
    case OBJECTS_GET_USERS_ERROR:
    case OBJECTS_GET_USER_BY_ID_ERROR:
      return {
        ...state,
        error: 'Error while trying to retrieve user(s)',
      };
    case OBJECTS_UPDATE_USER:
      return updateUser(state, action.payload);
    default:
      return state;
  }
};
