import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsListInput,
} from '../types/Objects';
import {
  OBJECTS_UPDATE_SPACE,
  OBJECTS_DELETE_SPACE,
  OBJECTS_FETCH_SPACES_ERROR,
  OBJECTS_FETCH_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_FETCH_SPACE_BY_ID,
  OBJECTS_FETCH_SPACE_BY_ID_ERROR,
  OBJECTS_CREATE_SPACE_ERROR,
  SpaceDeletedAction,
  SpaceUpdatedAction,
  CreateSpaceErrorAction,
  FetchSpaceByIdErrorAction,
  FetchSpacesErrorAction,
  FetchSpaceByIdAction,
  SpaceListRetrievedAction,
  SpaceCreatedAction,
  CreateSpaceBeginAction,
  OBJECTS_CREATE_SPACE_BEGIN,
  OBJECTS_FETCH_SPACES_BEGIN,
  FetchSpacesBeginAction,
  FetchSpaceByIdBeginAction,
  OBJECTS_FETCH_SPACE_BY_ID_BEGIN,
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
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  Identifiable,
} from 'types/PubNubApi';

export const createSpaceBegin = <T>(payload: T): CreateSpaceBeginAction<T> => ({
  type: OBJECTS_CREATE_SPACE_BEGIN,
  payload,
});

export const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: OBJECTS_CREATE_SPACE,
  payload,
});

export const createSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): CreateSpaceErrorAction<T> => ({
  type: OBJECTS_CREATE_SPACE_ERROR,
  payload,
});

export const spaceListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<SpaceMap<T>>
): SpaceListRetrievedAction<T> => ({
  type: OBJECTS_FETCH_SPACES,
  payload,
});

export const fetchSpacesBegin = (payload: {
  label: string;
}): FetchSpacesBeginAction => ({
  type: OBJECTS_FETCH_SPACES_BEGIN,
  payload,
});

export const fetchSpacesError = (
  payload: PubNubObjectApiError<object>
): FetchSpacesErrorAction => ({
  type: OBJECTS_FETCH_SPACES_ERROR,
  payload,
});

export const spaceRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchSpaceByIdAction<T> => ({
  type: OBJECTS_FETCH_SPACE_BY_ID,
  payload,
});

export const fetchSpaceByIdBegin = (
  payload: string
): FetchSpaceByIdBeginAction => ({
  type: OBJECTS_FETCH_SPACE_BY_ID_BEGIN,
  payload,
});

export const fetchSpaceByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchSpaceByIdErrorAction<T> => ({
  type: OBJECTS_FETCH_SPACE_BY_ID_ERROR,
  payload,
});

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: OBJECTS_UPDATE_SPACE,
  payload,
});

export const updateSpaceBegin = <T>(payload: T): UpdateSpaceBeginAction<T> => ({
  type: OBJECTS_UPDATE_SPACE_BEGIN,
  payload,
});

export const updateSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateSpaceErrorAction<T> => ({
  type: OBJECTS_UPDATE_SPACE_ERROR,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: OBJECTS_DELETE_SPACE,
  payload,
});

export const deleteSpaceBegin = (payload: string): DeleteSpaceBeginAction => ({
  type: OBJECTS_DELETE_SPACE_BEGIN,
  payload,
});

export const deleteSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteSpaceErrorAction<T> => ({
  type: OBJECTS_DELETE_SPACE_ERROR,
  payload,
});

export const createSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(createSpaceBegin(space));

  pubnub.createSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          createSpaceError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...space },
          })
        );
      } else {
        dispatch(
          spaceCreated({
            data: response.data,
          })
        );
      }
    }
  );
};

export const updateSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(updateSpaceBegin(space));

  pubnub.updateSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          updateSpaceError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { ...space },
          })
        );
      } else {
        dispatch(
          spaceUpdated({
            data: response.data,
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
            data: response ? response.data : { id: id },
          })
        );
      } else {
        dispatch(
          spaceDeleted({
            data: response.data,
          })
        );
      }
    }
  );
};

export const fetchSpaces = (
  pubnub: any,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchSpacesBegin({ label: label }));

  pubnub.getSpaces(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          fetchSpacesError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : {},
            label: label,
          })
        );
      } else {
        dispatch(
          spaceListRetrieved({
            label: label,
            data: (response.data as Space[]).reduce(
              (result: { [key: string]: Space }, value) => {
                if (value.description === null) {
                  value.description = ''; // TODO: reference app cannot handle missing description
                }

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

export const fetchSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(fetchSpaceByIdBegin(spaceId));

  pubnub.getSpace(
    {
      spaceId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        dispatch(
          fetchSpaceByIdError({
            code: status.category,
            message: status.errorData,
            data: response ? response.data : { id: spaceId },
          })
        );
      } else {
        dispatch(
          spaceRetrievedById({
            data: response.data,
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
