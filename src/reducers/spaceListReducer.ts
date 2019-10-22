import {
  FetchSpacesErrorAction,
  FetchSpacesBeginAction,
  SpaceListRetrievedAction,
} from '../actions/Actions';
import { actionType } from '../actions/ActionType.enum';
import { Space } from '../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  ItemMap,
} from '../api/PubNubApi';

export interface SpaceListState<T> {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError<T>;
}

const createInitialState = <T>(): SpaceListState<T> => ({
  data: [],
  loading: false,
  error: undefined,
});

const beginFetchSpaces = <T>(state: SpaceListState<T>) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});

const fetchSpaces = (payload: PubNubObjectApiSuccess<ItemMap<Space>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};

const fetchSpacesError = <T>(
  state: SpaceListState<T>,
  payload: PubNubObjectApiError<T>
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});

export const createSpaceListReducer = <T>(label: string = 'all') => (
  state: SpaceListState<T> = createInitialState(),
  action:
    | SpaceListRetrievedAction<Space>
    | FetchSpacesBeginAction
    | FetchSpacesErrorAction<T>
): SpaceListState<T> => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case actionType.OBJECTS_FETCH_SPACES_BEGIN:
        return beginFetchSpaces(state);
      case actionType.OBJECTS_FETCH_SPACES:
        return fetchSpaces(action.payload);
      case actionType.OBJECTS_FETCH_SPACES_ERROR:
        return fetchSpacesError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
