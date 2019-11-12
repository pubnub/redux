import {
  SpacesRetrievedAction,
  Space,
  FetchSpacesSuccess,
  AnySpace,
} from './SpaceActions';
import { SpaceActionType } from './SpaceActionType.enum';
import { ObjectsCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';

interface SpaceListState {
  spaceIds: string[];
}

const createInitialState = (): SpaceListState => ({
  spaceIds: [],
});

const spacesRetrieved = <SpaceType extends Space<ObjectsCustom>>(
  payload: FetchSpacesSuccess<SpaceType>
) => ({ spaceIds: payload.response.data.map((space) => space.id) });

export const createSpaceListReducer = <
  SpaceType extends Space<ObjectsCustom> = AnySpace,
  Meta extends ActionMeta = never
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
