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
const usersRetrieved = <UserType extends User, CustomType>(
  payload: FetchUsersSuccess<UserType, CustomType>,
) => ({ userIds: payload.response.data.map((user) => user.id) });
// end::RDX-052[]

export const createUserListReducer = <UserType extends User, CustomType, MetaType>() => (
  state: UserListState = createInitialState(),
  action:
    | UsersRetrievedAction<UserType, CustomType, MetaType>
): UserListState => {
  switch (action.type) {
    case UserActionType.USERS_RETRIEVED:
      return usersRetrieved<UserType, CustomType>(action.payload);
    default:
      return state;
  }
};
