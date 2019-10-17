import {
  OBJECTS_FETCH_SPACES,
  OBJECTS_FETCH_SPACES_ERROR,
  OBJECTS_FETCH_SPACES_BEGIN,
  FetchSpacesErrorAction,
  FetchSpacesBeginAction,
  SpaceListRetrievedAction,
} from '../types/actions';
import { Space, SpaceMap } from '../types/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
} from '../types/PubNubApi';

export interface SpaceListState {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError;
}

const createInitialState = (): SpaceListState => ({
  data: [],
  loading: false,
  error: undefined,
});

const beginFetchSpaces = (state: SpaceListState) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});

const fetchSpaces = (payload: PubNubObjectApiSuccess<SpaceMap<Space>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};

const fetchSpacesError = (
  state: SpaceListState,
  payload: PubNubObjectApiError
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});

export const createSpaceListReducer = (label: string = 'all') => (
  state: SpaceListState = createInitialState(),
  action:
    | SpaceListRetrievedAction<Space>
    | FetchSpacesBeginAction
    | FetchSpacesErrorAction
): SpaceListState => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case OBJECTS_FETCH_SPACES_BEGIN:
        return beginFetchSpaces(state);
      case OBJECTS_FETCH_SPACES:
        return fetchSpaces(action.payload);
      case OBJECTS_FETCH_SPACES_ERROR:
        return fetchSpacesError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
