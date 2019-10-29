import {
  UserActions,
  UserListenerActions,
  MembersActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
  ItemMap,
} from 'api/PubNubApi';
import {
  beginObjectById,
  errorObjectById,
  successObjectById,
  successDeleteObjectById,
  successObjectList,
} from 'utilities/reducerUtil';
import { MembersResult, MembersList } from 'api/Member';

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
) => successObjectById<T>(state, payload, payload.data.id);

const createUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginUpdateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);

const updateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);

const updateUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const beginDeleteUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const deleteUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload.data.id);

const deleteUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const fetchUsers = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ItemMap<T>>
) => successObjectList<T>(state, payload);

const beginFetchUserById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const fetchUserById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);

const fetchUserError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);

const fetchMembers = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembersResult>
) => {
  let newState = state;

  if (payload.data.users.length > 0) {
    for (let i = 0; i < payload.data.users.length; i++) {
      let currentUser = payload.data.users[i].user;

      if (currentUser !== undefined) {
        newState = successObjectById<T>(
          newState,
          {
            data: (currentUser as unknown) as T,
          },
          currentUser.id
        );
      }
    }
  }

  return newState;
};

export const createUserReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action: UserActions<T> | UserListenerActions<T> | MembersActions<MembersList>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.OBJECTS_CREATE_USER_BEGIN:
      return beginCreateUser<T>(state, action.payload);
    case ActionType.OBJECTS_CREATE_USER:
      return createUser<T>(state, action.payload);
    case ActionType.OBJECTS_CREATE_USER_ERROR:
      return createUserError<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_USER_BEGIN:
      return beginUpdateUser<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_USER:
      return updateUser<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_USER_ERROR:
      return updateUserError<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_USER_BEGIN:
      return beginDeleteUser<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_USER:
      return deleteUser<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_USER_ERROR:
      return deleteUserError<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_USERS_BEGIN:
      // nothing to do here
      // loading multiples will be tracked in userListReducer
      return state;
    case ActionType.OBJECTS_FETCH_USERS:
      return fetchUsers<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_USERS_ERROR:
      // nothing to do here
      // loading multiples will be tracked in userListReducer
      return state;
    case ActionType.OBJECTS_FETCH_USER_BY_ID_BEGIN:
      return beginFetchUserById<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_USER_BY_ID:
      return fetchUserById<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_USER_BY_ID_ERROR:
      return fetchUserError<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERS:
      return fetchMembers<T>(state, action.payload);
    default:
      return state;
  }
};
