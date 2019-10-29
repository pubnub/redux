import {
  SpaceActions,
  SpaceListenerActions,
  MembershipActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
  ItemMap,
} from 'api/PubNubApi';
import {
  beginObjectById,
  errorObjectById,
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
  loadingById: {},
  errorById: {},
});
// end::RDX-034[]

// tag::RDX-035[]
const beginCreateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);
// end::RDX-035[]

// tag::RDX-036[]
const createSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-036[]

// tag::RDX-037[]
const createSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);
// end::RDX-037[]

// tag::RDX-038[]
const beginUpdateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);
// end::RDX-038[]

// tag::RDX-039[]
const updateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-039[]

// tag::RDX-040[]
const updateSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);
// end::RDX-040[]

// tag::RDX-041[]
const beginDeleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);
// end::RDX-041[]

// tag::RDX-042[]
const deleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload.data.id);
// end::RDX-042[]

// tag::RDX-043[]
const deleteSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);
// end::RDX-043[]

// tag::RDX-044[]
const fetchSpaces = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ItemMap<T>>
) => successObjectList<T>(state, payload);
// end::RDX-044[]

// tag::RDX-045[]
const beginFetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);
// end::RDX-045[]

// tag::RDX-046[]
const fetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload, payload.data.id);
// end::RDX-046[]

// tag::RDX-047[]
const fetchSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload, payload.data.id);
// end::RDX-047[]

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
    case ActionType.OBJECTS_CREATE_SPACE_BEGIN:
      return beginCreateSpace<T>(state, action.payload);
    case ActionType.OBJECTS_CREATE_SPACE:
      return createSpace<T>(state, action.payload);
    case ActionType.OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_SPACE_BEGIN:
      return beginUpdateSpace<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_SPACE:
      return updateSpace<T>(state, action.payload);
    case ActionType.OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_SPACE_BEGIN:
      return beginDeleteSpace<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_SPACE:
      return deleteSpace<T>(state, action.payload);
    case ActionType.OBJECTS_DELETE_SPACE_ERROR:
      return deleteSpaceError<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACES_BEGIN:
      // nothing to do here
      // loading multiples will be tracked in spaceListReducer
      return state;
    case ActionType.OBJECTS_FETCH_SPACES:
      return fetchSpaces<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACES_ERROR:
      // nothing to do here
      // loading multiples will be tracked in spaceListReducer
      return state;
    case ActionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN:
      return beginFetchSpaceById<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACE_BY_ID:
      return fetchSpaceById<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR:
      return fetchSpaceError<T>(state, action.payload);
    case ActionType.OBJECTS_FETCH_MEMBERSHIPS:
      return fetchMemberships<T>(state, action.payload);
    default:
      return state;
  }
};
