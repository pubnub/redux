import { SpaceActionType } from './SpaceActionType.enum';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-type-space[]
export interface Space<CustomSpaceFields extends ObjectsCustom = AnyCustom> {
  id: string;
  name: string;
  description?: string;
  custom?: CustomSpaceFields;
  created?: string;
  updated?: string;
  eTag?: string;
}
// end::RDX-type-space[]

// tag::RDX-type-spacepage[]
export interface SpacePage {
  next?: string;
  prev?: string;
}
// end::RDX-type-spacepage[]

// tag::RDX-type-space-options[]
export interface SpaceRequestOptions {
  limit?: number;
  page?: SpacePage;
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}
// end::RDX-type-space-options[]

// tag::RDX-event-space[]
export interface SpaceEventMessage<ReceivedSpace extends Space<ObjectsCustom>> {
  data: ReceivedSpace;
  event: string;
  type: string;
}
// end::RDX-event-space[]

// tag::RDX-type-space-fetch-options[]
export type FetchSpacesRequest = SpaceRequestOptions;
// end::RDX-type-space-fetch-options[]

type FetchSpacesRequest = SpaceRequestOptions;

// tag::RDX-type-space-fetch-response[]
export interface FetchSpacesResponse<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  status: string;
  data: ReceivedSpace[];
}
// end::RDX-type-space-fetch-response[]

// tag::RDX-type-space-fetch-error[]
export interface FetchSpacesError {
  request: FetchSpacesRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-space-fetch-error[]

// tag::RDX-type-space-fetch-success[]
export interface FetchSpacesSuccess<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  request: FetchSpacesRequest;
  response: FetchSpacesResponse<ReceivedSpace>;
  status: PubNubApiStatus;
}
// end::RDX-type-space-fetch-success[]

// tag::RDX-type-space-request[]
export interface SpaceRequest
  extends Space<ObjectsCustom>,
    SpaceRequestOptions {}
// end::RDX-type-space-request[]

// tag::RDX-type-space-success[]
export interface SpaceSuccess<ReceivedSpace extends Space<ObjectsCustom>> {
  request: SpaceRequest;
  response: SpaceResponse<ReceivedSpace>;
  status: PubNubApiStatus;
}
// end::RDX-type-space-success[]

// tag::RDX-type-space-response[]
export interface SpaceResponse<ReceivedSpace extends Space<ObjectsCustom>> {
  status: string;
  data: ReceivedSpace;
}
// end::RDX-type-space-response[]

// tag::RDX-type-space-error[]
export interface SpaceError {
  request: SpaceRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-space-error[]

// tag::RDX-type-space-fetchbyid-options[]
export interface FetchSpaceByIdRequest extends SpaceRequestOptions {
  spaceId: string;
}
// end::RDX-type-space-fetchbyid-options[]

// tag::RDX-type-space-fetchbyid-success[]
export interface FetchSpaceByIdSuccess<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  request: FetchSpaceByIdRequest;
  response: SpaceResponse<ReceivedSpace>;
  status: PubNubApiStatus;
}
// end::RDX-type-space-fetchbyid-success[]

// tag::RDX-type-space-fetchbyid-error[]
export interface FetchSpaceByIdError {
  request: FetchSpaceByIdRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-space-fetchbyid-error[]

// tag::RDX-type-space-delete-request[]
export interface DeleteSpaceRequest {
  spaceId: string;
}
// end::RDX-type-space-delete-request[]

// tag::RDX-type-space-delete-response[]
export interface DeleteSpaceResponse {
  status: number;
  request: DeleteSpaceRequest;
}
// end::RDX-type-space-delete-response[]

// tag::RDX-type-space-delete-success[]
export interface DeleteSpaceSuccess {
  request: DeleteSpaceRequest;
  response: DeleteSpaceResponse;
  status: PubNubApiStatus;
}
// end::RDX-type-space-delete-success[]

// tag::RDX-type-space-delete-error[]
export interface DeleteSpaceError {
  request: DeleteSpaceRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-space-delete-error[]

// tag::RDX-action-spaces-fetch[]
export interface FetchingSpacesAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.FETCHING_SPACES;
  payload: FetchSpacesRequest;
  meta?: Meta;
}
// end::RDX-action-spaces-fetch[]

// tag::RDX-action-spaces-fetch-success[]
export interface SpacesRetrievedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACES_RETRIEVED;
  payload: FetchSpacesSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-action-spaces-fetch-success[]

// tag::RDX-action-spaces-fetch-error[]
export interface ErrorFetchingSpacesAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACES;
  payload: FetchSpacesError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-spaces-fetch-error[]

// tag::RDX-action-space-fetchbyid[]
export interface FetchingSpaceByIdAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdRequest;
  meta?: Meta;
}
// end::RDX-action-space-fetchbyid[]

