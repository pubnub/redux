import { Dispatch } from 'redux';
import {
  SpaceUpdatedEventAction,
  SpaceDeletedEventAction,
  SpaceEventMessage,
  SpaceListenerActions,
  Space,
} from './SpaceActions';
import { SpaceActionType } from './SpaceActionType.enum';

// tag::RDX-175[]
export const spaceUpdated = <SpaceType extends Space, CustomType>(
  payload: SpaceEventMessage<SpaceType, CustomType>
): SpaceUpdatedEventAction<SpaceType, CustomType> => ({
  type: SpaceActionType.SPACE_UPDATED_EVENT,
  payload,
});
// end::RDX-175[]

// tag::RDX-166[]
export const spaceDeleted = <SpaceType extends Space, CustomType>(
  payload: SpaceEventMessage<SpaceType, CustomType>
): SpaceDeletedEventAction<SpaceType, CustomType> => ({
  type: SpaceActionType.SPACE_DELETED_EVENT,
  payload,
});
// end::RDX-166[]

export const createSpaceListener = <SpaceType extends Space, CustomType>(
  dispatch: Dispatch<SpaceListenerActions<SpaceType, CustomType>>
) => ({
  space: (payload: SpaceEventMessage<SpaceType, CustomType>) => {
    switch (payload.event) {
      case 'update':
        dispatch(spaceUpdated<SpaceType, CustomType>(payload));
        break;
      case 'delete':
        dispatch(spaceDeleted<SpaceType, CustomType>(payload));
        break;
      default:
        break;
    }
  },
});
