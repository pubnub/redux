import { SpaceActionType } from './SpaceActionType.enum';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-025[]
export interface Space<CustomSpaceFields extends ObjectsCustom = AnyCustom> {
  id: string;
  name: string;
  description?: string;
  custom?: CustomSpaceFields;
  created?: string;
  updated?: string;
  eTag?: string;
}
// end::RDX-025[]

// tag::RDX-064[]
export interface SpacePage {
  next?: string;
  prev?: string;
}
// end::RDX-064[]

// tag::RDX-066[]
export interface SpaceRequestOptions {
  limit?: number;
  page?: SpacePage;
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}
// end::RDX-066[]

// tag::RDX-178[]
export interface SpaceEventMessage<ReceivedSpace extends Space<ObjectsCustom>> {
  data: ReceivedSpace;
  event: string;
  type: string;
}
// end::RDX-178[]

// tag::RDX-179[]
export type FetchSpacesRequest = SpaceRequestOptions;
// end::RDX-179[]

type FetchSpacesRequest = SpaceRequestOptions;

// tag::RDX-180[]
export interface FetchSpacesResponse<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  status: string;
  data: ReceivedSpace[];
}
// end::RDX-180[]

// tag::RDX-181[]
export interface FetchSpacesError {
  request: FetchSpacesRequest;
  status: PubNubApiStatus;
}
// end::RDX-181[]

// tag::RDX-182[]
export interface FetchSpacesSuccess<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  request: FetchSpacesRequest;
  response: FetchSpacesResponse<ReceivedSpace>;
  status: PubNubApiStatus;
}
// end::RDX-182[]

// tag::RDX-183[]
export interface SpaceRequest
  extends Space<ObjectsCustom>,
    SpaceRequestOptions {}
// end::RDX-183[]

// tag::RDX-184[]
export interface SpaceSuccess<ReceivedSpace extends Space<ObjectsCustom>> {
  request: SpaceRequest;
  response: SpaceResponse<ReceivedSpace>;
  status: PubNubApiStatus;
}
// end::RDX-184[]

// tag::RDX-185[]
export interface SpaceResponse<ReceivedSpace extends Space<ObjectsCustom>> {
  status: string;
  data: ReceivedSpace;
}
// end::RDX-185[]

// tag::RDX-186[]
export interface SpaceError {
  request: SpaceRequest;
  status: PubNubApiStatus;
}
// end::RDX-186[]

// tag::RDX-187[]
export interface FetchSpaceByIdRequest extends SpaceRequestOptions {
  spaceId: string;
}
// end::RDX-187[]

// tag::RDX-188[]
export interface FetchSpaceByIdSuccess<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  request: FetchSpaceByIdRequest;
  response: SpaceResponse<ReceivedSpace>;
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
  status: number;
  request: DeleteSpaceRequest;
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
  request: DeleteSpaceRequest;
  status: PubNubApiStatus;
}
// end::RDX-193[]

// tag::RDX-101[]
export interface FetchingSpacesAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.FETCHING_SPACES;
  payload: FetchSpacesRequest;
  meta?: Meta;
}
// end::RDX-101[]

// tag::RDX-100[]
export interface SpacesRetrievedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACES_RETRIEVED;
  payload: FetchSpacesSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-100[]

// tag::RDX-102[]
export interface ErrorFetchingSpacesAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACES;
  payload: FetchSpacesError;
  meta?: Meta;
  error: true;
}
// end::RDX-102[]

// tag::RDX-113[]
export interface FetchingSpaceByIdAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdRequest;
  meta?: Meta;
}
// end::RDX-113[]

// tag::RDX-112[]
export interface SpaceRetrievedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_RETRIEVED;
  payload: FetchSpaceByIdSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-112[]

// tag::RDX-114[]
export interface ErrorFetchingSpaceByIdAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdError;
  meta?: Meta;
  error: true;
}
// end::RDX-114[]

// tag::RDX-104[]
export interface CreatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.CREATING_SPACE;
  payload: SpaceRequest;
  meta?: Meta;
}
// end::RDX-104[]

// tag::RDX-103[]
export interface SpaceCreatedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_CREATED;
  payload: SpaceSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-103[]

// tag::RDX-105[]
export interface ErrorCreatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_CREATING_SPACE;
  payload: SpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-105[]

// tag::RDX-107[]
export interface UpdatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.UPDATING_SPACE;
  payload: SpaceRequest;
  meta?: Meta;
}
// end::RDX-107[]

// tag::RDX-106[]
export interface SpaceUpdatedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_UPDATED;
  payload: SpaceSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-106[]

// tag::RDX-108[]
export interface ErrorUpdatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_UPDATING_SPACE;
  payload: SpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-108[]

// tag::RDX-110[]
export interface DeletingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.DELETING_SPACE;
  payload: DeleteSpaceRequest;
  meta?: Meta;
}
// end::RDX-110[]

// tag::RDX-109[]
export interface SpaceDeletedAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.SPACE_DELETED;
  payload: DeleteSpaceSuccess;
  meta?: Meta;
}
// end::RDX-109[]

// tag::RDX-111[]
export interface ErrorDeletingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_DELETING_SPACE;
  payload: DeleteSpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-111[]

// tag::RDX-177[]
export interface SpaceUpdatedEventAction<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  type: typeof SpaceActionType.SPACE_UPDATED_EVENT;
  payload: SpaceEventMessage<ReceivedSpace>;
}
// end::RDX-177[]

// tag::RDX-194[]
export interface SpaceDeletedEventAction<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  type: typeof SpaceActionType.SPACE_DELETED_EVENT;
  payload: SpaceEventMessage<ReceivedSpace>;
}
// end::RDX-194[]

export type SpaceActions<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> =
  | FetchingSpacesAction<Meta>
  | SpacesRetrievedAction<ReceivedSpace, Meta>
  | ErrorFetchingSpacesAction<Meta>
  | FetchingSpaceByIdAction<Meta>
  | SpaceRetrievedAction<ReceivedSpace, Meta>
  | ErrorFetchingSpaceByIdAction<Meta>
  | CreatingSpaceAction<Meta>
  | SpaceCreatedAction<ReceivedSpace, Meta>
  | ErrorCreatingSpaceAction<Meta>
  | UpdatingSpaceAction<Meta>
  | SpaceUpdatedAction<ReceivedSpace, Meta>
  | ErrorUpdatingSpaceAction<Meta>
  | DeletingSpaceAction<Meta>
  | SpaceDeletedAction<Meta>
  | ErrorDeletingSpaceAction<Meta>;

export type SpaceListenerActions<ReceivedSpace extends Space<ObjectsCustom>> =
  | SpaceUpdatedEventAction<ReceivedSpace>
  | SpaceDeletedEventAction<ReceivedSpace>;
