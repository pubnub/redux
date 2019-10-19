import { MessageActionPayload } from './Message';
import { PresenceActionPayload } from './Presence';
import { StatusActionPayload } from './Status';
import { ObjectsActionPayload } from './Objects';
import { SignalActionPayload } from './Signal';
import { UserMap } from './User';
import { SpaceMap } from './Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  Identifiable,
} from './PubNubApi';
import { MembershipResult } from './Membership';

export const MESSAGE = 'pubnub/MESSAGE';
export const JOIN = 'pubnub/JOIN';
export const LEAVE = 'pubnub/LEAVE';
export const TIMEOUT = 'pubnub/TIMEOUT';
export const STATE_CHANGE = 'pubnub/STATE_CHANGE';
export const NETWORK_UP = 'pubnub/NETWORK_UP';
export const NETWORK_DOWN = 'pubnub/NETWORK_DOWN';
export const NETWORK_ISSUES = 'pubnub/NETWORK_ISSUES';
export const RECONNECTED = 'pubnub/RECONNECTED';
export const CONNECTED = 'pubnub/CONNECTED';
export const ACCESS_DENIED = 'pubnub/ACCESS_DENIED';
export const MALFORMED_RESPONSE = 'pubnub/MALFORMED_RESPONSE';
export const BAD_REQUEST = 'pubnub/BAD_REQUEST';
export const DECRYPTION_ERROR = 'pubnub/DECRYPTION_ERROR';
export const TIMEOUT_CONNECTION = 'pubnub/TIMEOUT_CONNECTION';
export const REQUEST_MESSAGE_COUNT_EXCEED =
  'pubnub/REQUEST_MESSAGE_COUNT_EXCEED';
export const UNKNOWN = 'pubnub/UNKNOWN';
export const OBJECTS_UPDATE_USER_BEGIN = 'pubnub/OBJECTS_UPDATE_USER_BEGIN';
export const OBJECTS_UPDATE_USER = 'pubnub/OBJECTS_UPDATE_USER';
export const OBJECTS_UPDATE_USER_ERROR = 'pubnub/OBJECTS_UPDATE_USER_ERROR';
export const OBJECTS_DELETE_USER_BEGIN = 'pubnub/OBJECTS_DELETE_USER_BEGIN';
export const OBJECTS_DELETE_USER = 'pubnub/OBJECTS_DELETE_USER';
export const OBJECTS_DELETE_USER_ERROR = 'pubnub/OBJECTS_DELETE_USER_ERROR';
export const OBJECTS_CREATE_USER_BEGIN = 'pubnub/OBJECTS_CREATE_USER_BEGIN';
export const OBJECTS_CREATE_USER = 'pubnub/OBJECTS_CREATE_USER';
export const OBJECTS_CREATE_USER_ERROR = 'pubnub/OBJECTS_CREATE_USER_ERROR';
export const OBJECTS_FETCH_USERS_BEGIN = 'pubnub/OBJECTS_FETCH_USERS_BEGIN';
export const OBJECTS_FETCH_USERS = 'pubnub/OBJECTS_FETCH_USERS';
export const OBJECTS_FETCH_USERS_ERROR = 'pubnub/OBJECTS_FETCH_USERS_ERROR';
export const OBJECTS_FETCH_USER_BY_ID_BEGIN =
  'pubnub/OBJECTS_FETCH_USER_BY_ID_BEGIN';
export const OBJECTS_FETCH_USER_BY_ID = 'pubnub/OBJECTS_FETCH_USER_BY_ID';
export const OBJECTS_FETCH_USER_BY_ID_ERROR =
  'pubnub/OBJECTS_FETCH_USER_BY_ID_ERROR';
