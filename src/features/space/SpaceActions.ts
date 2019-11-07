import { SpaceActionType } from './SpaceActionType.enum';
import { PubNubApiStatus } from '../../common/PubNubApi';

// tag::RDX-025[]
export interface Space {
  id: string;
  name: string;
  description?: string;
}
// end::RDX-025[]

// tag::RDX-062[]
export type SpaceResponseItem<SpaceType extends Space, CustomType> = {
  [KeyType in keyof SpaceType]: SpaceType[KeyType];
} & {
  custom?: CustomType;
  created: string,
  updated: string,
  eTag: string,
};
// end::RDX-062[]

// tag::RDX-064[]
export interface SpacePage {
  next?: string;
  prev?: string;
}
// end::RDX-064[]

// tag::RDX-066[]
export interface SpaceFetchRequestOptions {
  limit?: number,
  page?: SpacePage,
  include?: {
    customFields?: boolean;
  };
}
// end::RDX-066[]

// tag::RDX-178[]
export type SpaceRequestOptions<SpaceType extends Space, CustomType> = {
  [KeyType in keyof SpaceType]: SpaceType[KeyType];
} & {
  custom?: CustomType;
};
// end::RDX-178[]

// tag::RDX-178[]
export interface SpaceEventMessage<SpaceType extends Space, CustomType> {
  data: SpaceResponseItem<SpaceType, CustomType>;
  event: string;
  type: string;
}
// end::RDX-178[]

// tag::RDX-179[]
export interface FetchSpacesRequest {
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}
// end::RDX-179[]

// tag::RDX-180[]
export interface FetchSpacesResponse<SpaceType extends Space, CustomType> {
  status: string,
  data: SpaceResponseItem<SpaceType, CustomType>[];
}
// end::RDX-180[]
// export interface FetchSpacesResponse<SpaceType extends Space, CustomType> extends ObjectListResponse<SpaceType, CustomType> {}

// tag::RDX-181[]
export interface FetchSpacesError {
  request: FetchSpacesRequest;
  status: PubNubApiStatus;
}
// end::RDX-181[]

// tag::RDX-182[]
export interface FetchSpacesSuccess<SpaceType extends Space, CustomType> {
  request: FetchSpacesRequest;
  response: FetchSpacesResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}
// end::RDX-182[]

// tag::RDX-183[]
export type SpaceRequest<SpaceType extends Space, CustomType> =  SpaceRequestOptions<SpaceType, CustomType>;
// end::RDX-183[]

// tag::RDX-184[]
export interface SpaceSuccess<SpaceType extends Space, CustomType> {
  request: SpaceRequest<SpaceType, CustomType>;
  response: SpaceResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}
// end::RDX-184[]

// tag::RDX-185[]
export interface SpaceResponse<SpaceType extends Space, CustomType> {
  status: string;
  data: SpaceResponseItem<SpaceType, CustomType>
}
// end::RDX-185[]

// tag::RDX-186[]
export interface SpaceError<SpaceType extends Space, CustomType> {
  request: SpaceRequest<SpaceType, CustomType>;
  status: PubNubApiStatus;
}
// end::RDX-186[]

// tag::RDX-187[]
export interface FetchSpaceByIdRequest extends SpaceFetchRequestOptions {
  spaceId: string;
}
// end::RDX-187[]

// tag::RDX-188[]
export interface FetchSpaceByIdSuccess<SpaceType extends Space, CustomType> {
  request: FetchSpaceByIdRequest;
  response: SpaceResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}
// end::RDX-188[]

// tag::RDX-189[]
export interface FetchSpaceByIdError {
  request: FetchSpaceByIdRequest;
  status: PubNubApiStatus;
}
// end::RDX-189[]

// tag::RDX-190[]
export interface DeleteSpaceRequest {
  spaceId: string;
}
// end::RDX-190[]

// tag::RDX-191[]
export interface DeleteSpaceResponse {
  status: number,
  request: DeleteSpaceRequest,
}
// end::RDX-191[]

