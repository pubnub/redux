import {
  SpacesRetrievedAction,
  Space,
  FetchSpacesSuccess,
} from './SpaceActions';
import {
  SpaceActionType
} from './SpaceActionType.enum';

interface SpaceListState {
  spaceIds: string[];
}

const createInitialState = (): SpaceListState => ({
  spaceIds: []
});

const spacesRetrieved = <SpaceType extends Space, CustomType>(
  payload: FetchSpacesSuccess<SpaceType, CustomType>,
) => ({ spaceIds: payload.response.data.map((space) => space.id) });

export const createSpaceListReducer = <SpaceType extends Space, CustomType, MetaType>() => (
  state: SpaceListState = createInitialState(),
  action:
    | SpacesRetrievedAction<SpaceType, CustomType, MetaType>
): SpaceListState => {
  switch (action.type) {
    case SpaceActionType.SPACES_RETRIEVED:
      return spacesRetrieved<SpaceType, CustomType>(action.payload);
    default:
      return state;
  }
};
