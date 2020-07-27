import { AnyAction } from 'redux';
import {
  UserDataActions,
  UserDataListenerActions,
  UserDataSuccess,
  DeleteUserDataSuccess,
  FetchUserDataSuccess,
  FetchUserDataByIdSuccess,
  UserData,
  UserDataEventMessage,
  SetUserDataEventMessage,
} from './UserDataActions';
import { UserDataActionType } from './UserDataActionType.enum';
import {
  ChannelMembersActions,
  FetchChannelMembersSuccess,
} from 'features/members/ChannelMembersActions';
import { MembershipActions } from 'features/membership/MembershipActions';
import { ChannelMembersActionType } from '../members/ChannelMembersActionType.enum';
import { AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom, GetUserCustom } from 'foundations/ObjectsCustom';

export interface UserDataByIdState<UserDataType extends UserData> {
  byId: {
    [uuid: string]: UserDataType;
  };
}

const createInitialState = () => ({
  byId: {},
});

const UserDataSet = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: UserDataSuccess<GetUserCustom<UserDataType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  // partial update
  newState.byId[payload.response.data.id] = {
    ...state.byId[payload.response.data.id],
    ...payload.response.data,
  };

  return newState;
};

const UserDataRemoved = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: DeleteUserDataSuccess
) => {
  const newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.request.uuid];

  return newState;
};

const allUserDataRetrieved = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: FetchUserDataSuccess<GetUserCustom<UserDataType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  payload.response.data.forEach((item) => {
    newState.byId[item.id] = (item as unknown) as UserDataType;
  });

  return newState;
};

const UserDataRetrieved = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: FetchUserDataByIdSuccess<GetUserCustom<UserDataType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  newState.byId[payload.response.data.id] = (payload.response
    .data as unknown) as UserDataType;

  return newState;
};

const UserDataSetEventReceived = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: SetUserDataEventMessage<GetUserCustom<UserDataType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  // partial update
  newState.byId[payload.data.id] = {
    ...state.byId[payload.data.id],
    ...payload.data,
  };

  return newState;
};

const UserDataRemovedEventReceived = <UserDataType extends UserData>(
  state: UserDataByIdState<UserDataType>,
  payload: UserDataEventMessage<GetUserCustom<UserDataType>>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  delete newState.byId[payload.data.id];

  return newState;
};

const membersRetrieved = <
  UserDataType extends UserData,
  MembershipCustom extends ObjectsCustom
>(
  state: UserDataByIdState<UserDataType>,
  payload: FetchChannelMembersSuccess<
    MembershipCustom,
    GetUserCustom<UserDataType>
  >
) => {
  let newState = state;

  if (payload.response.data.length > 0) {
    newState = {
      byId: {
        ...state.byId,
      },
    };

    for (let i = 0; i < payload.response.data.length; i++) {
      const currentMember = payload.response.data[i];

      // important: consumers *must* include UUIDFields for the state to be updated
      if (currentMember.uuid && 'eTag' in currentMember.uuid) {
        newState.byId[
          currentMember.uuid.id
        ] = (currentMember.uuid as unknown) as UserDataType;
      }
    }
  }

  return newState;
};

type UserDataReducerActions<
  UserCustom extends ObjectsCustom,
  MembershipCustom extends ObjectsCustom
> =
  | UserDataActions<UserCustom, AnyMeta>
  | UserDataListenerActions<UserCustom>
  | ChannelMembersActions<UserCustom, MembershipCustom, AnyMeta>
  | MembershipActions<UserCustom, MembershipCustom, AnyMeta>;

export type UserDataReducer<
  UserDataType extends UserData,
  UserDataAction extends AnyAction
> = (
  state: UserDataByIdState<UserDataType> | undefined,
  action: UserDataAction
) => UserDataByIdState<UserDataType>;

export const createUserDataReducer = <
  UserDataType extends UserData = UserData,
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  UserDataAction extends AnyAction = UserDataReducerActions<
    GetUserCustom<UserDataType>,
    MembershipCustom
  >
>(): UserDataReducer<UserDataType, UserDataAction> => (
  state: UserDataByIdState<UserDataType> = createInitialState(),
  action: UserDataAction
): UserDataByIdState<UserDataType> => {
  switch (action.type) {
    case UserDataActionType.USER_DATA_SET:
      return UserDataSet<UserDataType>(state, action.payload);
    case UserDataActionType.USER_DATA_REMOVED:
      return UserDataRemoved<UserDataType>(state, action.payload);
    case UserDataActionType.ALL_USER_DATA_RETRIEVED:
      return allUserDataRetrieved<UserDataType>(state, action.payload);
    case UserDataActionType.USER_DATA_RETRIEVED:
      return UserDataRetrieved<UserDataType>(state, action.payload);
    case UserDataActionType.USER_DATA_SET_EVENT:
      return UserDataSetEventReceived<UserDataType>(state, action.payload);
    case UserDataActionType.USER_DATA_REMOVED_EVENT:
      return UserDataRemovedEventReceived<UserDataType>(state, action.payload);
    case ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED:
      return membersRetrieved<UserDataType, MembershipCustom>(
        state,
        action.payload
      );
    default:
      return state;
  }
};
