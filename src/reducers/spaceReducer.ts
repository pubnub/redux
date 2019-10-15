import {
  OBJECTS_GET_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_CREATE_SPACE_ERROR,
  OBJECTS_DELETE_SPACE,
  OBJECTS_GET_SPACES_ERROR,
  OBJECTS_GET_SPACE_BY_ID_ERROR,
  OBJECTS_UPDATE_SPACE,
  OBJECTS_GET_SPACE_BY_ID,
  SpaceActions,
  SpaceListenerActions,
  OBJECTS_DELETE_SPACE_ERROR,
  OBJECTS_UPDATE_SPACE_ERROR,
  OBJECTS_CREATE_SPACE_BEGIN,
  OBJECTS_UPDATE_SPACE_BEGIN,
  OBJECTS_DELETE_SPACE_BEGIN,
  OBJECTS_GET_SPACES_BEGIN,
  OBJECTS_GET_SPACE_BY_ID_BEGIN,
} from '../types/actions';
import { SpaceMap } from '../types/Space';
import {
  PubNubApiSuccess,
  PubNubApiState,
  PubNubApiError,
  Identifiable,
} from '../types/PubNubApi';

const createInitialState = <T extends Identifiable>(): PubNubApiState<T> => ({
  data: {},
  loadingAll: 0,
  loadingById: {},
  errorAll: undefined,
  errorById: {},
});

const beginCreateSpace = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: T
) => {
  let newState = { ...state };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const createSpace = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiSuccess<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const createSpaceError = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiError<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginUpdateSpace = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: T
) => {
  let newState = { ...state };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const updateSpace = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiSuccess<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const updateSpaceError = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiError<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginDeleteSpace = <T>(state: PubNubApiState<T>, payload: string) => {
  let newState = { ...state };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const deleteSpace = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiSuccess<T>
) => {
  let newState: PubNubApiState<T> = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  delete newState.data[id];

  return newState;
};

const deleteSpaceError = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiError<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginGetSpaces = <T extends Identifiable>(state: PubNubApiState<T>) => ({
  ...state,
  loadingAll: state.loadingAll + 1,
  errorAll: undefined,
});

const getSpaces = <T>(
  state: PubNubApiState<T>,
  payload: PubNubApiSuccess<SpaceMap<T>>
) => ({
  ...state,
  data: { ...payload.data },
  loadingAll: state.loadingAll !== undefined ? --state.loadingAll : 0,
});

const getSpacesError = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiError
) => ({
  ...state,
  loadingAll: state.loadingAll !== undefined ? --state.loadingAll : 0,
  error: payload,
});

const beginGetSpaceById = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: string
) => {
  let newState = { ...state };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const getSpaceById = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiSuccess<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const getSpaceError = <T extends Identifiable>(
  state: PubNubApiState<T>,
  payload: PubNubApiError<T>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

type AllSpaceActions<T> = SpaceActions<T> | SpaceListenerActions<T>;

export const createSpaceReducer = <T extends Identifiable>() => (
  state: PubNubApiState<T> = createInitialState<T>(),
  action: AllSpaceActions<T>
): PubNubApiState<T> => {
  switch (action.type) {
    case OBJECTS_CREATE_SPACE_BEGIN:
      return beginCreateSpace<T>(state, action.payload);
    case OBJECTS_CREATE_SPACE:
      return createSpace<T>(state, action.payload);
    case OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError<T>(state, action.payload);
    case OBJECTS_UPDATE_SPACE_BEGIN:
      return beginUpdateSpace<T>(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace<T>(state, action.payload);
    case OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError<T>(state, action.payload);
    case OBJECTS_DELETE_SPACE_BEGIN:
      return beginDeleteSpace<T>(state, action.payload);
    case OBJECTS_DELETE_SPACE:
      return deleteSpace<T>(state, action.payload);
    case OBJECTS_DELETE_SPACE_ERROR:
      return deleteSpaceError<T>(state, action.payload);
    case OBJECTS_GET_SPACES_BEGIN:
      return beginGetSpaces<T>(state);
    case OBJECTS_GET_SPACES:
      return getSpaces<T>(state, action.payload);
    case OBJECTS_GET_SPACES_ERROR:
      return getSpacesError<T>(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID_BEGIN:
      return beginGetSpaceById<T>(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID:
      return getSpaceById<T>(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID_ERROR:
      return getSpaceError<T>(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace<T>(state, action.payload);
    case OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError<T>(state, action.payload);
    default:
      return state;
  }
};
