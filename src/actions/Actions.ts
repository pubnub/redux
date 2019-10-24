import { Message } from '../api/Message';
import { PresenceActionPayload } from '../api/Presence';
import { StatusActionPayload } from '../api/Status';
import { SignalActionPayload } from '../api/Signal';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  Identifiable,
  ItemMap,
} from '../api/PubNubApi';
import { MembershipResult } from '../api/Membership';
import { actionType } from './ActionType.enum';
import { MembersResult } from 'api/Member';

export interface JoinAction {
  type: typeof actionType.JOIN;
  payload: PresenceActionPayload;
}

export interface LeaveAction {
  type: typeof actionType.LEAVE;
  payload: PresenceActionPayload;
}

export interface TimeoutAction {
  type: typeof actionType.TIMEOUT;
  payload: PresenceActionPayload;
}

export interface StateChangeAction {
  type: typeof actionType.STATE_CHANGE;
  payload: PresenceActionPayload;
}

export interface NetworkUpAction {
  type: typeof actionType.NETWORK_UP;
}

export interface NetworkDownAction {
  type: typeof actionType.NETWORK_DOWN;
}

export interface NetworkIssuesAction {
  type: typeof actionType.NETWORK_ISSUES;
  payload: StatusActionPayload;
}

export interface ReconnectedAction {
  type: typeof actionType.RECONNECTED;
  payload: StatusActionPayload;
}

export interface ConnectedAction {
  type: typeof actionType.CONNECTED;
  payload: StatusActionPayload;
}

export interface AccessDeniedAction {
  type: typeof actionType.ACCESS_DENIED;
  payload: StatusActionPayload;
}

export interface MalformedResponseAction {
  type: typeof actionType.MALFORMED_RESPONSE;
  payload: StatusActionPayload;
}

export interface BadRequestAction {
  type: typeof actionType.BAD_REQUEST;
  payload: StatusActionPayload;
}

export interface DecryptionErrorAction {
  type: typeof actionType.DECRYPTION_ERROR;
  payload: StatusActionPayload;
}

export interface RequestMessageCountExceedAction {
  type: typeof actionType.REQUEST_MESSAGE_COUNT_EXCEED;
  payload: StatusActionPayload;
}

export interface TimeoutConnectionAction {
  type: typeof actionType.TIMEOUT_CONNECTION;
  payload: StatusActionPayload;
}

export interface UnknownAction {
  type: typeof actionType.UNKNOWN;
  payload: StatusActionPayload;
}

export interface UserUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateUserBeginAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER_BEGIN;
  payload: T;
}

export interface UpdateUserErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserDeletedAction<T> {
  type: typeof actionType.OBJECTS_DELETE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface DeleteUserBeginAction {
  type: typeof actionType.OBJECTS_DELETE_USER_BEGIN;
  payload: string;
}

export interface DeleteUserErrorAction<T> {
  type: typeof actionType.OBJECTS_DELETE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserCreatedAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}

export interface CreateUserBeginAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER_BEGIN;
  payload: T;
}

export interface CreateUserErrorAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchUsersBeginAction {
  type: typeof actionType.OBJECTS_FETCH_USERS_BEGIN;
  payload: { label: string };
}

export interface UserListRetrievedAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USERS;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}

export interface FetchUsersErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchUserByIdErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchUserByIdBeginAction {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID_BEGIN;
  payload: string;
}

export interface FetchUserByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}

export interface SpaceListRetrievedAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACES;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}

export interface FetchSpacesBeginAction {
  type: typeof actionType.OBJECTS_FETCH_SPACES_BEGIN;
  payload: { label: string };
}

export interface FetchSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpaceCreatedAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface CreateSpaceBeginAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE_BEGIN;
  payload: T;
}

export interface CreateSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpaceUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateSpaceBeginAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE_BEGIN;
  payload: T;
}

export interface UpdateSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpaceDeletedAction<T> {
  type: typeof actionType.OBJECTS_DELETE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface DeleteSpaceBeginAction {
  type: typeof actionType.OBJECTS_DELETE_SPACE_BEGIN;
  payload: string;
}

export interface DeleteSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_DELETE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface FetchSpaceByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}

export interface FetchSpaceByIdBeginAction {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN;
  payload: string;
}

export interface FetchSpaceByIdErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface UserAddedToSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_ADDED_TO_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UserRemovedFromSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UserMembershipUpdatedOnSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface FetchMembersBeginAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS_BEGIN;
  payload: string;
}

export interface FetchMembersAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS;
  payload: PubNubObjectApiSuccess<MembersResult>;
}

export interface FetchMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembersUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateMembersBeginAction {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS_BEGIN;
  payload: string;
}

export interface UpdateMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembersAddedAction<T> {
  type: typeof actionType.OBJECTS_MEMBERS_ADDED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface AddMembersBeginAction<T> {
  type: typeof actionType.OBJECTS_ADD_MEMBERS_BEGIN;
  payload: T;
}

export interface AddMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_ADD_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembersRemovedAction<T> {
  type: typeof actionType.OBJECTS_MEMBERS_REMOVED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface RemoveMembersBeginAction<T> {
  type: typeof actionType.OBJECTS_REMOVE_MEMBERS_BEGIN;
  payload: T;
}

export interface RemoveMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_REMOVE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
export interface FetchUserByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}

export interface FetchMembershipsBeginAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN;
  payload: string;
}

export interface FetchMembershipsAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS;
  payload: PubNubObjectApiSuccess<MembershipResult>;
}

export interface FetchMembershipsErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MembershipUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP;
  payload: PubNubObjectApiSuccess<T>;
}

export interface UpdateMembershipBeginAction {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN;
  payload: string;
}

export interface UpdateMembershipErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpacesJoinedAction<T> {
  type: typeof actionType.OBJECTS_SPACES_JOINED;
  payload: PubNubObjectApiSuccess<T>;
}

export interface JoinSpacesBeginAction<T> {
  type: typeof actionType.OBJECTS_JOIN_SPACES_BEGIN;
  payload: T;
}

export interface JoinSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_JOIN_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SpacesLeftAction<T> {
  type: typeof actionType.OBJECTS_SPACES_LEFT;
  payload: PubNubObjectApiSuccess<T>;
}

export interface LeaveSpacesBeginAction<T> {
  type: typeof actionType.OBJECTS_LEAVE_SPACES_BEGIN;
  payload: T;
}

export interface LeaveSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_LEAVE_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface MessageAction {
  type: typeof actionType.MESSAGE;
  payload: Message;
}

export interface SendMessageBeginAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE_BEGIN;
  payload: T;
}

export interface SendMessageAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE;
  payload: PubNubObjectApiSuccess<T>;
}

export interface SendMessageErrorAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE_ERROR;
  payload: PubNubObjectApiError<T>;
}

export interface SignalAction {
  type: typeof actionType.SIGNAL;
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
  | FetchUsersErrorAction<T>
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
  | FetchSpacesErrorAction<T>
  | FetchSpaceByIdAction<T>
  | FetchSpaceByIdBeginAction
  | FetchSpaceByIdErrorAction<T>;

export type MembershipActions<T> =
  | FetchMembershipsBeginAction
  | FetchMembershipsAction
  | FetchMembershipsErrorAction<T>
  | UpdateMembershipBeginAction
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
  | FetchMembersErrorAction<T>
  | UpdateMembersBeginAction
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

export type MessageActions<T extends { channel: string }> =
  | MessageAction
  | SendMessageAction<T>
  | SendMessageBeginAction<T>
  | SendMessageErrorAction<T>;
