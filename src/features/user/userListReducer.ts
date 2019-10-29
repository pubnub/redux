import {
  FetchUsersErrorAction,
  FetchUsersBeginAction,
  UserListRetrievedAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { User } from 'api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  ItemMap,
} from 'api/PubNubApi';

export interface UserListState<T> {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError<T>;
}

const createInitialState = <T>(): UserListState<T> => ({
  data: [],
  loading: false,
  error: undefined,
});

const beginFetchUsers = <T>(state: UserListState<T>) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});

const fetchUsers = (payload: PubNubObjectApiSuccess<ItemMap<User>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};

const fetchUsersError = <T>(
  state: UserListState<T>,
  payload: PubNubObjectApiError<T>
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});

export const createUserListReducer = <T>(label: string = 'all') => (
  state: UserListState<T> = createInitialState(),
  action:
    | UserListRetrievedAction<User>
    | FetchUsersBeginAction
    | FetchUsersErrorAction<T>
): UserListState<T> => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case ActionType.OBJECTS_FETCH_USERS_BEGIN:
        return beginFetchUsers(state);
      case ActionType.OBJECTS_FETCH_USERS:
        return fetchUsers(action.payload);
      case ActionType.OBJECTS_FETCH_USERS_ERROR:
        return fetchUsersError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
