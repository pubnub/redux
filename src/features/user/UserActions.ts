import { UserActionType } from './UserActionType.enum';
import { ActionMeta } from '../../common/ActionMeta';
import { PubNubApiStatus } from 'common/PubNubApi';

// tag::RDX-027[]
export interface User {
  id: string;
  name: string;
  externalId?: string;
  profileUrl?: string;
  email?: string;
}
// end::RDX-027[]

export type UserResponseItem<UserType extends User, CustomType> = {
  [KeyType in keyof UserType]: UserType[KeyType];
} & {
  custom?: CustomType;
  created: string,
  updated: string,
  eTag: string,
};

export interface UserPage {
  next?: string;
  prev?: string;
}

export interface UserFetchRequestOptions {
  limit: number,
  page: UserPage,
  include?: {
    customFields?: boolean;
  };
}

export type UserRequestOptions<UserType extends User, CustomType> = {
  [KeyType in keyof UserType]: UserType[KeyType];
} & {
  custom?: CustomType;
};

export interface UserEventMessage<UserType extends User, CustomType> {
  data: UserResponseItem<UserType, CustomType>;
  event: string;
  type: string;
}

export interface FetchUsersRequest {
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}

export interface FetchUsersResponse<UserType extends User, CustomType> {
  status: string,
  data: UserResponseItem<UserType, CustomType>[];
}

export interface FetchUsersError {
  request: FetchUsersRequest;
  status: PubNubApiStatus;
}

export interface FetchUsersSuccess<UserType extends User, CustomType> {
  request: FetchUsersRequest;
  response: FetchUsersResponse<UserType, CustomType>;
  status: PubNubApiStatus;
}

export type UserRequest<UserType extends User, CustomType> =  UserRequestOptions<UserType, CustomType>;

export interface UserSuccess<UserType extends User, CustomType> {
  request: UserRequest<UserType, CustomType>;
  response: UserResponse<UserType, CustomType>;
  status: PubNubApiStatus;
}

export interface UserResponse<UserType extends User, CustomType> {
  status: string;
  data: UserResponseItem<UserType, CustomType>
}

export interface UserError<UserType extends User, CustomType> {
  request: UserRequest<UserType, CustomType>;
  status: PubNubApiStatus;
}

export interface FetchUserByIdRequest extends UserFetchRequestOptions {
  userId: string;
}

export interface FetchUserByIdSuccess<UserType extends User, CustomType> {
  request: FetchUserByIdRequest;
  response: UserResponse<UserType, CustomType>;
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
export interface FetchingUsersAction<MetaType> {
  type: typeof UserActionType.FETCHING_USERS;
  payload: FetchUsersRequest
  meta?: ActionMeta<MetaType>;
}
// end::RDX-094[]
  
// tag::RDX-095[]
export interface UsersRetrievedAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.USERS_RETRIEVED;
  payload: FetchUsersSuccess<UserType, CustomType>,
  meta?: ActionMeta<MetaType>;
}
// end::RDX-095[]

// tag::RDX-096[]
export interface ErrorFetchingUsersAction<MetaType> {
  type: typeof UserActionType.ERROR_FETCHING_USERS;
  payload: FetchUsersError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-096[]

// tag::RDX-098[]
export interface FetchingUserByIdAction<MetaType> {
  type: typeof UserActionType.FETCHING_USER_BY_ID;
  payload: FetchUserByIdRequest;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-098[]

// tag::RDX-099[]
export interface UserRetrievedAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.USER_RETRIEVED;
  payload: FetchUserByIdSuccess<UserType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-099[]

// tag::RDX-097[]
export interface ErrorFetchingUserByIdAction<MetaType> {
  type: typeof UserActionType.ERROR_FETCHING_USER_BY_ID;
  payload: FetchUserByIdError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-097[]

// tag::RDX-092[]
export interface CreatingUserAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.CREATING_USER;
  payload: UserRequest<UserType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-092[]

// tag::RDX-091[]
export interface UserCreatedAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.USER_CREATED;
  payload: UserSuccess<UserType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-091[]

// tag::RDX-093[]
export interface ErrorCreatingUserAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.ERROR_CREATING_USER;
  payload: UserError<UserType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true,
}
// end::RDX-093[]

// tag::RDX-086[]
export interface UpdatingUserAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.UPDATING_USER;
  payload: UserRequest<UserType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-086[]

// tag::RDX-085[]
export interface UserUpdatedAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.USER_UPDATED;
  payload: UserSuccess<UserType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-085[]

// tag::RDX-087[]
export interface ErrorUpdatingUserAction<UserType extends User, CustomType, MetaType> {
  type: typeof UserActionType.ERROR_UPDATING_USER;
  payload: UserError<UserType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-087[]

// tag::RDX-089[]
export interface DeletingUserAction<MetaType> {
  type: typeof UserActionType.DELETING_USER;
  payload: DeleteUserRequest;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-089[]

// tag::RDX-088[]
export interface UserDeletedAction<MetaType> {
  type: typeof UserActionType.USER_DELETED;
  payload: DeleteUserSuccess;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-088[]

// tag::RDX-090[]
export interface ErrorDeletingUserAction<MetaType> {
  type: typeof UserActionType.ERROR_DELETING_USER;
  payload: DeleteUserError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-090[]

export interface UserUpdatedEventAction<UserType extends User, CustomType> {
  type: typeof UserActionType.USER_UPDATED_EVENT;
  payload: UserEventMessage<UserType, CustomType>;
}

export interface UserDeletedEventAction<UserType extends User, CustomType> {
  type: typeof UserActionType.USER_DELETED_EVENT;
  payload: UserEventMessage<UserType, CustomType>;
}

export type UserActions<UserType extends User, CustomType, MetaType> =
  | FetchingUsersAction<MetaType>
  | UsersRetrievedAction<UserType, CustomType, MetaType>
  | ErrorFetchingUsersAction<MetaType>
  | FetchingUserByIdAction<MetaType>
  | UserRetrievedAction<UserType, CustomType, MetaType>
  | ErrorFetchingUserByIdAction<MetaType>
  | CreatingUserAction<UserType, CustomType, MetaType>
  | UserCreatedAction<UserType, CustomType, MetaType>
  | ErrorCreatingUserAction<UserType, CustomType, MetaType>
  | UpdatingUserAction<UserType, CustomType, MetaType>
  | UserUpdatedAction<UserType, CustomType, MetaType>
  | ErrorUpdatingUserAction<UserType, CustomType, MetaType>
  | DeletingUserAction<ActionMeta>
  | UserDeletedAction<ActionMeta>
  | ErrorDeletingUserAction<MetaType>;

export type UserListenerActions<UserType extends User, CustomType> =
  | UserUpdatedEventAction<UserType, CustomType>
  | UserDeletedEventAction<UserType, CustomType>;
