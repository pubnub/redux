import {
  SpacesRetrievedAction,
  Space,
  FetchSpacesSuccess,
} from './SpaceActions';
import {
  SpaceActionType
} from './SpaceActionType.enum';

// tag::RDX-049[]
interface SpaceListState {
  spaceIds: string[];
}
// end::RDX-049[]

// tag::RDX-050[]
const createInitialState = (): SpaceListState => ({
  spaceIds: []
});
// end::RDX-050[]

// tag::RDX-052[]
const spacesRetrieved = <SpaceType extends Space, CustomType>(
  payload: FetchSpacesSuccess<SpaceType, CustomType>,
) => ({ spaceIds: payload.response.data.map((space) => space.id) });
// end::RDX-052[]

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
