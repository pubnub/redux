import {
  OBJECTS_GET_USERS,
  OBJECTS_GET_USERS_ERROR,
  OBJECTS_UPDATE_USER,
  ObjectsActionTypes,
  User_Updated,
  User_Deleted,
  OBJECTS_GET_USER_BY_ID_ERROR,
  OBJECTS_GET_USER_BY_ID,
  OBJECTS_CREATE_USER_ERROR,
  OBJECTS_DELETE_USER,
  OBJECTS_CREATE_USER,
} from '../types/actions';
import { UserInitialState } from '../types/User';

let initialState: UserInitialState = {
  data: [],
  error: '',
  user: {},
};

const updateUser = (state = initialState, action: User_Updated) => {
  let userIndex = state.data.findIndex(
    (user: any) => user.id === action.payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, userIndex),
      action.payload.message.data,
      ...state.data.slice(userIndex + 1),
    ],
  };
};

const deleteUser = (state = initialState, action: User_Deleted) => {
  let userIndex = state.data.findIndex(
    (user: any) => user.id === action.payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, userIndex),
      ...state.data.slice(userIndex + 1),
    ],
  };
};

export const userReducer = (
  state = initialState,
  action: ObjectsActionTypes
) => {
  switch (action.type) {
    case OBJECTS_CREATE_USER:
      return {
        ...state,
        user: action.payload.data,
      };
    case OBJECTS_CREATE_USER_ERROR:
      return {
        ...state,
        error: 'Error while trying to create an user',
      };
    case OBJECTS_DELETE_USER:
      return deleteUser(state, action);
    case OBJECTS_GET_USERS:
      return {
        ...state,
        data: action.payload.data,
      };
    case OBJECTS_GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload.data,
      };
    case OBJECTS_GET_USERS_ERROR:
    case OBJECTS_GET_USER_BY_ID_ERROR:
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
