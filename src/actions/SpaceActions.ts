import {
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsResponsePayload,
} from '../types/Objects';
import {
  OBJECTS_UPDATE_SPACE,
  OBJECTS_DELETE_SPACE,
  OBJECTS_GET_SPACES_ERROR,
  OBJECTS_GET_SPACES,
  SpaceUpdatedAction,
  SpaceDeletedAction,
  GetSpacesErrorAction,
  SpaceListRetrievedAction,
  SpaceActions,
  SpaceListenerActions,
} from '../types/actions';
import { Dispatch } from 'redux';
import { SpaceListInput } from '../types/Space';

export const spaceUpdated = (
  payload: ObjectsActionPayload
): SpaceUpdatedAction => ({
  type: OBJECTS_UPDATE_SPACE,
  payload,
});

export const spaceDeleted = (
  payload: ObjectsActionPayload
): SpaceDeletedAction => ({
  type: OBJECTS_DELETE_SPACE,
  payload,
});

export const getSpacesError = (): GetSpacesErrorAction => ({
  type: OBJECTS_GET_SPACES_ERROR,
});

export const spaceListRetrieved = (
  payload: ObjectsResponsePayload
): SpaceListRetrievedAction => ({
  type: OBJECTS_GET_SPACES,
  payload,
});

export const getSpaces = (pubnub: any, options?: SpaceListInput) => (
  dispatch: Dispatch<SpaceActions>
) => {
  pubnub.getSpaces(
    { ...options },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getSpacesError());
      } else {
        dispatch(spaceListRetrieved(response));
      }
    }
  );
};

export const createSpaceActionListener = (
  dispatch: Dispatch<SpaceListenerActions>
) => ({
  space: (payload: ObjectsActionPayload) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(spaceUpdated(payload));
        break;
      case 'delete':
        dispatch(spaceDeleted(payload));
        break;
      default:
        break;
    }
  },
});
