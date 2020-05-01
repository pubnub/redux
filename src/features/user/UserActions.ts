import Pubnub from 'pubnub';
import { UserActionType } from './UserActionType.enum';
import { ActionMeta } from '../../foundations/ActionMeta';
import { ObjectsCustom, AnyCustom } from 'foundations/ObjectsCustom';

// tag::RDX-type-user[]
export interface User<CustomSpaceFields extends ObjectsCustom = AnyCustom> {
  id: string;
  name: string;
  externalId?: string;
  profileUrl?: string;
  email?: string;
  custom?: CustomSpaceFields;
  created?: string;
  updated?: string;
  eTag?: string;
}
// end::RDX-type-user[]

// tag::RDX-type-userpage[]
export interface UserPage {
  next?: string;
  prev?: string;
}
// end::RDX-type-userpage[]

// tag::RDX-type-user-options[]
export interface UserRequestOptions {
  limit?: number;
  page?: UserPage;
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}
// end::RDX-type-user-options[]

// tag::RDX-type-user-request[]
export interface UserRequest extends User<ObjectsCustom>, UserRequestOptions {}
// end::RDX-type-user-request[]

// tag::RDX-type-user-response[]
export interface UserResponse<ReceivedUser extends User<ObjectsCustom>> {
  status: number;
  data: ReceivedUser;
}
// end::RDX-type-user-response[]

// tag::RDX-type-user-fetchbyid-request[]
export interface FetchUserByIdRequest extends UserRequestOptions {
  userId: string;
}
// end::RDX-type-user-fetchbyid-request[]

// tag::RDX-type-user-fetch-request[]
export type FetchUsersRequest = UserRequestOptions;
// end::RDX-type-user-fetch-request[]

// tag::RDX-type-user-fetch-response[]
export interface FetchUsersResponse<ReceivedUser extends User<ObjectsCustom>> {
  status: number;
  data: ReceivedUser[];
}
// end::RDX-type-user-fetch-response[]

// tag::RDX-user-eventmessage[]
export interface UserEventMessage<ReceivedUser extends User<ObjectsCustom>> {
  data: ReceivedUser;
  event: string;
  type: string;
}
// end::RDX-user-eventmessage[]

export type UserListenerPayload<ReceivedUser extends User<ObjectsCustom>> = {
  message: UserEventMessage<ReceivedUser>;
};

