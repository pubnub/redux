import {
  SpaceActions,
  SpaceListenerActions,
  MembershipActions,
} from '../actions/Actions';
import { actionType } from '../actions/ActionType.enum';
import { SpaceMap } from '../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
} from '../api/PubNubApi';
import {
  beginObjectById,
  errorObjectById,
  successObjectById,
  successDeleteObjectById,
  successObjectList,
} from './reducerUtil';
import { MembershipList, MembershipResult } from 'api/Membership';

const createInitialState = <T extends Identifiable>(): PubNubObjectApiState<
  T
> => ({
  byId: {},
  loadingById: {},
  errorById: {},
});

const beginCreateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);

const createSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const createSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const beginUpdateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => beginObjectById<T>(state, payload.id);

const updateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const updateSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const beginDeleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const deleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successDeleteObjectById<T>(state, payload);

const deleteSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const fetchSpaces = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<SpaceMap<T>>
) => successObjectList<T>(state, payload);

const beginFetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => beginObjectById<T>(state, payload);

const fetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => successObjectById<T>(state, payload);

const fetchSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => errorObjectById<T>(state, payload);

const fetchMemberships = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<MembershipResult>
) => {
  let newState = state;

  if (payload.data.spaces.length > 0) {
    for (let i = 0; i < payload.data.spaces.length; i++) {
      if (payload.data.spaces[i].space !== undefined) {
        newState = successObjectById<T>(newState, {
          data: (payload.data.spaces[i].space as unknown) as T,
        });
      }
    }
  }

  return newState;
};

export const createSpaceReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action:
    | SpaceActions<T>
    | SpaceListenerActions<T>
    | MembershipActions<MembershipList>
): PubNubObjectApiState<T> => {
  switch (action.type) {
    case actionType.OBJECTS_CREATE_SPACE_BEGIN:
      return beginCreateSpace<T>(state, action.payload);
    case actionType.OBJECTS_CREATE_SPACE:
      return createSpace<T>(state, action.payload);
    case actionType.OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_SPACE_BEGIN:
      return beginUpdateSpace<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_SPACE:
      return updateSpace<T>(state, action.payload);
    case actionType.OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_SPACE_BEGIN:
      return beginDeleteSpace<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_SPACE:
      return deleteSpace<T>(state, action.payload);
    case actionType.OBJECTS_DELETE_SPACE_ERROR:
      return deleteSpaceError<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_SPACES_BEGIN:
      // nothing to do here
      // loading multiples will be tracked in spaceListReducer
      return state;
    case actionType.OBJECTS_FETCH_SPACES:
      return fetchSpaces<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_SPACES_ERROR:
      // nothing to do here
      // loading multiples will be tracked in spaceListReducer
      return state;
    case actionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN:
      return beginFetchSpaceById<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_SPACE_BY_ID:
      return fetchSpaceById<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR:
      return fetchSpaceError<T>(state, action.payload);
    case actionType.OBJECTS_FETCH_MEMBERSHIPS:
      return fetchMemberships<T>(state, action.payload);
    default:
      return state;
  }
};
