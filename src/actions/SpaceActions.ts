import {
  ObjectsActionPayload,
  ObjectsStatusPayload,
  ObjectsResponsePayload,
  ObjectsListInput,
} from '../types/Objects';
import {
  OBJECTS_UPDATE_SPACE,
  OBJECTS_DELETE_SPACE,
  OBJECTS_GET_SPACES_ERROR,
  OBJECTS_GET_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_GET_SPACE_BY_ID,
  OBJECTS_GET_SPACE_BY_ID_ERROR,
  OBJECTS_CREATE_SPACE_ERROR,
  SpaceDeletedAction,
  SpaceUpdatedAction,
  CreateSpaceErrorAction,
  GetSpaceByIdErrorAction,
  GetSpacesErrorAction,
  GetSpaceByIdAction,
  SpaceListRetrievedAction,
  SpaceCreatedAction,
} from '../types/actions';
import { Dispatch } from 'redux';
import { CreateSpaceInput } from '../types/Space';

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

export const spaceCreated = (
  payload: ObjectsResponsePayload
): SpaceCreatedAction => ({
  type: OBJECTS_CREATE_SPACE,
  payload,
});

export const spaceListRetrieved = (
  payload: ObjectsResponsePayload
): SpaceListRetrievedAction => ({
  type: OBJECTS_GET_SPACES,
  payload,
});

export const spaceRetrievedById = (
  payload: ObjectsResponsePayload
): GetSpaceByIdAction => ({
  type: OBJECTS_GET_SPACE_BY_ID,
  payload,
});

export const getSpacesError = (
  payload: ObjectsStatusPayload
): GetSpacesErrorAction => ({
  type: OBJECTS_GET_SPACES_ERROR,
  payload,
});

export const getSpaceByIdError = (
  payload: ObjectsStatusPayload
): GetSpaceByIdErrorAction => ({
  type: OBJECTS_GET_SPACE_BY_ID_ERROR,
  payload,
});

export const createSpaceError = (
  payload: ObjectsStatusPayload
): CreateSpaceErrorAction => ({
  type: OBJECTS_CREATE_SPACE_ERROR,
  payload,
});

export const createSpace = (
  pubnub: any,
  id: string,
  name: string,
  options?: CreateSpaceInput
) => (dispatch: Dispatch) => {
  pubnub.createSpace(
    {
      id,
      name,
      ...options,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(createSpaceError(status));
      } else {
        dispatch(spaceCreated(response));
      }
    }
  );
};

export const getSpaces = (pubnub: any, options?: ObjectsListInput) => (
  dispatch: Dispatch
) => {
  pubnub.getSpaces(
    { ...options },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getSpacesError(status));
      } else {
        dispatch(spaceListRetrieved(response));
      }
    }
  );
};

export const getSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object
) => (dispatch: Dispatch) => {
  pubnub.getSpace(
    {
      spaceId,
      ...include,
    },
    (status: ObjectsStatusPayload, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(getSpaceByIdError(status));
      } else {
        dispatch(spaceRetrievedById(response));
      }
    }
  );
};

export const createSpaceActionListener = (
  dispatch: Dispatch<SpaceUpdatedAction | SpaceDeletedAction>
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