// tag::RDX-type-user-fetch-success-event[]
export interface FetchUsersSuccess<ReceivedUser extends User<ObjectsCustom>> {
  request: FetchUsersRequest;
  response: FetchUsersResponse<ReceivedUser>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-fetch-success-event[]

// tag::RDX-type-user-fetch-error-event[]
export interface FetchUsersError {
  request: FetchUsersRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-fetch-error-event[]

// tag::RDX-type-user-success[]
export interface UserSuccess<ReceivedUser extends User<ObjectsCustom>> {
  request: UserRequest;
  response: UserResponse<ReceivedUser>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-success[]

// tag::RDX-type-user-error[]
export interface UserError {
  request: UserRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-error[]

// tag::RDX-type-user-fetechbyid-success[]
export interface FetchUserByIdSuccess<
  ReceivedUser extends User<ObjectsCustom>
> {
  request: FetchUserByIdRequest;
  response: UserResponse<ReceivedUser>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-fetechbyid-success[]

// tag::RDX-type-user-fetchbyid-error-event[]
export interface FetchUserByIdError {
  request: FetchUserByIdRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-fetchbyid-error-event[]

// tag::RDX-type-user-delete-request[]
export interface DeleteUserRequest {
  userId: string;
}
// end::RDX-type-user-delete-request[]

// tag::RDX-type-user-delete-event[]
export interface DeleteUserSuccess {
  request: DeleteUserRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-delete-event[]

// tag::RDX-type-user-delete-error-request[]
export interface DeleteUserError {
  request: DeleteUserRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-user-delete-error-request[]

// tag::RDX-type-user-fetch[]
export interface FetchingUsersAction<Meta extends ActionMeta> {
  type: typeof UserActionType.FETCHING_USERS;
  payload: FetchUsersRequest;
  meta?: Meta;
}
// end::RDX-type-user-fetch[]

// tag::RDX-type-user-fetch-success[]
export interface UsersRetrievedAction<
  ReceivedUser extends User<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof UserActionType.USERS_RETRIEVED;
  payload: FetchUsersSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-type-user-fetch-success[]

// tag::RDX-type-user-fetch-error[]
export interface ErrorFetchingUsersAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_FETCHING_USERS;
  payload: FetchUsersError;
  meta?: Meta;
  error: true;
}
// end::RDX-type-user-fetch-error[]

// tag::RDX-type-user-fetchbyid[]
export interface FetchingUserByIdAction<Meta extends ActionMeta> {
  type: typeof UserActionType.FETCHING_USER_BY_ID;
  payload: FetchUserByIdRequest;
  meta?: Meta;
}
// end::RDX-type-user-fetchbyid[]

// tag::RDX-type-user-fetchbyid-success[]
export interface UserRetrievedAction<
  ReceivedUser extends User<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof UserActionType.USER_RETRIEVED;
  payload: FetchUserByIdSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-type-user-fetchbyid-success[]

// tag::RDX-type-user-fetchbyid-error[]
export interface ErrorFetchingUserByIdAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_FETCHING_USER_BY_ID;
  payload: FetchUserByIdError;
  meta?: Meta;
  error: true;
}
// end::RDX-type-user-fetchbyid-error[]

// tag::RDX-type-user-create[]
export interface CreatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.CREATING_USER;
  payload: UserRequest;
  meta?: Meta;
}
// end::RDX-type-user-create[]

// tag::RDX-type-user-create-success[]
export interface UserCreatedAction<
  ReceivedUser extends User<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof UserActionType.USER_CREATED;
  payload: UserSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-type-user-create-success[]

// tag::RDX-type-user-create-error[]
export interface ErrorCreatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_CREATING_USER;
  payload: UserError;
  meta?: Meta;
  error: true;
}
// end::RDX-type-user-create-error[]

// tag::RDX-type-user-update[]
export interface UpdatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.UPDATING_USER;
  payload: UserRequest;
  meta?: Meta;
}
// end::RDX-type-user-update[]

// tag::RDX-type-user-update-success[]
export interface UserUpdatedAction<
  ReceivedUser extends User<ObjectsCustom>,
  Meta extends ActionMeta
> {
  type: typeof UserActionType.USER_UPDATED;
  payload: UserSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-type-user-update-success[]

// tag::RDX-type-user-update-error[]
export interface ErrorUpdatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_UPDATING_USER;
  payload: UserError;
  meta?: Meta;
  error: true;
}
// end::RDX-type-user-update-error[]

// tag::RDX-type-user-delete[]
export interface DeletingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.DELETING_USER;
  payload: DeleteUserRequest;
  meta?: Meta;
}
// end::RDX-type-user-delete[]

// tag::RDX-type-user-delete-success[]
export interface UserDeletedAction<Meta extends ActionMeta> {
  type: typeof UserActionType.USER_DELETED;
  payload: DeleteUserSuccess;
  meta?: Meta;
}
// end::RDX-type-user-delete-success[]

// tag::RDX-type-user-delete-error[]
export interface ErrorDeletingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_DELETING_USER;
  payload: DeleteUserError;
  meta?: Meta;
  error: true;
}
// end::RDX-type-user-delete-error[]

// tag::RDX-event-user-updated-action[]
export interface UserUpdatedEventAction<
  ReceivedUser extends User<ObjectsCustom>
> {
  type: typeof UserActionType.USER_UPDATED_EVENT;
  payload: UserEventMessage<ReceivedUser>;
}
// end::RDX-event-user-updated-action[]

// tag::RDX-event-user-deleted-action[]
export interface UserDeletedEventAction<
  ReceivedUser extends User<ObjectsCustom>
> {
  type: typeof UserActionType.USER_DELETED_EVENT;
  payload: UserEventMessage<ReceivedUser>;
}
// end::RDX-event-user-deleted-action[]

// tag::RDX-action-user[]
export type UserActions<
  ReceivedUser extends User<ObjectsCustom>,
  Meta extends ActionMeta
> =
  | FetchingUsersAction<Meta>
  | UsersRetrievedAction<ReceivedUser, Meta>
  | ErrorFetchingUsersAction<Meta>
  | FetchingUserByIdAction<Meta>
  | UserRetrievedAction<ReceivedUser, Meta>
  | ErrorFetchingUserByIdAction<Meta>
  | CreatingUserAction<Meta>
  | UserCreatedAction<ReceivedUser, Meta>
  | ErrorCreatingUserAction<Meta>
  | UpdatingUserAction<Meta>
  | UserUpdatedAction<ReceivedUser, Meta>
  | ErrorUpdatingUserAction<Meta>
  | DeletingUserAction<Meta>
  | UserDeletedAction<Meta>
  | ErrorDeletingUserAction<Meta>;
// end::RDX-action-user[]

// tag::RDX-action-user-listener[]
export type UserListenerActions<ReceivedUser extends User<ObjectsCustom>> =
  | UserUpdatedEventAction<ReceivedUser>
  | UserDeletedEventAction<ReceivedUser>;
// end::RDX-action-user-listener[]
