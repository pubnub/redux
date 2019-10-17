import {
  OBJECTS_FETCH_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_CREATE_SPACE_ERROR,
  OBJECTS_DELETE_SPACE,
  OBJECTS_FETCH_SPACES_ERROR,
  OBJECTS_FETCH_SPACE_BY_ID_ERROR,
  OBJECTS_UPDATE_SPACE,
  OBJECTS_FETCH_SPACE_BY_ID,
  SpaceActions,
  SpaceListenerActions,
  OBJECTS_DELETE_SPACE_ERROR,
  OBJECTS_UPDATE_SPACE_ERROR,
  OBJECTS_CREATE_SPACE_BEGIN,
  OBJECTS_UPDATE_SPACE_BEGIN,
  OBJECTS_DELETE_SPACE_BEGIN,
  OBJECTS_FETCH_SPACES_BEGIN,
  OBJECTS_FETCH_SPACE_BY_ID_BEGIN,
} from '../types/actions';
import { SpaceMap } from '../types/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
} from '../types/PubNubApi';

const createInitialState = <T extends Identifiable>(): PubNubObjectApiState<
  T
> => ({
  data: {},
  loadingAll: 0,
  loadingById: {},
  errorAll: undefined,
  errorById: {},
});

const beginCreateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const createSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const createSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginUpdateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: T
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const updateSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const updateSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginDeleteSpace = <T>(
  state: PubNubObjectApiState<T>,
  payload: string
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const deleteSpace = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  delete newState.data[id];

  return newState;
};

const deleteSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginFetchSpaces = <T extends Identifiable>(
  state: PubNubObjectApiState<T>
) => ({
  ...state,
  data: { ...state.data },
  loadingById: { ...state.loadingById },
  errorById: { ...state.errorById },
  loadingAll: state.loadingAll + 1,
  errorAll: undefined,
});

const fetchSpaces = <T>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<SpaceMap<T>>
) => ({
  ...state,
  data: { ...payload.data },
  loadingById: { ...state.loadingById },
  errorById: { ...state.errorById },
  loadingAll: state.loadingAll !== undefined ? state.loadingAll - 1 : 0,
});

const fetchSpacesError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError
) => ({
  ...state,
  loadingById: { ...state.loadingById },
  errorById: { ...state.errorById },
  loadingAll: state.loadingAll !== undefined ? state.loadingAll - 1 : 0,
  error: payload,
});

const beginFetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: string
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const fetchSpaceById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const fetchSpaceError = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
) => {
  let newState = {
    ...state,
    data: { ...state.data },
    loadingById: { ...state.loadingById },
    errorById: { ...state.errorById },
  };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

export const createSpaceReducer = <T extends Identifiable>() => (
  state: PubNubObjectApiState<T> = createInitialState<T>(),
  action: SpaceActions<T> | SpaceListenerActions<T>
): PubNubObjectApiState<T> => {
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
    case OBJECTS_FETCH_SPACES_BEGIN:
      return beginFetchSpaces<T>(state);
    case OBJECTS_FETCH_SPACES:
      return fetchSpaces<T>(state, action.payload);
    case OBJECTS_FETCH_SPACES_ERROR:
      return fetchSpacesError<T>(state, action.payload);
    case OBJECTS_FETCH_SPACE_BY_ID_BEGIN:
      return beginFetchSpaceById<T>(state, action.payload);
    case OBJECTS_FETCH_SPACE_BY_ID:
      return fetchSpaceById<T>(state, action.payload);
    case OBJECTS_FETCH_SPACE_BY_ID_ERROR:
      return fetchSpaceError<T>(state, action.payload);
    default:
      return state;
  }
};
