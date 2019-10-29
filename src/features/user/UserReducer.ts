import {
  UserActions,
  UserListenerActions,
  MembersActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  Identifiable,
  ItemMap,
} from 'api/PubNubApi';
import {
  successObjectById,
  successDeleteObjectById,
  successObjectList,
} from 'utilities/reducerUtil';
import { MembersResult, MembersList } from 'api/Member';

// tag::RDX-054[]
const createInitialState = <T extends Identifiable>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
});
// end::RDX-054[]

// tag::RDX-056[]
const createUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-056[]

// tag::RDX-059[]
const updateUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-059[]

// tag::RDX-062[]
const deleteUser = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload.data.id);
// end::RDX-062[]

// tag::RDX-064[]
const fetchUsers = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ItemMap<T>>
) => successObjectList<T>(state, payload);
// end::RDX-064[]

// tag::RDX-066[]
const fetchUserById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-066[]

// tag::RDX-068[]
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
// end::RDX-068[]

export const createUserReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action: UserActions<T> | UserListenerActions<T> | MembersActions<MembersList>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.USER_CREATED:
      return createUser<T>(state, action.payload);
    case ActionType.USER_UPDATED:
      return updateUser<T>(state, action.payload);
    case ActionType.USER_DELETED:
      return deleteUser<T>(state, action.payload);
    case ActionType.USERS_RETRIEVED:
      return fetchUsers<T>(state, action.payload);
    case ActionType.USER_RETRIEVED:
      return fetchUserById<T>(state, action.payload);
    case ActionType.MEMBERS_RETRIEVED:
      return fetchMembers<T>(state, action.payload);
    default:
      return state;
  }
};
