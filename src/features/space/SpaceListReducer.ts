import {
  FetchSpacesErrorAction,
  FetchSpacesBeginAction,
  SpaceListRetrievedAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Space } from 'api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  ItemMap,
} from 'api/PubNubApi';

// tag::RDX-029[]
export interface SpaceListState<T> {
  data: string[];
  loading: boolean;
  error?: PubNubObjectApiError<T>;
}
// end::RDX-029[]

// tag::RDX-030[]
const createInitialState = <T>(): SpaceListState<T> => ({
  data: [],
  loading: false,
  error: undefined,
});
// end::RDX-030[]

// tag::RDX-031[]
const beginFetchSpaces = <T>(state: SpaceListState<T>) => ({
  data: [...state.data],
  loading: true,
  error: undefined,
});
// end::RDX-031[]

// tag::RDX-032[]
const fetchSpaces = (payload: PubNubObjectApiSuccess<ItemMap<Space>>) => {
  let data = Object.keys(payload.data).map((key) => payload.data[key].id);

  return {
    data,
    loading: false,
    error: undefined,
  };
};
// end::RDX-032[]

// tag::RDX-033[]
const fetchSpacesError = <T>(
  state: SpaceListState<T>,
  payload: PubNubObjectApiError<T>
) => ({
  data: [...state.data],
  loading: false,
  error: payload,
});
// end::RDX-033[]

export const createSpaceListReducer = <T>(label: string = 'all') => (
  state: SpaceListState<T> = createInitialState(),
  action:
    | SpaceListRetrievedAction<Space>
    | FetchSpacesBeginAction
    | FetchSpacesErrorAction<T>
): SpaceListState<T> => {
  if (action.payload !== undefined && action.payload.label === label) {
    switch (action.type) {
      case ActionType.FETCHING_SPACES:
        return beginFetchSpaces(state);
      case ActionType.SPACES_RETRIEVED:
        return fetchSpaces(action.payload);
      case ActionType.ERROR_FETCHING_SPACES:
        return fetchSpacesError(state, action.payload);
      default:
        return state;
    }
  } else {
    return state;
  }
};
