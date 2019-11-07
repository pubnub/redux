import {
  UsersRetrievedAction,
  User,
  FetchUsersSuccess,
} from './UserActions';
import {
  UserActionType
} from './UserActionType.enum';

// tag::RDX-049[]
interface UserListState {
  userIds: string[];
}
// end::RDX-049[]

// tag::RDX-050[]
const createInitialState = (): UserListState => ({
  userIds: []
});
// end::RDX-050[]

// tag::RDX-052[]
const usersRetrieved = (
  payload: FetchUsersSuccess,
) => ({ userIds: payload.response.data.map((user) => user.id) });
// end::RDX-052[]

export const createUserListReducer = () => (
  state: UserListState = createInitialState(),
  action:
    | UsersRetrievedAction
): UserListState => {
  switch (action.type) {
    case UserActionType.USERS_RETRIEVED:
      return usersRetrieved(action.payload);
    default:
      return state;
  }
};
