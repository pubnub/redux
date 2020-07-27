import {
  AllUserDataRetrievedAction,
  FetchUserDataSuccess,
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
  payload: FetchUserDataSuccess<UserCustom>
) => ({ uuids: payload.response.data.map((uuid) => uuid.id) });

export const createUsersListReducer = <
  UserCustom extends ObjectsCustom = ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>() => (
  state: UsersListState = createInitialState(),
  action: AllUserDataRetrievedAction<UserCustom, Meta>
): UsersListState => {
  switch (action.type) {
    case UserDataActionType.ALL_USER_DATA_RETRIEVED:
      return allUserDataRetrieved(action.payload);
    default:
      return state;
  }
};
