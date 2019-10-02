import {
  ObjectsActionPayload,
  ObjectStatusPayload,
  ObjectResponsePayload,
} from '../types/Objects';
import {
  AppActions,
  SPACE_UPDATED,
  SPACE_DELETED,
  GET_SPACES_ERROR,
  SPACE_LIST_RETRIEVED,
} from '../types/actions';
import { Dispatch } from 'redux';
import { SpaceListInput } from '../types/Space';

export const spaceUpdated = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_UPDATED,
  payload,
});

export const spaceDeleted = (payload: ObjectsActionPayload): AppActions => ({
  type: SPACE_DELETED,
  payload,
});

export const getSpacesError = (): AppActions => ({
  type: GET_SPACES_ERROR,
});

export const spaceListRetrieved = (
  payload: ObjectResponsePayload
): AppActions => ({
  type: SPACE_LIST_RETRIEVED,
  payload,
});

export const getSpaces = (pubnub: any, options?: SpaceListInput) => (
  dispatch: Dispatch
) => {
  pubnub.getSpaces(
    options,
    (status: ObjectStatusPayload, response: ObjectResponsePayload) => {
      if (status.error) dispatch(getSpacesError());
      else dispatch(spaceListRetrieved(response));
    }
  );
};

export const createSpaceActionListener = (dispatch: Dispatch<AppActions>) => ({
  space: (payload: ObjectsActionPayload) => {
    switch (payload.type) {
      case 'space':
        switch (payload.event) {
          case 'update':
            dispatch(spaceUpdated(payload));
            break;
          case 'delete':
            dispatch(spaceDeleted(payload));
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  },
});
