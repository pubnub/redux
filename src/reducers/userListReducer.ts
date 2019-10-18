import {
  OBJECTS_FETCH_USERS,
  OBJECTS_FETCH_USERS_ERROR,
  OBJECTS_FETCH_USERS_BEGIN,
  FetchUsersErrorAction,
  FetchUsersBeginAction,
  UserListRetrievedAction,
} from '../types/actions';
import { User, UserMap } from '../types/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
} from '../types/PubNubApi';

export interface UserListState {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError;
}

const createInitialState = (): UserListState => ({
  data: [],
  loading: false,
  error: undefined,
});

const beginFetchUsers = (state: UserListState) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});

const fetchUsers = (payload: PubNubObjectApiSuccess<UserMap<User>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};

const fetchUsersError = (
  state: UserListState,
  payload: PubNubObjectApiError
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});

export const createUserListReducer = (label: string = 'all') => (
  state: UserListState = createInitialState(),
  action:
    | UserListRetrievedAction<User>
    | FetchUsersBeginAction
    | FetchUsersErrorAction
): UserListState => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case OBJECTS_FETCH_USERS_BEGIN:
        return beginFetchUsers(state);
      case OBJECTS_FETCH_USERS:
        return fetchUsers(action.payload);
      case OBJECTS_FETCH_USERS_ERROR:
        return fetchUsersError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
