import { UsersRetrievedAction, User, FetchUsersSuccess } from './UserActions';
import { UserActionType } from './UserActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta, AnyMeta } from '../../foundations/ActionMeta';

// tag::RDX-state-userlist[]
interface UserListState {
  userIds: string[];
}
// end::RDX-state-userlist[]

const createInitialState = (): UserListState => ({
  userIds: [],
});

const usersRetrieved = <UserType extends User<ObjectsCustom>>(
  payload: FetchUsersSuccess<UserType>
) => ({ userIds: payload.response.data.map((user) => user.id) });

// tag::RDX-method-reducer-userlist[]
export const createUserListReducer = <
  UserType extends User<ObjectsCustom> = User,
  Meta extends ActionMeta = AnyMeta
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
// end::RDX-method-reducer-userlist[]
