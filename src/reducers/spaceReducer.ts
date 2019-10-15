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
import { Space, SpaceMap } from 'types/Space';
import {
  PubNubApiSuccess,
  PubNubApiState,
  PubNubApiError,
} from 'types/PubNubApi';

type SpaceState = PubNubApiState<Space>;

let initialState: SpaceState = {
  data: {},
  loadingAll: 0,
  loadingById: {},
  errorAll: undefined,
  errorById: {},
};

const beginCreateSpace = (state: SpaceState, payload: Space) => {
  let newState = { ...state };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const createSpace = (state: SpaceState, payload: PubNubApiSuccess<Space>) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const createSpaceError = (
  state: SpaceState,
  payload: PubNubApiError<Space>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginUpdateSpace = (state: SpaceState, payload: Space) => {
  let newState = { ...state };
  let id = payload.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const updateSpace = (state: SpaceState, payload: PubNubApiSuccess<Space>) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const updateSpaceError = (
  state: SpaceState,
  payload: PubNubApiError<Space>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginDeleteSpace = (state: SpaceState, payload: string) => {
  let newState = { ...state };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const deleteSpace = (state: SpaceState, payload: PubNubApiSuccess<Space>) => {
  let newState: SpaceState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  delete newState.data[id];

  return newState;
};

const deleteSpaceError = (
  state: SpaceState,
  payload: PubNubApiError<Space>
) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

const beginGetSpaces = (state: SpaceState) => ({
  ...state,
  loadingAll: state.loadingAll + 1,
  errorAll: undefined,
});

const getSpaces = (state: SpaceState, payload: PubNubApiSuccess<SpaceMap>) => ({
  ...state,
  data: { ...payload.data },
  loadingAll: state.loadingAll !== undefined ? --state.loadingAll : 0,
});

const getSpacesError = (state: SpaceState, payload: PubNubApiError) => ({
  ...state,
  loadingAll: state.loadingAll !== undefined ? --state.loadingAll : 0,
  error: payload,
});

const beginGetSpaceById = (state: SpaceState, payload: string) => {
  let newState = { ...state };
  let id = payload;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading + 1;
  delete newState.errorById[id];

  return newState;
};

const getSpaceById = (state: SpaceState, payload: PubNubApiSuccess<Space>) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.data[id] = { ...payload.data };
  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;

  return newState;
};

const getSpaceError = (state: SpaceState, payload: PubNubApiError<Space>) => {
  let newState = { ...state };
  let id = payload.data.id;
  let loading =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] : 0;

  newState.loadingById[id] = loading > 0 ? loading - 1 : 0;
  newState.errorById[id] = payload;

  return newState;
};

export const spaceReducer = (
  state = initialState,
  action: SpaceActions | SpaceListenerActions
): SpaceState => {
  switch (action.type) {
    case OBJECTS_CREATE_SPACE_BEGIN:
      return beginCreateSpace(state, action.payload);
    case OBJECTS_CREATE_SPACE:
      return createSpace(state, action.payload);
    case OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError(state, action.payload);
    case OBJECTS_UPDATE_SPACE_BEGIN:
      return beginUpdateSpace(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace(state, action.payload);
    case OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError(state, action.payload);
    case OBJECTS_DELETE_SPACE_BEGIN:
      return beginDeleteSpace(state, action.payload);
    case OBJECTS_DELETE_SPACE:
      return deleteSpace(state, action.payload);
    case OBJECTS_DELETE_SPACE_ERROR:
      return deleteSpaceError(state, action.payload);
    case OBJECTS_GET_SPACES_BEGIN:
      return beginGetSpaces(state);
    case OBJECTS_GET_SPACES:
      return getSpaces(state, action.payload);
    case OBJECTS_GET_SPACES_ERROR:
      return getSpacesError(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID_BEGIN:
      return beginGetSpaceById(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID:
      return getSpaceById(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID_ERROR:
      return getSpaceError(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace(state, action.payload);
    case OBJECTS_UPDATE_SPACE_ERROR:
      return updateSpaceError(state, action.payload);
    default:
      return state;
  }
};
