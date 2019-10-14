import {
  ObjectsActionTypes,
  OBJECTS_GET_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_CREATE_SPACE_ERROR,
  OBJECTS_DELETE_SPACE,
  OBJECTS_GET_SPACES_ERROR,
  OBJECTS_GET_SPACE_BY_ID_ERROR,
  OBJECTS_UPDATE_SPACE,
  OBJECTS_GET_SPACE_BY_ID,
} from '../types/actions';
import {
  ObjectsResponsePayload,
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsData,
} from '../types/Objects';

interface SpaceState {
  spacesById: {
    byId: Record<string, ObjectsData>;
    allIds: string[];
  };
  error: string;
  space: object;
}

let initialState: SpaceState = {
  spacesById: {
    byId: {},
    allIds: [],
  },
  error: '',
  space: {},
};

const createSpace = (state: SpaceState, payload: ObjectsResponsePayload) =>
  'id' in payload.data
    ? {
        ...state,
        spacesById: {
          ...state.spacesById,
          byId: {
            ...state.spacesById.byId,
            [payload.data.id]: payload.data,
          },
          allIds: [...state.spacesById.allIds, payload.data.id],
        },
      }
    : state;

const createSpaceError = (
  state: SpaceState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

const updateSpace = (state: SpaceState, payload: ObjectsActionPayload) => ({
  ...state,
  spacesById: {
    ...state.spacesById,
    byId: {
      ...state.spacesById.byId,
      [payload.message.data.id]: payload.message.data,
    },
  },
});

const deleteSpace = (state: SpaceState, payload: ObjectsActionPayload) => {
  const idToDelete = payload.message.data.id;
  const { [idToDelete]: value, ...otherSpaces } = state.spacesById.byId;
  return {
    ...state,
    spacesById: {
      ...state.spacesById,
      byId: otherSpaces,
      allIds: state.spacesById.allIds.filter(
        id => id !== payload.message.data.id
      ),
    },
  };
};

const getSpaces = (state: SpaceState, payload: ObjectsResponsePayload) => {
  let receivedSpaces = initialState;
  if (Array.isArray(payload.data)) {
    payload.data.forEach((space: ObjectsData) => {
      receivedSpaces.spacesById.byId[space.id] = space;
      receivedSpaces.spacesById.allIds = receivedSpaces.spacesById.allIds.concat(
        space.id
      );
    });
  }

  return {
    ...state,
    spacesById: {
      ...state.spacesById,
      byId: receivedSpaces.spacesById.byId,
      allIds: receivedSpaces.spacesById.allIds,
    },
  };
};

const getSpaceById = (state: SpaceState, payload: ObjectsResponsePayload) => ({
  ...state,
  space: payload.data,
});

const getSpaceError = (state: SpaceState, payload: ObjectsStatusPayload) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

export const spaceReducer = (
  state = initialState,
  action: ObjectsActionTypes
): SpaceState => {
  switch (action.type) {
    case OBJECTS_CREATE_SPACE:
      return createSpace(state, action.payload);
    case OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError(state, action.payload);
    case OBJECTS_DELETE_SPACE:
      return deleteSpace(state, action.payload);
    case OBJECTS_GET_SPACES:
      return getSpaces(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID:
      return getSpaceById(state, action.payload);
    case OBJECTS_GET_SPACES_ERROR:
    case OBJECTS_GET_SPACE_BY_ID_ERROR:
      return getSpaceError(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace(state, action.payload);
    default:
      return state;
  }
};