export const OBJECTS_CREATE_SPACE = 'pubnub/OBJECTS_CREATE_SPACE';
export const OBJECTS_CREATE_SPACE_BEGIN = 'pubnub/OBJECTS_CREATE_SPACE_BEGIN';
export const OBJECTS_CREATE_SPACE_ERROR = 'pubnub/OBJECTS_CREATE_SPACE_ERROR';
export const OBJECTS_UPDATE_SPACE = 'pubnub/OBJECTS_UPDATE_SPACE';
export const OBJECTS_UPDATE_SPACE_BEGIN = 'pubnub/OBJECTS_UPDATE_SPACE_BEGIN';
export const OBJECTS_UPDATE_SPACE_ERROR = 'pubnub/OBJECTS_UPDATE_SPACE_ERROR';
export const OBJECTS_DELETE_SPACE = 'pubnub/OBJECTS_DELETE_SPACE';
export const OBJECTS_DELETE_SPACE_BEGIN = 'pubnub/OBJECTS_DELETE_SPACE_BEGIN';
export const OBJECTS_DELETE_SPACE_ERROR = 'pubnub/OBJECTS_DELETE_SPACE_ERROR';
export const OBJECTS_FETCH_SPACES = 'pubnub/OBJECTS_FETCH_SPACES';
export const OBJECTS_FETCH_SPACES_BEGIN = 'pubnub/OBJECTS_FETCH_SPACES_BEGIN';
export const OBJECTS_FETCH_SPACES_ERROR = 'pubnub/OBJECTS_FETCH_SPACES_ERROR';
export const OBJECTS_FETCH_SPACE_BY_ID = 'pubnub/OBJECTS_FETCH_SPACE_BY_ID';
export const OBJECTS_FETCH_SPACE_BY_ID_BEGIN =
  'pubnub/OBJECTS_FETCH_SPACE_BY_ID_BEGIN';
export const OBJECTS_FETCH_SPACE_BY_ID_ERROR =
  'pubnub/OBJECTS_FETCH_SPACE_BY_ID_ERROR';
export const OBJECTS_USER_ADDED_TO_SPACE = 'pubnub/OBJECTS_USER_ADDED_TO_SPACE';
export const OBJECTS_USER_REMOVED_FROM_SPACE =
  'pubnub/OBJECTS_USER_REMOVED_FROM_SPACE';
export const OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE =
  'pubnub/OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE';
export const OBJECTS_FETCH_MEMBERS_BEGIN = 'pubnub/OBJECTS_FETCH_MEMBERS_BEGIN';
export const OBJECTS_FETCH_MEMBERS = 'pubnub/OBJECTS_FETCH_MEMBERS';
export const OBJECTS_FETCH_MEMBERS_ERROR = 'pubnub/OBJECTS_FETCH_MEMBERS_ERROR';
export const OBJECTS_UPDATE_MEMBERS_BEGIN =
  'pubnub/OBJECTS_UPDATE_MEMBERS_BEGIN';
export const OBJECTS_UPDATE_MEMBERS = 'pubnub/OBJECTS_UPDATE_MEMBERS';
export const OBJECTS_UPDATE_MEMBERS_ERROR =
  'pubnub/OBJECTS_UPDATE_MEMBERS_ERROR';
export const OBJECTS_ADD_MEMBERS_BEGIN = 'pubnub/OBJECTS_ADD_MEMBERS_BEGIN';
export const OBJECTS_MEMBERS_ADDED = 'pubnub/OBJECTS_MEMBERS_ADDED';
export const OBJECTS_ADD_MEMBERS_ERROR = 'pubnub/OBJECTS_ADD_MEMBERS_ERROR';
export const OBJECTS_REMOVE_MEMBERS_BEGIN =
  'pubnub/OBJECTS_REMOVE_MEMBERS_BEGIN';
export const OBJECTS_MEMBERS_REMOVED = 'pubnub/OBJECTS_MEMBERS_REMOVED';
export const OBJECTS_REMOVE_MEMBERS_ERROR =
  'pubnub/OBJECTS_REMOVE_MEMBERS_ERROR';
export const OBJECTS_FETCH_MEMBERSHIPS_BEGIN =
  'pubnub/OBJECTS_FETCH_MEMBERSHIPS_BEGIN';
export const OBJECTS_FETCH_MEMBERSHIPS = 'pubnub/OBJECTS_FETCH_MEMBERSHIPS';
export const OBJECTS_FETCH_MEMBERSHIPS_ERROR =
  'pubnub/OBJECTS_FETCH_MEMBERSHIPS_ERROR';
export const OBJECTS_UPDATE_MEMBERSHIP_BEGIN =
  'pubnub/OBJECTS_UPDATE_MEMBERSHIP_BEGIN';
export const OBJECTS_UPDATE_MEMBERSHIP = 'pubnub/OBJECTS_UPDATE_MEMBERSHIP';
export const OBJECTS_UPDATE_MEMBERSHIP_ERROR =
  'pubnub/OBJECTS_UPDATE_MEMBERSHIP_ERROR';