// tag::RDX-action-space-retrieved-success[]
export interface SpaceRetrievedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_RETRIEVED;
  payload: FetchSpaceByIdSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-action-space-retrieved-success[]

// tag::RDX-action-space-retrieved-error[]
export interface ErrorFetchingSpaceByIdAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_FETCHING_SPACE_BY_ID;
  payload: FetchSpaceByIdError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-space-retrieved-error[]

// tag::RDX-action-space-create[]
export interface CreatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.CREATING_SPACE;
  payload: SpaceRequest;
  meta?: Meta;
}
// end::RDX-action-space-create[]

// tag::RDX-action-space-create-success[]
export interface SpaceCreatedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_CREATED;
  payload: SpaceSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-action-space-create-success[]

// tag::RDX-action-space-create-error[]
export interface ErrorCreatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_CREATING_SPACE;
  payload: SpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-space-create-error[]

// tag::RDX-action-space-update[]
export interface UpdatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.UPDATING_SPACE;
  payload: SpaceRequest;
  meta?: Meta;
}
// end::RDX-action-space-update[]

// tag::RDX-action-space-update-success[]
export interface SpaceUpdatedAction<
  ReceivedSpace extends Space<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof SpaceActionType.SPACE_UPDATED;
  payload: SpaceSuccess<ReceivedSpace>;
  meta?: Meta;
}
// end::RDX-action-space-update-success[]

// tag::RDX-action-space-update-error[]
export interface ErrorUpdatingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_UPDATING_SPACE;
  payload: SpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-space-update-error[]

// tag::RDX-action-space-delete[]
export interface DeletingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.DELETING_SPACE;
  payload: DeleteSpaceRequest;
  meta?: Meta;
}
// end::RDX-action-space-delete[]

// tag::RDX-action-space-delete-success[]
export interface SpaceDeletedAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.SPACE_DELETED;
  payload: DeleteSpaceSuccess;
  meta?: Meta;
}
// end::RDX-action-space-delete-success[]

// tag::RDX-action-space-delete-error[]
export interface ErrorDeletingSpaceAction<Meta extends ActionMeta> {
  type: typeof SpaceActionType.ERROR_DELETING_SPACE;
  payload: DeleteSpaceError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-space-delete-error[]

// tag::RDX-event-space-updated[]
export interface SpaceUpdatedEventAction<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  type: typeof SpaceActionType.SPACE_UPDATED_EVENT;
  payload: SpaceEventMessage<ReceivedSpace>;
}
// end::RDX-event-space-updated[]

// tag::RDX-event-space-deleted[]
export interface SpaceDeletedEventAction<
  ReceivedSpace extends Space<ObjectsCustom>
> {
  type: typeof SpaceActionType.SPACE_DELETED_EVENT;
  payload: SpaceEventMessage<ReceivedSpace>;
}
// end::RDX-event-space-deleted[]

// tag::RDX-action-space[]
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
// end::RDX-action-space[]

// tag::RDX-action-space-listener[]
export type SpaceListenerActions<ReceivedSpace extends Space<ObjectsCustom>> =
  | SpaceUpdatedEventAction<ReceivedSpace>
  | SpaceDeletedEventAction<ReceivedSpace>;
// end::RDX-action-space-listener[]
