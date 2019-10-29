import {
  ErrorFetchingUsersAction,
  FetchingUsersAction,
  UsersRetrievedAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { User } from 'api/User';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  ItemMap,
} from 'api/PubNubApi';

// tag::RDX-049[]
export interface UserListState<T> {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError<T>;
}
// end::RDX-049[]

// tag::RDX-050[]
const createInitialState = <T>(): UserListState<T> => ({
  data: [],
  loading: false,
  error: undefined,
});
// end::RDX-050[]

// tag::RDX-051[]
const beginFetchUsers = <T>(state: UserListState<T>) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});
// end::RDX-051[]

// tag::RDX-052[]
const fetchUsers = (payload: PubNubObjectApiSuccess<ItemMap<User>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};
// end::RDX-052[]

// tag::RDX-053[]
const fetchUsersError = <T>(
  state: UserListState<T>,
  payload: PubNubObjectApiError<T>
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});
// end::RDX-053[]

export const createUserListReducer = <T>(label: string = 'all') => (
  state: UserListState<T> = createInitialState(),
  action:
    | UsersRetrievedAction<User>
    | FetchingUsersAction
    | ErrorFetchingUsersAction<T>
): UserListState<T> => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case ActionType.FETCHING_USERS:
        return beginFetchUsers(state);
      case ActionType.USERS_RETRIEVED:
        return fetchUsers(action.payload);
      case ActionType.ERROR_FETCHING_USERS:
        return fetchUsersError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
