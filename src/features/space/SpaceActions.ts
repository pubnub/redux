import { SpaceActionType } from './SpaceActionType.enum';
import { ActionMeta } from '../../common/ActionMeta';
import { PubNubApiStatus } from 'common/PubNubApi';

// tag::RDX-027[]
export interface Space {
  id: string;
  name: string;
  description?: string;
}
// end::RDX-027[]

export type SpaceResponseItem<SpaceType extends Space, CustomType> = {
  [KeyType in keyof SpaceType]: SpaceType[KeyType];
} & {
  custom?: CustomType;
  created: string,
  updated: string,
  eTag: string,
};

export interface SpacePage {
  next?: string;
  prev?: string;
}

export interface SpaceFetchRequestOptions {
  limit?: number,
  page?: SpacePage,
  include?: {
    customFields?: boolean;
  };
}

export type SpaceRequestOptions<SpaceType extends Space, CustomType> = {
  [KeyType in keyof SpaceType]: SpaceType[KeyType];
} & {
  custom?: CustomType;
};

export interface SpaceEventMessage<SpaceType extends Space, CustomType> {
  data: SpaceResponseItem<SpaceType, CustomType>;
  event: string;
  type: string;
}

export interface FetchSpacesRequest {
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}

export interface FetchSpacesResponse<SpaceType extends Space, CustomType> {
  status: string,
  data: SpaceResponseItem<SpaceType, CustomType>[];
}
// export interface FetchSpacesResponse<SpaceType extends Space, CustomType> extends ObjectListResponse<SpaceType, CustomType> {}

export interface FetchSpacesError {
  request: FetchSpacesRequest;
  status: PubNubApiStatus;
}

export interface FetchSpacesSuccess<SpaceType extends Space, CustomType> {
  request: FetchSpacesRequest;
  response: FetchSpacesResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export type SpaceRequest<SpaceType extends Space, CustomType> =  SpaceRequestOptions<SpaceType, CustomType>;

export interface SpaceSuccess<SpaceType extends Space, CustomType> {
  request: SpaceRequest<SpaceType, CustomType>;
  response: SpaceResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export interface SpaceResponse<SpaceType extends Space, CustomType> {
  status: string;
  data: SpaceResponseItem<SpaceType, CustomType>
}

export interface SpaceError<SpaceType extends Space, CustomType> {
  request: SpaceRequest<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export interface FetchSpaceByIdRequest extends SpaceFetchRequestOptions {
  spaceId: string;
}

export interface FetchSpaceByIdSuccess<SpaceType extends Space, CustomType> {
  request: FetchSpaceByIdRequest;
  response: SpaceResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export interface FetchSpaceByIdError {
  request: FetchSpaceByIdRequest;
  status: PubNubApiStatus;
}

export interface DeleteSpaceRequest {
  spaceId: string;
}

export interface DeleteSpaceResponse {
  status: number,
  request: DeleteSpaceRequest,
}

export interface DeleteSpaceSuccess {
  request: DeleteSpaceRequest;
  response: DeleteSpaceResponse;
  status: PubNubApiStatus;
}

export interface DeleteSpaceError {
  request: DeleteSpaceRequest,
  status: PubNubApiStatus;
}

// tag::RDX-094[]
export interface FetchingSpacesAction<MetaType> {
  type: typeof SpaceActionType.FETCHING_SPACES;
  payload: FetchSpacesRequest
  meta?: ActionMeta<MetaType>;
}
// end::RDX-094[]

// tag::RDX-095[]
export interface SpacesRetrievedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACES_RETRIEVED;
  payload: FetchSpacesSuccess<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-095[]

// tag::RDX-096[]
export interface ErrorFetchingSpacesAction<MetaType> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACES;
  payload: FetchSpacesError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-096[]

// tag::RDX-098[]
export interface FetchingSpaceByIdAction<MetaType> {
  type: typeof SpaceActionType.FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdRequest;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-098[]

// tag::RDX-099[]
export interface SpaceRetrievedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_RETRIEVED;
  payload: FetchSpaceByIdSuccess<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-099[]

// tag::RDX-097[]
export interface ErrorFetchingSpaceByIdAction<MetaType> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-097[]

// tag::RDX-092[]
export interface CreatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.CREATING_SPACE;
  payload: SpaceRequest<SpaceType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-092[]

// tag::RDX-091[]
export interface SpaceCreatedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_CREATED;
  payload: SpaceSuccess<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-091[]

// tag::RDX-093[]
export interface ErrorCreatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.ERROR_CREATING_SPACE;
  payload: SpaceError<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true,
}
// end::RDX-093[]

// tag::RDX-086[]
export interface UpdatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.UPDATING_SPACE;
  payload: SpaceRequest<SpaceType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-086[]

// tag::RDX-085[]
export interface SpaceUpdatedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_UPDATED;
  payload: SpaceSuccess<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-085[]

// tag::RDX-087[]
export interface ErrorUpdatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.ERROR_UPDATING_SPACE;
  payload: SpaceError<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-087[]

// tag::RDX-089[]
export interface DeletingSpaceAction<MetaType> {
  type: typeof SpaceActionType.DELETING_SPACE;
  payload: DeleteSpaceRequest;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-089[]

// tag::RDX-088[]
export interface SpaceDeletedAction<MetaType> {
  type: typeof SpaceActionType.SPACE_DELETED;
  payload: DeleteSpaceSuccess;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-088[]

// tag::RDX-090[]
export interface ErrorDeletingSpaceAction<MetaType> {
  type: typeof SpaceActionType.ERROR_DELETING_SPACE;
  payload: DeleteSpaceError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-090[]

export interface SpaceUpdatedEventAction<SpaceType extends Space, CustomType> {
  type: typeof SpaceActionType.SPACE_UPDATED_EVENT;
  payload: SpaceEventMessage<SpaceType, CustomType>;
}

export interface SpaceDeletedEventAction<SpaceType extends Space, CustomType> {
  type: typeof SpaceActionType.SPACE_DELETED_EVENT;
  payload: SpaceEventMessage<SpaceType, CustomType>;
}

export type SpaceActions<SpaceType extends Space, CustomType, MetaType> =
  | FetchingSpacesAction<MetaType>
  | SpacesRetrievedAction<SpaceType, CustomType, MetaType>
  | ErrorFetchingSpacesAction<MetaType>
  | FetchingSpaceByIdAction<MetaType>
  | SpaceRetrievedAction<SpaceType, CustomType, MetaType>
  | ErrorFetchingSpaceByIdAction<MetaType>
  | CreatingSpaceAction<SpaceType, CustomType, MetaType>
  | SpaceCreatedAction<SpaceType, CustomType, MetaType>
  | ErrorCreatingSpaceAction<SpaceType, CustomType, MetaType>
  | UpdatingSpaceAction<SpaceType, CustomType, MetaType>
  | SpaceUpdatedAction<SpaceType, CustomType, MetaType>
  | ErrorUpdatingSpaceAction<SpaceType, CustomType, MetaType>
  | DeletingSpaceAction<ActionMeta>
  | SpaceDeletedAction<ActionMeta>
  | ErrorDeletingSpaceAction<MetaType>;

export type SpaceListenerActions<SpaceType extends Space, CustomType> =
  | SpaceUpdatedEventAction<SpaceType, CustomType>
  | SpaceDeletedEventAction<SpaceType, CustomType>;
