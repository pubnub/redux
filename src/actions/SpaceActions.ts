import { ObjectsResponsePayload, ObjectsListInput } from '../api/Objects';
import {
  SpaceDeletedAction,
  SpaceUpdatedAction,
  CreateSpaceErrorAction,
  FetchSpaceByIdErrorAction,
  FetchSpacesErrorAction,
  FetchSpaceByIdAction,
  SpaceListRetrievedAction,
  SpaceCreatedAction,
  CreateSpaceBeginAction,
  FetchSpacesBeginAction,
  FetchSpaceByIdBeginAction,
  UpdateSpaceBeginAction,
  UpdateSpaceErrorAction,
  DeleteSpaceBeginAction,
  DeleteSpaceErrorAction,
} from './Actions';
import { actionType } from './ActionType.enum';
import { Dispatch } from 'redux';
import { Space, SpaceMap } from '../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
} from 'api/PubNubApi';

export const createSpaceBegin = <T>(payload: T): CreateSpaceBeginAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE_BEGIN,
  payload,
});

export const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE,
  payload,
});

export const createSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): CreateSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE_ERROR,
  payload,
});

export const spaceListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<SpaceMap<T>>
): SpaceListRetrievedAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACES,
  payload,
});

export const fetchSpacesBegin = (payload: {
  label: string;
}): FetchSpacesBeginAction => ({
  type: actionType.OBJECTS_FETCH_SPACES_BEGIN,
  payload,
});

export const fetchSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): FetchSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACES_ERROR,
  payload,
});

export const spaceRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchSpaceByIdAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID,
  payload,
});

export const fetchSpaceByIdBegin = (
  payload: string
): FetchSpaceByIdBeginAction => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN,
  payload,
});

export const fetchSpaceByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchSpaceByIdErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR,
  payload,
});

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE,
  payload,
});

export const updateSpaceBegin = <T>(payload: T): UpdateSpaceBeginAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE_BEGIN,
  payload,
});

export const updateSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE_ERROR,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: actionType.OBJECTS_DELETE_SPACE,
  payload,
});

export const deleteSpaceBegin = (payload: string): DeleteSpaceBeginAction => ({
  type: actionType.OBJECTS_DELETE_SPACE_BEGIN,
  payload,
});

export const deleteSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_DELETE_SPACE_ERROR,
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
        let errorData = { id: space.id, value: space };

        dispatch(
          createSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
        let errorData = { id: space.id, value: space };

        dispatch(
          updateSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
        let errorData = { id: id };

        dispatch(
          deleteSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
        let errorData = { id: '' };

        dispatch(
          fetchSpacesError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
        let errorData = { id: spaceId };

        dispatch(
          fetchSpaceByIdError({
            code: status.category,
            message: status.errorData,
            data: errorData,
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
