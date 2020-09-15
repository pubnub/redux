import {
  AllUserDataRetrievedAction,
  FetchAllUserDataSuccess,
} from './UserDataActions';
import { UserDataActionType } from './UserDataActionType.enum';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

interface UsersListState {
  uuids: string[];
}

const createInitialState = (): UsersListState => ({
  uuids: [],
});

const allUserDataRetrieved = <UserCustom extends ObjectsCustom>(
  state: UsersListState,
  payload: FetchAllUserDataSuccess<UserCustom>
) => {
  if (
    payload.request.page &&
    (payload.request.page.next || payload.request.page.prev)
  ) {
    // append and deduplicate
    return {
      uuids: [
        ...state.uuids,
        ...payload.response.data
          .map((user) => user.id)
          .filter((id) => state.uuids.indexOf(id) === -1),
      ],
    };
  } else {
    // reset if pagination was not used
    return {
      uuids: payload.response.data.map((user) => user.id),
    };
  }
};

export const createUsersListReducer = <
  UserCustom extends ObjectsCustom = ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>() => (
  state: UsersListState = createInitialState(),
  action: AllUserDataRetrievedAction<UserCustom, Meta>
): UsersListState => {
  switch (action.type) {
    case UserDataActionType.ALL_USER_DATA_RETRIEVED:
      return allUserDataRetrieved(state, action.payload);
    default:
      return state;
  }
};
