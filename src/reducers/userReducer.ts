import { UserActions, UserListenerActions } from '../actions/Actions';
import { actionType } from '../actions/ActionType.enum';
import { UserMap } from '../api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
} from '../api/PubNubApi';
import {
  beginObjectById,
  errorObjectById,
  successObjectById,
  successDeleteObjectById,
  successObjectList,
} from './reducerUtil';

const createInitialState = <T extends Identifiable>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
  loadingById: {},
  errorById: {},
});

const beginCreateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);

const createUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const createUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const beginUpdateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);

const updateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const updateUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const beginDeleteUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const deleteUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload);

const deleteUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const fetchUsers = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<UserMap<T>>
) => successObjectList<T>(state, payload);

const beginFetchUserById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const fetchUserById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const fetchUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

export const createUserReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action: UserActions<T> | UserListenerActions<T>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case actionType.OBJECTS_CREATE_USER_BEGIN:
      return beginCreateUser<T>(state, action.payload);
    case actionType.OBJECTS_CREATE_USER:
      return createUser<T>(state, action.payload);
    case actionType.OBJECTS_CREATE_USER_ERROR:
      return createUserError<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_USER_BEGIN:
      return beginUpdateUser<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_USER:
      return updateUser<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_USER_ERROR:
      return updateUserError<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_USER_BEGIN:
      return beginDeleteUser<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_USER:
      return deleteUser<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_USER_ERROR:
      return deleteUserError<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_USERS_BEGIN:
      // nothing to do here
      // loading multiples will be tracked in userListReducer
      return state;
    case actionType.OBJECTS_FETCH_USERS:
      return fetchUsers<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_USERS_ERROR:
      // nothing to do here
      // loading multiples will be tracked in userListReducer
      return state;
    case actionType.OBJECTS_FETCH_USER_BY_ID_BEGIN:
      return beginFetchUserById<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_USER_BY_ID:
      return fetchUserById<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_USER_BY_ID_ERROR:
      return fetchUserError<T>(state, action.payload);
    default:
      return state;
  }
};