export const OBJECTS_JOIN_SPACES_BEGIN = 'pubnub/OBJECTS_JOIN_SPACES_BEGIN';
export const OBJECTS_SPACES_JOINED = 'pubnub/OBJECTS_SPACES_JOINED';
export const OBJECTS_JOIN_SPACES_ERROR = 'pubnub/OBJECTS_JOIN_SPACES_ERROR';
export const OBJECTS_LEAVE_SPACES_BEGIN = 'pubnub/OBJECTS_LEAVE_SPACES_BEGIN';
export const OBJECTS_SPACES_LEFT = 'pubnub/OBJECTS_SPACES_LEFT';
export const OBJECTS_LEAVE_SPACES_ERROR = 'pubnub/OBJECTS_LEAVE_SPACES_ERROR';
export const SIGNAL = 'pubnub/SIGNAL';

export interface JoinAction {
  type: typeof JOIN;
  payload: PresenceActionPayload;
}

export interface LeaveAction {
  type: typeof LEAVE;
  payload: PresenceActionPayload;
}

export interface TimeoutAction {
  type: typeof TIMEOUT;
  payload: PresenceActionPayload;
}

export interface StateChangeAction {
  type: typeof STATE_CHANGE;
  payload: PresenceActionPayload;
}

export interface NetworkUpAction {
  type: typeof NETWORK_UP;
}

export interface NetworkDownAction {
  type: typeof NETWORK_DOWN;
}

export interface NetworkIssuesAction {
  type: typeof NETWORK_ISSUES;
  payload: StatusActionPayload;
}

export interface ReconnectedAction {
  type: typeof RECONNECTED;
  payload: StatusActionPayload;
}

export interface ConnectedAction {
  type: typeof CONNECTED;
  payload: StatusActionPayload;
}

export interface AccessDeniedAction {
  type: typeof ACCESS_DENIED;
  payload: StatusActionPayload;
}

export interface MalformedResponseAction {
  type: typeof MALFORMED_RESPONSE;
  payload: StatusActionPayload;
}

export interface BadRequestAction {
  type: typeof BAD_REQUEST;
  payload: StatusActionPayload;
}

export interface DecryptionErrorAction {
  type: typeof DECRYPTION_ERROR;
  payload: StatusActionPayload;
}

export interface RequestMessageCountExceedAction {
  type: typeof REQUEST_MESSAGE_COUNT_EXCEED;
  payload: StatusActionPayload;
}

export interface TimeoutConnectionAction {
  type: typeof TIMEOUT_CONNECTION;
  payload: StatusActionPayload;
}

export interface UnknownAction {
  type: typeof UNKNOWN;
  payload: StatusActionPayload;
}