// tag::RDX-192[]
export interface DeleteSpaceSuccess {
  request: DeleteSpaceRequest;
  response: DeleteSpaceResponse;
  status: PubNubApiStatus;
}
// end::RDX-192[]

// tag::RDX-193[]
export interface DeleteSpaceError {
  request: DeleteSpaceRequest,
  status: PubNubApiStatus;
}
// end::RDX-193[]

// tag::RDX-101[]
export interface FetchingSpacesAction<MetaType> {
  type: typeof SpaceActionType.FETCHING_SPACES;
  payload: FetchSpacesRequest
  meta?: MetaType;
}
// end::RDX-101[]

// tag::RDX-100[]
export interface SpacesRetrievedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACES_RETRIEVED;
  payload: FetchSpacesSuccess<SpaceType, CustomType>;
  meta?: MetaType;
}
// end::RDX-100[]

// tag::RDX-102[]
export interface ErrorFetchingSpacesAction<MetaType> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACES;
  payload: FetchSpacesError;
  meta?: MetaType;
  error: true;
}
// end::RDX-102[]

// tag::RDX-113[]
export interface FetchingSpaceByIdAction<MetaType> {
  type: typeof SpaceActionType.FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdRequest;
  meta?: MetaType;
}
// end::RDX-113[]

// tag::RDX-112[]
export interface SpaceRetrievedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_RETRIEVED;
  payload: FetchSpaceByIdSuccess<SpaceType, CustomType>;
  meta?: MetaType;
}
// end::RDX-112[]

// tag::RDX-114[]
export interface ErrorFetchingSpaceByIdAction<MetaType> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdError;
  meta?: MetaType;
  error: true;
}
// end::RDX-114[]

// tag::RDX-104[]
export interface CreatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.CREATING_SPACE;
  payload: SpaceRequest<SpaceType, CustomType>
  meta?: MetaType;
}
// end::RDX-104[]

// tag::RDX-103[]
export interface SpaceCreatedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_CREATED;
  payload: SpaceSuccess<SpaceType, CustomType>;
  meta?: MetaType;
}
// end::RDX-103[]

// tag::RDX-105[]
export interface ErrorCreatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.ERROR_CREATING_SPACE;
  payload: SpaceError<SpaceType, CustomType>;
  meta?: MetaType;
  error: true,
}
// end::RDX-105[]

// tag::RDX-107[]
export interface UpdatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.UPDATING_SPACE;
  payload: SpaceRequest<SpaceType, CustomType>
  meta?: MetaType;
}
// end::RDX-107[]

// tag::RDX-106[]
export interface SpaceUpdatedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.SPACE_UPDATED;
  payload: SpaceSuccess<SpaceType, CustomType>;
  meta?: MetaType;
}
// end::RDX-106[]

// tag::RDX-108[]
export interface ErrorUpdatingSpaceAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof SpaceActionType.ERROR_UPDATING_SPACE;
  payload: SpaceError<SpaceType, CustomType>;
  meta?: MetaType;
  error: true;
}
// end::RDX-108[]

// tag::RDX-110[]
export interface DeletingSpaceAction<MetaType> {
  type: typeof SpaceActionType.DELETING_SPACE;
  payload: DeleteSpaceRequest;
  meta?: MetaType;
}
// end::RDX-110[]

// tag::RDX-109[]
export interface SpaceDeletedAction<MetaType> {
  type: typeof SpaceActionType.SPACE_DELETED;
  payload: DeleteSpaceSuccess;
  meta?: MetaType;
}
// end::RDX-109[]

// tag::RDX-111[]
export interface ErrorDeletingSpaceAction<MetaType> {
  type: typeof SpaceActionType.ERROR_DELETING_SPACE;
  payload: DeleteSpaceError;
  meta?: MetaType;
  error: true;
}
// end::RDX-111[]

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
  | DeletingSpaceAction<MetaType>
  | SpaceDeletedAction<MetaType>
  | ErrorDeletingSpaceAction<MetaType>;

export type SpaceListenerActions<SpaceType extends Space, CustomType> =
  | SpaceUpdatedEventAction<SpaceType, CustomType>
  | SpaceDeletedEventAction<SpaceType, CustomType>;
