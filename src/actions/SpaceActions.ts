import {
  ObjectsActionPayload,
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
  CreateSpaceBeginAction,
  OBJECTS_CREATE_SPACE_BEGIN,
  OBJECTS_GET_SPACES_BEGIN,
  GetSpacesBeginAction,
  GetSpaceByIdBeginAction,
  OBJECTS_GET_SPACE_BY_ID_BEGIN,
  UpdateSpaceBeginAction,
  OBJECTS_UPDATE_SPACE_BEGIN,
  UpdateSpaceErrorAction,
  OBJECTS_UPDATE_SPACE_ERROR,
  OBJECTS_DELETE_SPACE_BEGIN,
  DeleteSpaceBeginAction,
  DeleteSpaceErrorAction,
  OBJECTS_DELETE_SPACE_ERROR,
} from '../types/actions';
import { Dispatch } from 'redux';
import { Space, SpaceMap } from '../types/Space';
import {
  PubNubApiSuccess,
  PubNubApiError,
  PubNubApiStatus,
  Identifiable,
} from 'types/PubNubApi';

export const createSpaceBegin = <T>(payload: T): CreateSpaceBeginAction<T> => ({
  type: OBJECTS_CREATE_SPACE_BEGIN,
  payload,
});

export const spaceCreated = <T>(
  payload: PubNubApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: OBJECTS_CREATE_SPACE,
  payload,
});

export const createSpaceError = <T>(
  payload: PubNubApiError<T>
): CreateSpaceErrorAction<T> => ({
  type: OBJECTS_CREATE_SPACE_ERROR,
  payload,
});

export const spaceListRetrieved = <T>(
  payload: PubNubApiSuccess<SpaceMap<T>>
): SpaceListRetrievedAction<T> => ({
  type: OBJECTS_GET_SPACES,
  payload,
});

export const getSpacesBegin = (): GetSpacesBeginAction => ({
  type: OBJECTS_GET_SPACES_BEGIN,
});

export const getSpacesError = (
  payload: PubNubApiError<object>
): GetSpacesErrorAction => ({
  type: OBJECTS_GET_SPACES_ERROR,
  payload,
});

export const spaceRetrievedById = <T>(
  payload: PubNubApiSuccess<T>
): GetSpaceByIdAction<T> => ({
  type: OBJECTS_GET_SPACE_BY_ID,
  payload,
});

export const getSpaceByIdBegin = (
  payload: string
): GetSpaceByIdBeginAction => ({
  type: OBJECTS_GET_SPACE_BY_ID_BEGIN,
  payload,
});

export const getSpaceByIdError = <T>(
  payload: PubNubApiError<T>
): GetSpaceByIdErrorAction<T> => ({
  type: OBJECTS_GET_SPACE_BY_ID_ERROR,
  payload,
});

export const spaceUpdated = <T>(
  payload: PubNubApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_SPACE,
  payload,
});

export const updateSpaceBegin = <T>(payload: T): UpdateSpaceBeginAction<T> => ({
  type: OBJECTS_UPDATE_SPACE_BEGIN,
  payload,
});

export const updateSpaceError = <T>(
  payload: PubNubApiError<T>
): UpdateSpaceErrorAction<T> => ({
  type: OBJECTS_UPDATE_SPACE_ERROR,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: OBJECTS_DELETE_SPACE,
  payload,
});

export const deleteSpaceBegin = (payload: string): DeleteSpaceBeginAction => ({
  type: OBJECTS_DELETE_SPACE_BEGIN,
  payload,
});

export const deleteSpaceError = <T>(
  payload: PubNubApiError<T>
): DeleteSpaceErrorAction<T> => ({
  type: OBJECTS_DELETE_SPACE_ERROR,
  payload,
});

export const createSpace = (
  pubnub: any,
  id: string,
  name: string,
  space: Space
) => (dispatch: Dispatch) => {
  dispatch(createSpaceBegin(space));

  pubnub.createSpace(
    {
      id,
      name,
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          createSpaceError({
            code: status.category,
            message: status.errorData,
            data: response.data as Space,
          })
        );
      } else {
        dispatch(
          spaceCreated({
            data: response.data as Space,
          })
        );
      }
    }
  );
};

export const updateSpace = (
  pubnub: any,
  id: string,
  name: string,
  space: Space
) => (dispatch: Dispatch) => {
  dispatch(updateSpaceBegin(space));

  pubnub.updateSpace(
    {
      id,
      name,
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          updateSpaceError({
            code: status.category,
            message: status.errorData,
            data: response.data as Space,
          })
        );
      } else {
        dispatch(
          spaceUpdated({
            data: response.data as Space,
          })
        );
      }
    }
  );
};

export const deleteSpace = (pubnub: any, id: string) => (
  dispatch: Dispatch
) => {
  dispatch(deleteSpaceBegin(id));

  pubnub.deleteSpace(
    id,
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          deleteSpaceError({
            code: status.category,
            message: status.errorData,
            data: response.data as Space,
          })
        );
      } else {
        dispatch(
          spaceDeleted({
            data: response.data as Space,
          })
        );
      }
    }
  );
};

export const getSpaces = (pubnub: any, options?: ObjectsListInput) => (
  dispatch: Dispatch
) => {
  dispatch(getSpacesBegin());

  pubnub.getSpaces(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          getSpacesError({
            code: status.category,
            message: status.errorData,
            data: response.data as Space,
          })
        );
      } else {
        dispatch(
          spaceListRetrieved({
            data: (response.data as Space[]).reduce(
              (result: { [key: string]: Space }, value) => {
                result[value.id] = value;
                return result;
              },
              {}
            ),
          })
        );
      }
    }
  );
};

export const getSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(getSpaceByIdBegin(spaceId));

  pubnub.getSpace(
    {
      spaceId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          getSpaceByIdError({
            code: status.category,
            message: status.errorData,
            data: response.data as Space,
          })
        );
      } else {
        dispatch(
          spaceRetrievedById({
            data: response.data as Space,
          })
        );
      }
    }
  );
};

export const createSpaceActionListener = <T extends Identifiable>(
  dispatch: Dispatch<SpaceUpdatedAction<T> | SpaceDeletedAction<T>>
) => ({
  space: (payload: ObjectsActionPayload<T>) => {
    switch (payload.message.event) {
      case 'update':
        dispatch(
          spaceUpdated({
            data: payload.message.data,
          })
        );
        break;
      case 'delete':
        dispatch(
          spaceDeleted({
            data: payload.message.data,
          })
        );
        break;
      default:
        break;
    }
  },
});
