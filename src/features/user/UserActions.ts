import { UserActionType } from './UserActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';

// tag::RDX-027[]
export interface User<CustomSpaceFields extends ObjectsCustom> {
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
// end::RDX-027[]

export interface AnyUser extends User<AnyCustom> {}

export interface UserPage {
  next?: string;
  prev?: string;
}

export interface UserRequestOptions {
  limit?: number,
  page?: UserPage,
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}

export interface UserEventMessage<ReceivedUser extends User<ObjectsCustom>> {
  data: ReceivedUser;
  event: string;
  type: string;
}

export type FetchUsersRequest = UserRequestOptions;

export interface FetchUsersResponse<ReceivedUser extends User<ObjectsCustom>> {
  status: string,
  data: ReceivedUser[];
}

export interface FetchUsersError {
  request: FetchUsersRequest;
  status: PubNubApiStatus;
}

export interface FetchUsersSuccess<ReceivedUser extends User<ObjectsCustom>> {
  request: FetchUsersRequest;
  response: FetchUsersResponse<ReceivedUser>;
  status: PubNubApiStatus;
}

export interface UserRequest extends User<ObjectsCustom>, UserRequestOptions {}

export interface UserSuccess<ReceivedUser extends User<ObjectsCustom>> {
  request: UserRequest;
  response: UserResponse<ReceivedUser>;
  status: PubNubApiStatus;
}

export interface UserResponse<ReceivedUser extends User<ObjectsCustom>> {
  status: string;
  data: ReceivedUser
}

export interface UserError {
  request: UserRequest;
  status: PubNubApiStatus;
}

export interface FetchUserByIdRequest extends UserRequestOptions {
  userId: string;
}

export interface FetchUserByIdSuccess<ReceivedUser extends User<ObjectsCustom>> {
  request: FetchUserByIdRequest;
  response: UserResponse<ReceivedUser>;
  status: PubNubApiStatus;
}

export interface FetchUserByIdError {
  request: FetchUserByIdRequest;
  status: PubNubApiStatus;
}

export interface DeleteUserRequest {
  userId: string;
}

export interface DeleteUserResponse {
  status: number,
  request: DeleteUserRequest,
}

export interface DeleteUserSuccess {
  request: DeleteUserRequest;
  response: DeleteUserResponse;
  status: PubNubApiStatus;
}

export interface DeleteUserError {
  request: DeleteUserRequest,
  status: PubNubApiStatus;
}

// tag::RDX-094[]
export interface FetchingUsersAction<Meta extends ActionMeta> {
  type: typeof UserActionType.FETCHING_USERS;
  payload: FetchUsersRequest;
  meta?: Meta;
}
// end::RDX-094[]
  
// tag::RDX-095[]
export interface UsersRetrievedAction<ReceivedUser extends User<ObjectsCustom>, Meta extends ActionMeta> {
  type: typeof UserActionType.USERS_RETRIEVED;
  payload: FetchUsersSuccess<ReceivedUser>,
  meta?: Meta;
}
// end::RDX-095[]

// tag::RDX-096[]
export interface ErrorFetchingUsersAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_FETCHING_USERS;
  payload: FetchUsersError;
  meta?: Meta;
  error: true;
}
// end::RDX-096[]

// tag::RDX-098[]
export interface FetchingUserByIdAction<Meta extends ActionMeta> {
  type: typeof UserActionType.FETCHING_USER_BY_ID;
  payload: FetchUserByIdRequest;
  meta?: Meta;
}
// end::RDX-098[]

// tag::RDX-099[]
export interface UserRetrievedAction<ReceivedUser extends User<ObjectsCustom>, Meta extends ActionMeta> {
  type: typeof UserActionType.USER_RETRIEVED;
  payload: FetchUserByIdSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-099[]

// tag::RDX-097[]
export interface ErrorFetchingUserByIdAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_FETCHING_USER_BY_ID;
  payload: FetchUserByIdError;
  meta?: Meta;
  error: true;
}
// end::RDX-097[]

// tag::RDX-092[]
export interface CreatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.CREATING_USER;
  payload: UserRequest
  meta?: Meta;
}
// end::RDX-092[]

// tag::RDX-091[]
export interface UserCreatedAction<ReceivedUser extends User<ObjectsCustom>, Meta extends ActionMeta> {
  type: typeof UserActionType.USER_CREATED;
  payload: UserSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-091[]

// tag::RDX-093[]
export interface ErrorCreatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_CREATING_USER;
  payload: UserError;
  meta?: Meta;
  error: true,
}
// end::RDX-093[]

// tag::RDX-086[]
export interface UpdatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.UPDATING_USER;
  payload: UserRequest
  meta?: Meta;
}
// end::RDX-086[]

// tag::RDX-085[]
export interface UserUpdatedAction<ReceivedUser extends User<ObjectsCustom>, Meta extends ActionMeta> {
  type: typeof UserActionType.USER_UPDATED;
  payload: UserSuccess<ReceivedUser>;
  meta?: Meta;
}
// end::RDX-085[]

// tag::RDX-087[]
export interface ErrorUpdatingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_UPDATING_USER;
  payload: UserError;
  meta?: Meta;
  error: true;
}
// end::RDX-087[]

// tag::RDX-089[]
export interface DeletingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.DELETING_USER;
  payload: DeleteUserRequest;
  meta?: Meta;
}
// end::RDX-089[]

// tag::RDX-088[]
export interface UserDeletedAction<Meta extends ActionMeta> {
  type: typeof UserActionType.USER_DELETED;
  payload: DeleteUserSuccess;
  meta?: Meta;
}
// end::RDX-088[]

// tag::RDX-090[]
export interface ErrorDeletingUserAction<Meta extends ActionMeta> {
  type: typeof UserActionType.ERROR_DELETING_USER;
  payload: DeleteUserError;
  meta?: Meta;
  error: true;
}
// end::RDX-090[]

export interface UserUpdatedEventAction<ReceivedUser extends User<ObjectsCustom>> {
  type: typeof UserActionType.USER_UPDATED_EVENT;
  payload: UserEventMessage<ReceivedUser>;
}

export interface UserDeletedEventAction<ReceivedUser extends User<ObjectsCustom>> {
  type: typeof UserActionType.USER_DELETED_EVENT;
  payload: UserEventMessage<ReceivedUser>;
}

export type UserActions<ReceivedUser extends User<ObjectsCustom>, Meta extends ActionMeta> =
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

export type UserListenerActions<ReceivedUser extends User<ObjectsCustom>> =
  | UserUpdatedEventAction<ReceivedUser>
  | UserDeletedEventAction<ReceivedUser>;
