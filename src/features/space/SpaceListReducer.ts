import {
  SpacesRetrievedAction,
  FetchSpacesSuccess,
  Space,
} from './SpaceActions';
import { SpaceActionType } from './SpaceActionType.enum';
import { ActionMeta, AnyMeta } from '../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

interface SpaceListState {
  spaceIds: string[];
}

const createInitialState = (): SpaceListState => ({
  spaceIds: [],
});

const spacesRetrieved = <SpaceType extends Space<ObjectsCustom>>(
  payload: FetchSpacesSuccess<SpaceType>
) => ({ spaceIds: payload.response.data.map((space) => space.id) });

// tag::RDX-method-reducer-spacelist[]
export const createSpaceListReducer = <
  SpaceType extends Space<ObjectsCustom> = Space,
  Meta extends ActionMeta = AnyMeta
>() => (
  state: SpaceListState = createInitialState(),
  action: SpacesRetrievedAction<SpaceType, Meta>
): SpaceListState => {
  switch (action.type) {
    case SpaceActionType.SPACES_RETRIEVED:
      return spacesRetrieved<SpaceType>(action.payload);
    default:
      return state;
  }
};
// end::RDX-method-reducer-spacelist[]
