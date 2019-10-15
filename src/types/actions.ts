import { MessageActionPayload } from './Message';
import { PresenceActionPayload } from './Presence';
import { StatusActionPayload } from './Status';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
} from './Objects';
import { SignalActionPayload } from './Signal';
import { User } from './User';
import { Space, SpaceMap } from './Space';
import { PubNubApiSuccess, PubNubApiError } from './PubNubApi';

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

export const OBJECTS_UPDATE_USER = 'pubnub/OBJECTS_UPDATE_USER';
export const OBJECTS_DELETE_USER = 'pubnub/OBJECTS_DELETE_USER';
export const OBJECTS_CREATE_USER = 'pubnub/OBJECTS_CREATE_USER';
export const OBJECTS_CREATE_USER_ERROR = 'pubnub/OBJECTS_CREATE_USER_ERROR';
export const OBJECTS_GET_USERS = 'pubnub/OBJECTS_GET_USERS';
export const OBJECTS_GET_USERS_ERROR = 'pubnub/OBJECTS_GET_USERS_ERROR';
export const OBJECTS_GET_USER_BY_ID = 'pubnub/OBJECTS_GET_USER_BY_ID';
export const OBJECTS_GET_USER_BY_ID_ERROR =
  'pubnub/OBJECTS_GET_USER_BY_ID_ERROR';

export const OBJECTS_CREATE_SPACE = 'pubnub/OBJECTS_CREATE_SPACE';
export const OBJECTS_CREATE_SPACE_BEGIN = 'pubnub/OBJECTS_CREATE_SPACE_BEGIN';
export const OBJECTS_CREATE_SPACE_ERROR = 'pubnub/OBJECTS_CREATE_SPACE_ERROR';
export const OBJECTS_UPDATE_SPACE = 'pubnub/OBJECTS_UPDATE_SPACE';
export const OBJECTS_UPDATE_SPACE_BEGIN = 'pubnub/OBJECTS_UPDATE_SPACE_BEGIN';
export const OBJECTS_UPDATE_SPACE_ERROR = 'pubnub/OBJECTS_UPDATE_SPACE_ERROR';
export const OBJECTS_DELETE_SPACE = 'pubnub/OBJECTS_DELETE_SPACE';
export const OBJECTS_DELETE_SPACE_BEGIN = 'pubnub/OBJECTS_DELETE_SPACE_BEGIN';
export const OBJECTS_DELETE_SPACE_ERROR = 'pubnub/OBJECTS_DELETE_SPACE_ERROR';
export const OBJECTS_GET_SPACES = 'pubnub/OBJECTS_GET_SPACES';
export const OBJECTS_GET_SPACES_BEGIN = 'pubnub/OBJECTS_GET_SPACES_BEGIN';
export const OBJECTS_GET_SPACES_ERROR = 'pubnub/OBJECTS_GET_SPACES_ERROR';
export const OBJECTS_GET_SPACE_BY_ID = 'pubnub/OBJECTS_GET_SPACE_BY_ID';
export const OBJECTS_GET_SPACE_BY_ID_BEGIN =
  'pubnub/OBJECTS_GET_SPACE_BY_ID_BEGIN';
export const OBJECTS_GET_SPACE_BY_ID_ERROR =
  'pubnub/OBJECTS_GET_SPACE_BY_ID_ERROR';

export const OBJECTS_USER_ADDED_TO_SPACE = 'pubnub/OBJECTS_USER_ADDED_TO_SPACE';
export const OBJECTS_USER_REMOVED_FROM_SPACE =
  'pubnub/OBJECTS_USER_REMOVED_FROM_SPACE';
export const OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE =
  'pubnub/OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE';

export const OBJECTS_GET_MEMBERS = 'pubnub/OBJECTS_GET_MEMBERS';
export const OBJECTS_GET_MEMBERS_ERROR = 'pubnub/OBJECTS_GET_MEMBERS_ERROR';
export const OBJECTS_GET_MEMBERSHIPS = 'pubnub/OBJECTS_GET_MEMBERSHIPS';
export const OBJECTS_GET_MEMBERSHIPS_ERROR =
  'pubnub/OBJECTS_GET_MEMBERSHIPS_ERROR';
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

export interface UserUpdatedAction {
  type: typeof OBJECTS_UPDATE_USER;
  payload: User;
}

export interface UserDeletedAction {
  type: typeof OBJECTS_DELETE_USER;
  payload: User;
}

export interface UserCreatedAction {
  type: typeof OBJECTS_CREATE_USER;
  payload: User;
}

export interface CreateUserErrorAction {
  type: typeof OBJECTS_CREATE_USER_ERROR;
}

export interface CreateUserErrorAction {
  type: typeof OBJECTS_CREATE_USER_ERROR;
  payload: ObjectsStatusPayload;
}

export interface UserListRetrievedAction {
  type: typeof OBJECTS_GET_USERS;
  payload: User[];
}

