import { AnyAction } from 'redux';
import {
  SpaceActions,
  SpaceListenerActions,
  Space,
  SpaceEventMessage,
  SpaceSuccess,
  DeleteSpaceSuccess,
  FetchSpacesSuccess,
  FetchSpaceByIdSuccess,
  AnySpace,
} from './SpaceActions';
import { SpaceActionType } from './SpaceActionType.enum';
import {
  MembershipActions,
  FetchMembershipSuccess,
  MembershipRetrievedAction,
  AnyMembership,
  Membership
} from '../membership/MembershipActions';
import { MembershipActionType } from '../../features/membership/MembershipActionType.enum';
import { AnyMeta } from '../../foundations/ActionMeta';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';

// tag::RDX-025[]
export type SpacesByIdState<ReceivedSpace extends Space<ObjectsCustom>> = {
  byId: {
    [spaceId: string]: ReceivedSpace,
  },
};
// end::RDX-025[]

const createInitialState = () => ({
  byId: {},
});

const spaceCreated = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: SpaceSuccess<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const spaceUpdated = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: SpaceSuccess<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const spaceDeleted = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: DeleteSpaceSuccess
) => {
  let newState = {
    byId: { ...state.byId }
  };

  delete newState.byId[payload.request.spaceId];

  return newState;
};

const spacesRetrieved = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: FetchSpacesSuccess<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  payload.response.data.forEach((item) => {
    newState.byId[item.id] = item;
  });

  return newState;
};

const spaceRetrieved = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: FetchSpaceByIdSuccess<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.response.data.id] = payload.response.data;

  return newState;
};

const spaceUpdatedEventReceived = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: SpaceEventMessage<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  newState.byId[payload.data.id] = payload.data;

  return newState;
};

const spaceDeletedEventReceived = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: SpaceEventMessage<ReceivedSpace>,
) => {
  let newState = {
    byId: { ...state.byId }
  };

  delete newState.byId[payload.data.id];

  return newState;
}

const membershipRetrieved = <ReceivedSpace extends Space<ObjectsCustom>>(
  state: SpacesByIdState<ReceivedSpace>,
  payload: FetchMembershipSuccess<Membership<ObjectsCustom, ReceivedSpace>>,
) => {
  let newState = state;

  if (payload.response.data.length > 0) {
    newState = {
      byId: {
        ...state.byId
      }
    };

    for (let i = 0; i < payload.response.data.length; i++) {
      let currentMembership = payload.response.data[i];
      
      if (currentMembership.space) {
        newState.byId[currentMembership.id] = currentMembership.space;
      }
    }
  }

  return newState;
};

type SpaceReducerActions<StoredSpace extends Space<ObjectsCustom>> =
  | SpaceActions<StoredSpace, AnyMeta>
  | SpaceListenerActions<StoredSpace> 
  | MembershipRetrievedAction<AnyMembership, AnyMeta>
  | MembershipActions<Membership<ObjectsCustom, StoredSpace>, AnyMeta>;

export type SpaceReducer<StoredSpace extends Space<ObjectsCustom>, SpaceAction extends AnyAction> = 
  (state: SpacesByIdState<StoredSpace> | undefined, action: SpaceAction)
   => SpacesByIdState<StoredSpace>;

export const createSpaceReducer = <
  StoredSpace extends Space<ObjectsCustom> = AnySpace,
  SpaceAction extends AnyAction = SpaceReducerActions<StoredSpace>,
>(): SpaceReducer<StoredSpace, SpaceAction> => (
  state: SpacesByIdState<StoredSpace> = createInitialState(),
  action: SpaceAction
): SpacesByIdState<StoredSpace> => {
  switch (action.type) {
    case SpaceActionType.SPACE_CREATED:
      return spaceCreated<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACE_UPDATED:
      return spaceUpdated<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACE_DELETED:
      return spaceDeleted<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACES_RETRIEVED:
      return spacesRetrieved<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACE_RETRIEVED:
      return spaceRetrieved<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACE_UPDATED_EVENT:
      return spaceUpdatedEventReceived<StoredSpace>(state, action.payload);
    case SpaceActionType.SPACE_DELETED_EVENT:
      return spaceDeletedEventReceived<StoredSpace>(state, action.payload);
    case MembershipActionType.MEMBERSHIP_RETRIEVED:
      return membershipRetrieved<StoredSpace>(state, action.payload);
    default:
      return state;
  }
};
