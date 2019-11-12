import {
  UsersRetrievedAction,
  User,
  FetchUsersSuccess,
  AnyUser,
} from './UserActions';
import { UserActionType } from './UserActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';

// tag::RDX-049[]
interface UserListState {
  userIds: string[];
}
// end::RDX-049[]

// tag::RDX-050[]
const createInitialState = (): UserListState => ({
  userIds: [],
});
// end::RDX-050[]

// tag::RDX-052[]
const usersRetrieved = <UserType extends User<ObjectsCustom>>(
  payload: FetchUsersSuccess<UserType>
) => ({ userIds: payload.response.data.map((user) => user.id) });
// end::RDX-052[]

export const createUserListReducer = <
  UserType extends User<ObjectsCustom> = AnyUser,
  Meta extends ActionMeta = never
>() => (
  state: UserListState = createInitialState(),
  action: UsersRetrievedAction<UserType, Meta>
): UserListState => {
  switch (action.type) {
    case UserActionType.USERS_RETRIEVED:
      return usersRetrieved(action.payload);
    default:
      return state;
  }
};