export interface UserUpdatedAction<T> {
  type: typeof OBJECTS_UPDATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateUserBeginAction<T> {
  type: typeof OBJECTS_UPDATE_USER_BEGIN;
  payload: T;
}

export interface UpdateUserErrorAction<T> {
  type: typeof OBJECTS_UPDATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserDeletedAction<T> {
  type: typeof OBJECTS_DELETE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface DeleteUserBeginAction {
  type: typeof OBJECTS_DELETE_USER_BEGIN;
  payload: string;
}

export interface DeleteUserErrorAction<T> {
  type: typeof OBJECTS_DELETE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserCreatedAction<T> {
  type: typeof OBJECTS_CREATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface CreateUserBeginAction<T> {
  type: typeof OBJECTS_CREATE_USER_BEGIN;
  payload: T;
}

export interface CreateUserErrorAction<T> {
  type: typeof OBJECTS_CREATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchUsersBeginAction {
  type: typeof OBJECTS_FETCH_USERS_BEGIN;
  payload: { label: string };
}

export interface UserListRetrievedAction<T> {
  type: typeof OBJECTS_FETCH_USERS;
  payload: PubNubObjectApiSuccess<UserMap<T>>;
}

export interface FetchUsersErrorAction {
  type: typeof OBJECTS_FETCH_USERS_ERROR;
  payload: PubNubObjectApiError;
}

export interface FetchUserByIdErrorAction<T> {
  type: typeof OBJECTS_FETCH_USER_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchUserByIdBeginAction {
  type: typeof OBJECTS_FETCH_USER_BY_ID_BEGIN;
  payload: string;
}

export interface FetchUserByIdAction<T> {
  type: typeof OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}

export interface SpaceListRetrievedAction<T> {
  type: typeof OBJECTS_FETCH_SPACES;
  payload: PubNubObjectApiSuccess<SpaceMap<T>>;
}

export interface FetchSpacesBeginAction {
  type: typeof OBJECTS_FETCH_SPACES_BEGIN;
  payload: { label: string };
}

export interface FetchSpacesErrorAction {
  type: typeof OBJECTS_FETCH_SPACES_ERROR;
  payload: PubNubObjectApiError;
}

export interface SpaceCreatedAction<T> {
  type: typeof OBJECTS_CREATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface CreateSpaceBeginAction<T> {
  type: typeof OBJECTS_CREATE_SPACE_BEGIN;
  payload: T;
}

export interface CreateSpaceErrorAction<T> {
  type: typeof OBJECTS_CREATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpaceUpdatedAction<T> {
  type: typeof OBJECTS_UPDATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateSpaceBeginAction<T> {
  type: typeof OBJECTS_UPDATE_SPACE_BEGIN;
  payload: T;
}

export interface UpdateSpaceErrorAction<T> {
  type: typeof OBJECTS_UPDATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpaceDeletedAction<T> {
  type: typeof OBJECTS_DELETE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface DeleteSpaceBeginAction {
  type: typeof OBJECTS_DELETE_SPACE_BEGIN;
  payload: string;
}

export interface DeleteSpaceErrorAction<T> {
  type: typeof OBJECTS_DELETE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchSpaceByIdAction<T> {
  type: typeof OBJECTS_FETCH_SPACE_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}

export interface FetchSpaceByIdBeginAction {
  type: typeof OBJECTS_FETCH_SPACE_BY_ID_BEGIN;
  payload: string;
}

export interface FetchSpaceByIdErrorAction<T> {
  type: typeof OBJECTS_FETCH_SPACE_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserAddedToSpaceAction<T extends Identifiable> {
  type: typeof OBJECTS_USER_ADDED_TO_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UserRemovedFromSpaceAction<T extends Identifiable> {
  type: typeof OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UserMembershipUpdatedOnSpaceAction<T extends Identifiable> {
  type: typeof OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface FetchMembersBeginAction {
  type: typeof OBJECTS_FETCH_MEMBERS_BEGIN;
  payload: { label: string };
}

export interface FetchMembersAction {
  type: typeof OBJECTS_FETCH_MEMBERS;
  payload: MembershipResult;
}

export interface FetchMembersErrorAction {
  type: typeof OBJECTS_FETCH_MEMBERS_ERROR;
  payload: PubNubObjectApiError;
}

export interface MembersUpdatedAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERS;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateMembersBeginAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERS_BEGIN;
  payload: T;
}

export interface UpdateMembersErrorAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembersAddedAction<T> {
  type: typeof OBJECTS_MEMBERS_ADDED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface AddMembersBeginAction<T> {
  type: typeof OBJECTS_ADD_MEMBERS_BEGIN;
  payload: T;
}

export interface AddMembersErrorAction<T> {
  type: typeof OBJECTS_ADD_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembersRemovedAction<T> {
  type: typeof OBJECTS_MEMBERS_REMOVED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface RemoveMembersBeginAction<T> {
  type: typeof OBJECTS_REMOVE_MEMBERS_BEGIN;
  payload: T;
}

export interface RemoveMembersErrorAction<T> {
  type: typeof OBJECTS_REMOVE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchMembershipsBeginAction {
  type: typeof OBJECTS_FETCH_MEMBERSHIPS_BEGIN;
  payload: { label: string };
}

export interface FetchMembershipsAction {
  type: typeof OBJECTS_FETCH_MEMBERSHIPS;
  payload: MembershipResult;
}

export interface FetchMembershipsErrorAction {
  type: typeof OBJECTS_FETCH_MEMBERSHIPS_ERROR;
  payload: PubNubObjectApiError;
}

export interface MembershipUpdatedAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERSHIP;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateMembershipBeginAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERSHIP_BEGIN;
  payload: T;
}

export interface UpdateMembershipErrorAction<T> {
  type: typeof OBJECTS_UPDATE_MEMBERSHIP_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpacesJoinedAction<T> {
  type: typeof OBJECTS_SPACES_JOINED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface JoinSpacesBeginAction<T> {
  type: typeof OBJECTS_JOIN_SPACES_BEGIN;
  payload: T;
}

export interface JoinSpacesErrorAction<T> {
  type: typeof OBJECTS_JOIN_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpacesLeftAction<T> {
  type: typeof OBJECTS_SPACES_LEFT;
  payload: PubNubObjectApiSuccess<T>;
}

export interface LeaveSpacesBeginAction<T> {
  type: typeof OBJECTS_LEAVE_SPACES_BEGIN;
  payload: T;
}

export interface LeaveSpacesErrorAction<T> {
  type: typeof OBJECTS_LEAVE_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MessageAction {
  type: typeof MESSAGE;
  payload: MessageActionPayload;
}

export interface SignalAction {
  type: typeof SIGNAL;
  payload: SignalActionPayload;
}

export type PresenceListenerActions =
  | JoinAction
  | LeaveAction
  | TimeoutAction
  | StateChangeAction;

export type NetworkStatusListenerActions = NetworkUpAction | NetworkDownAction;

export type SubscriptionStatusListenerActions =
  | ReconnectedAction
  | ConnectedAction;

export type ErrorStatusListenerActions =
  | NetworkIssuesAction
  | AccessDeniedAction
  | MalformedResponseAction
  | BadRequestAction
  | RequestMessageCountExceedAction
  | DecryptionErrorAction
  | TimeoutConnectionAction
  | UnknownAction;

export type StatusListenerActions =
  | NetworkStatusListenerActions
  | SubscriptionStatusListenerActions
  | ErrorStatusListenerActions;

export type UserActions<T> =
  | UserCreatedAction<T>
  | CreateUserBeginAction<T>
  | CreateUserErrorAction<T>
  | UserUpdatedAction<T>
  | UpdateUserBeginAction<T>
  | UpdateUserErrorAction<T>
  | UserDeletedAction<T>
  | DeleteUserBeginAction
  | DeleteUserErrorAction<T>
  | UserListRetrievedAction<T>
  | FetchUsersBeginAction
  | FetchUsersErrorAction
  | FetchUserByIdAction<T>
  | FetchUserByIdBeginAction
  | FetchUserByIdErrorAction<T>;

export type SpaceActions<T> =
  | SpaceCreatedAction<T>
  | CreateSpaceBeginAction<T>
  | CreateSpaceErrorAction<T>
  | SpaceUpdatedAction<T>
  | UpdateSpaceBeginAction<T>
  | UpdateSpaceErrorAction<T>
  | SpaceDeletedAction<T>
  | DeleteSpaceBeginAction
  | DeleteSpaceErrorAction<T>
  | SpaceListRetrievedAction<T>
  | FetchSpacesBeginAction
  | FetchSpacesErrorAction
  | FetchSpaceByIdAction<T>
  | FetchSpaceByIdBeginAction
  | FetchSpaceByIdErrorAction<T>;

export type MembershipActions<T> =
  | FetchMembershipsBeginAction
  | FetchMembershipsAction
  | FetchMembershipsErrorAction
  | UpdateMembershipBeginAction<T>
  | MembershipUpdatedAction<T>
  | UpdateMembershipErrorAction<T>
  | JoinSpacesBeginAction<T>
  | SpacesJoinedAction<T>
  | JoinSpacesErrorAction<T>
  | LeaveSpacesBeginAction<T>
  | SpacesLeftAction<T>
  | LeaveSpacesErrorAction<T>;

export type MembersActions<T> =
  | FetchMembersBeginAction
  | FetchMembersAction
  | FetchMembersErrorAction
  | UpdateMembersBeginAction<T>
  | MembersUpdatedAction<T>
  | UpdateMembersErrorAction<T>
  | AddMembersBeginAction<T>
  | MembersAddedAction<T>
  | AddMembersErrorAction<T>
  | RemoveMembersBeginAction<T>
  | MembersRemovedAction<T>
  | RemoveMembersErrorAction<T>;

export type UserListenerActions<T> =
  | UserUpdatedAction<T>
  | UserDeletedAction<T>;

export type SpaceListenerActions<T> =
  | SpaceUpdatedAction<T>
  | SpaceDeletedAction<T>;

export type MembershipListenerActions<T extends Identifiable> =
  | UserAddedToSpaceAction<T>
  | UserRemovedFromSpaceAction<T>
  | UserMembershipUpdatedOnSpaceAction<T>;

export type ObjectListenerActions<T extends Identifiable> =
  | UserListenerActions<T>
  | SpaceListenerActions<T>
  | MembershipListenerActions<T>;

export type ListenerActions<T extends Identifiable> =
  | MessageAction
  | SignalAction
  | PresenceListenerActions
  | StatusListenerActions
  | ObjectListenerActions<T>;
