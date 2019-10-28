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
import { Space } from '../api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
} from 'api/PubNubApi';

// tag::[RED-156]
export const createSpaceBegin = <T>(payload: T): CreateSpaceBeginAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE_BEGIN,
  payload,
});
// end::[RED-156]

// tag::[RED-157]
export const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE,
  payload,
});
// end::[RED-157]

// tag::[RED-158]
export const createSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): CreateSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_CREATE_SPACE_ERROR,
  payload,
});
// end::[RED-158]

// tag::[RED-159]
export const spaceListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): SpaceListRetrievedAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACES,
  payload,
});
// end::[RED-159]

// tag::[RED-160]
export const fetchSpacesBegin = (payload: {
  label: string;
}): FetchSpacesBeginAction => ({
  type: actionType.OBJECTS_FETCH_SPACES_BEGIN,
  payload,
});
// end::[RED-160]

// tag::[RED-161]
export const fetchSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): FetchSpacesErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACES_ERROR,
  payload,
});
// end::[RED-161]

// tag::[RED-162]
export const spaceRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): FetchSpaceByIdAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID,
  payload,
});
// end::[RED-162]

// tag::[RED-163]
export const fetchSpaceByIdBegin = (
  payload: string
): FetchSpaceByIdBeginAction => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN,
  payload,
});
// end::[RED-163]

// tag::[RED-164]
export const fetchSpaceByIdError = <T>(
  payload: PubNubObjectApiError<T>
): FetchSpaceByIdErrorAction<T> => ({
  type: actionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR,
  payload,
});
// end::[RED-164]

// tag::[RED-165]
export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE,
  payload,
});
// end::[RED-165]

// tag::[RED-166]
export const updateSpaceBegin = <T>(payload: T): UpdateSpaceBeginAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE_BEGIN,
  payload,
});
// end::[RED-166]

// tag::[RED-167]
export const updateSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): UpdateSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_UPDATE_SPACE_ERROR,
  payload,
});
// end::[RED-167]

// tag::[RED-168]
export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: actionType.OBJECTS_DELETE_SPACE,
  payload,
});
// end::[RED-168]

// tag::[RED-169]
export const deleteSpaceBegin = (payload: string): DeleteSpaceBeginAction => ({
  type: actionType.OBJECTS_DELETE_SPACE_BEGIN,
  payload,
});
// end::[RED-169]

// tag::[RED-170]
export const deleteSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): DeleteSpaceErrorAction<T> => ({
  type: actionType.OBJECTS_DELETE_SPACE_ERROR,
  payload,
});
// end::[RED-170]

// tag::[RED-171]
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
// end::[RED-171]

// tag::[RED-172]
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
// end::[RED-172]

// tag::[RED-173]
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
// end::[RED-173]

// tag::[RED-174]
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
// end::[RED-174]

// tag::[RED-175]
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
// end::[RED-175]
