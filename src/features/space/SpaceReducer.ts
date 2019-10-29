import {
  SpaceActions,
  SpaceListenerActions,
  MembershipActions,
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
import { MembershipList, MembershipResult } from 'api/Membership';

// tag::RDX-034[]
const createInitialState = <T extends Identifiable>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
});
// end::RDX-034[]

// tag::RDX-036[]
const createSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-036[]

// tag::RDX-039[]
const updateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-039[]

// tag::RDX-042[]
const deleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload.data.id);
// end::RDX-042[]

// tag::RDX-044[]
const fetchSpaces = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ItemMap<T>>
) => successObjectList<T>(state, payload);
// end::RDX-044[]

// tag::RDX-046[]
const fetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-046[]

// tag::RDX-048[]
const fetchMemberships = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembershipResult>
) => {
  let newState = state;

  if (payload.data.spaces.length > 0) {
    for (let i = 0; i < payload.data.spaces.length; i++) {
      let currentSpace = payload.data.spaces[i].space;
      if (currentSpace !== undefined) {
        newState = successObjectById<T>(
          newState,
          {
            data: (currentSpace as unknown) as T,
          },
          currentSpace.id
        );
      }
    }
  }

  return newState;
};
// end::RDX-048[]

export const createSpaceReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action:
    | SpaceActions<T>
    | SpaceListenerActions<T>
    | MembershipActions<MembershipList>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case ActionType.OBJECTS_CREATE_SPACE:
      return createSpace<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_SPACE:
      return updateSpace<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_SPACE:
      return deleteSpace<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACES:
      return fetchSpaces<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACE_BY_ID:
      return fetchSpaceById<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERSHIPS:
      return fetchMemberships<T>(state, action.payload);
    default:
      return state;
  }
};