export interface GetUsersErrorAction {
  type: typeof OBJECTS_GET_USERS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface GetUserByIdErrorAction {
  type: typeof OBJECTS_GET_USER_BY_ID_ERROR;
  payload: ObjectsStatusPayload;
}

export interface GetUserByIdAction {
  type: typeof OBJECTS_GET_USER_BY_ID;
  payload: User;
}

export interface GetUserByIdErrorAction {
  type: typeof OBJECTS_GET_USER_BY_ID_ERROR;
}

export interface SpaceListRetrievedAction {
  type: typeof OBJECTS_GET_SPACES;
  payload: PubNubApiSuccess<SpaceMap>;
}

export interface GetSpacesBeginAction {
  type: typeof OBJECTS_GET_SPACES_BEGIN;
}

export interface GetSpacesErrorAction {
  type: typeof OBJECTS_GET_SPACES_ERROR;
  payload: PubNubApiError;
}

export interface SpaceCreatedAction {
  type: typeof OBJECTS_CREATE_SPACE;
  payload: PubNubApiSuccess<Space>;
}

export interface CreateSpaceBeginAction {
  type: typeof OBJECTS_CREATE_SPACE_BEGIN;
  payload: Space;
}

export interface CreateSpaceErrorAction {
  type: typeof OBJECTS_CREATE_SPACE_ERROR;
  payload: PubNubApiError<Space>;
}

export interface SpaceUpdatedAction {
  type: typeof OBJECTS_UPDATE_SPACE;
  payload: PubNubApiSuccess<Space>;
}

export interface UpdateSpaceBeginAction {
  type: typeof OBJECTS_UPDATE_SPACE_BEGIN;
  payload: Space;
}

export interface UpdateSpaceErrorAction {
  type: typeof OBJECTS_UPDATE_SPACE_ERROR;
  payload: PubNubApiError<Space>;
}

export interface SpaceDeletedAction {
  type: typeof OBJECTS_DELETE_SPACE;
  payload: PubNubApiSuccess<Space>;
}

export interface DeleteSpaceBeginAction {
  type: typeof OBJECTS_DELETE_SPACE_BEGIN;
  payload: string;
}

export interface DeleteSpaceErrorAction {
  type: typeof OBJECTS_DELETE_SPACE_ERROR;
  payload: PubNubApiError<Space>;
}

export interface GetSpaceByIdAction {
  type: typeof OBJECTS_GET_SPACE_BY_ID;
  payload: PubNubApiSuccess<Space>;
}

export interface GetSpaceByIdBeginAction {
  type: typeof OBJECTS_GET_SPACE_BY_ID_BEGIN;
  payload: string;
}

export interface GetSpaceByIdErrorAction {
  type: typeof OBJECTS_GET_SPACE_BY_ID_ERROR;
  payload: PubNubApiError<Space>;
}

export interface UserAddedToSpaceAction {
  type: typeof OBJECTS_USER_ADDED_TO_SPACE;
  payload: ObjectsActionPayload;
}

export interface UserRemovedFromSpaceAction {
  type: typeof OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: ObjectsActionPayload;
}

export interface UserMembershipUpdatedOnSpaceAction {
  type: typeof OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: ObjectsActionPayload;
}

export interface GetMembersAction {
  type: typeof OBJECTS_GET_MEMBERS;
  payload: ObjectsResponsePayload;
}

export interface GetMembersErrorAction {
  type: typeof OBJECTS_GET_MEMBERS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface GetMembershipsAction {
  type: typeof OBJECTS_GET_MEMBERSHIPS;
  payload: ObjectsResponsePayload;
}

export interface GetMemershipsErrorAction {
  type: typeof OBJECTS_GET_MEMBERSHIPS_ERROR;
  payload: ObjectsStatusPayload;
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

export type UserActions =
  | UserCreatedAction
  | CreateUserErrorAction
  | UserListRetrievedAction
  | GetUsersErrorAction
  | GetUserByIdAction
  | GetUserByIdErrorAction;

export type SpaceActions =
  | SpaceCreatedAction
  | CreateSpaceBeginAction
  | CreateSpaceErrorAction
  | SpaceUpdatedAction
  | UpdateSpaceBeginAction
  | UpdateSpaceErrorAction
  | SpaceDeletedAction
  | DeleteSpaceBeginAction
  | DeleteSpaceErrorAction
  | SpaceListRetrievedAction
  | GetSpacesBeginAction
  | GetSpacesErrorAction
  | GetSpaceByIdAction
  | GetSpaceByIdBeginAction
  | GetSpaceByIdErrorAction;

export type MembershipActions =
  | GetMembershipsAction
  | GetMembersAction
  | GetMemershipsErrorAction
  | GetMembersErrorAction;

export type UserListenerActions = UserUpdatedAction | UserDeletedAction;

export type SpaceListenerActions = SpaceUpdatedAction | SpaceDeletedAction;

export type MembershipListenerActions =
  | UserAddedToSpaceAction
  | UserRemovedFromSpaceAction
  | UserMembershipUpdatedOnSpaceAction;

export type ObjectListenerActions =
  | UserListenerActions
  | SpaceListenerActions
  | MembershipListenerActions;

export type ListenerActions =
  | MessageAction
  | SignalAction
  | PresenceListenerActions
  | StatusListenerActions
  | ObjectListenerActions;
