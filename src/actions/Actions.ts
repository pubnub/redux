import { Message } from 'api/Message';
import { PresenceActionPayload } from 'api/Presence';
import { StatusActionPayload } from 'api/Status';
import { SignalActionPayload } from 'api/Signal';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  Identifiable,
  ItemMap,
} from 'api/PubNubApi';
import { MembershipResult } from 'api/Membership';
import { ActionType } from 'actions/ActionType.enum';
import { MembersResult } from 'api/Member';

// tag:RDX-069[]
export interface JoinAction {
  type: typeof ActionType.JOIN;
  payload: PresenceActionPayload;
}
// end::RDX-069[]

// tag::RDX-070[]
export interface LeaveAction {
  type: typeof ActionType.LEAVE;
  payload: PresenceActionPayload;
}
// end::RDX-070[]

// tag::RDX-071[]
export interface TimeoutAction {
  type: typeof ActionType.TIMEOUT;
  payload: PresenceActionPayload;
}
// end::RDX-071[]

// tag::RDX-072[]
export interface StateChangeAction {
  type: typeof ActionType.STATE_CHANGE;
  payload: PresenceActionPayload;
}
// end::RDX-072[]

// tag::RDX-073[]
export interface NetworkUpAction {
  type: typeof ActionType.NETWORK_UP;
}
// end::RDX-073[]

// tag::RDX-074[]
export interface NetworkDownAction {
  type: typeof ActionType.NETWORK_DOWN;
}
// end::RDX-074[]

// tag::RDX-075[]
export interface NetworkIssuesAction {
  type: typeof ActionType.NETWORK_ISSUES;
  payload: StatusActionPayload;
}
// end::RDX-075[]

// tag::RDX-076[]
export interface ReconnectedAction {
  type: typeof ActionType.RECONNECTED;
  payload: StatusActionPayload;
}
// end::RDX-076[]

// tag::RDX-077[]
export interface ConnectedAction {
  type: typeof ActionType.CONNECTED;
  payload: StatusActionPayload;
}
// end::RDX-077[]

// tag::RDX-078[]
export interface AccessDeniedAction {
  type: typeof ActionType.ACCESS_DENIED;
  payload: StatusActionPayload;
}
// end::RDX-078[]

// tag::RDX-079[]
export interface MalformedResponseAction {
  type: typeof ActionType.MALFORMED_RESPONSE;
  payload: StatusActionPayload;
}
// end::RDX-079[]

// tag::RDX-080[]
export interface BadRequestAction {
  type: typeof ActionType.BAD_REQUEST;
  payload: StatusActionPayload;
}
// end::RDX-080[]

// tag::RDX-081[]
export interface DecryptionErrorAction {
  type: typeof ActionType.DECRYPTION_ERROR;
  payload: StatusActionPayload;
}
// end::RDX-081[]

// tag::RDX-082[]
export interface RequestMessageCountExceedAction {
  type: typeof ActionType.REQUEST_MESSAGE_COUNT_EXCEED;
  payload: StatusActionPayload;
}
// end::RDX-082[]

// tag::RDX-083[]
export interface TimeoutConnectionAction {
  type: typeof ActionType.TIMEOUT_CONNECTION;
  payload: StatusActionPayload;
}
// end::RDX-083[]

// tag::RDX-084[]
export interface UnknownAction {
  type: typeof ActionType.UNKNOWN;
  payload: StatusActionPayload;
}
// end::RDX-084[]

// tag::RDX-085[]
export interface UserUpdatedAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-085[]

// tag::RDX-086[]
export interface UpdateUserBeginAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_USER_BEGIN;
  payload: T;
}
// end::RDX-086[]

// tag::RDX-087[]
export interface UpdateUserErrorAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-087[]

// tag::RDX-088[]
export interface UserDeletedAction<T> {
  type: typeof ActionType.OBJECTS_DELETE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-088[]

// tag::RDX-089[]
export interface DeleteUserBeginAction {
  type: typeof ActionType.OBJECTS_DELETE_USER_BEGIN;
  payload: string;
}
// end::RDX-089[]

// tag::RDX-090[]
export interface DeleteUserErrorAction<T> {
  type: typeof ActionType.OBJECTS_DELETE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-090[]

// tag::RDX-091[]
export interface UserCreatedAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-091[]

// tag::RDX-092[]
export interface CreateUserBeginAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_USER_BEGIN;
  payload: T;
}
// end::RDX-092[]

// tag::RDX-093[]
export interface CreateUserErrorAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-093[]

// tag::RDX-094[]
export interface FetchUsersBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_USERS_BEGIN;
  payload: { label: string };
}
// end::RDX-094[]

// tag::RDX-095[]
export interface UserListRetrievedAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_USERS;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}
// end::RDX-095[]

// tag::RDX-096[]
export interface FetchUsersErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_USERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-096[]

// tag::RDX-097[]
export interface FetchUserByIdErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_USER_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-097[]

// tag::RDX-098[]
export interface FetchUserByIdBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_USER_BY_ID_BEGIN;
  payload: string;
}
// end::RDX-098[]

// tag::RDX-099[]
export interface FetchUserByIdAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-099[]

// tag::RDX-100[]
export interface SpaceListRetrievedAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_SPACES;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}
// end::RDX-100[]

// tag::RDX-101[]
export interface FetchSpacesBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_SPACES_BEGIN;
  payload: { label: string };
}
// end::RDX-101[]

// tag::RDX-102[]
export interface FetchSpacesErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-102[]

// tag::RDX-103[]
export interface SpaceCreatedAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-103[]

// tag::RDX-104[]
export interface CreateSpaceBeginAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_SPACE_BEGIN;
  payload: T;
}
// end::RDX-104[]

// tag::RDX-105[]
export interface CreateSpaceErrorAction<T> {
  type: typeof ActionType.OBJECTS_CREATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-105[]

// tag::RDX-106[]
export interface SpaceUpdatedAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-106[]

// tag::RDX-107[]
export interface UpdateSpaceBeginAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_SPACE_BEGIN;
  payload: T;
}
// end::RDX-107[]

// tag::RDX-108[]
export interface UpdateSpaceErrorAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-108[]

// tag::RDX-109[]
export interface SpaceDeletedAction<T> {
  type: typeof ActionType.OBJECTS_DELETE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-109[]

// tag::RDX-110[]
export interface DeleteSpaceBeginAction {
  type: typeof ActionType.OBJECTS_DELETE_SPACE_BEGIN;
  payload: string;
}
// end::RDX-110[]

// tag::RDX-111[]
export interface DeleteSpaceErrorAction<T> {
  type: typeof ActionType.OBJECTS_DELETE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-111[]

// tag::RDX-112[]
export interface FetchSpaceByIdAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_SPACE_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-112[]

// tag::RDX-113[]
export interface FetchSpaceByIdBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN;
  payload: string;
}
// end::RDX-113[]

// tag::RDX-114[]
export interface FetchSpaceByIdErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-114[]

// tag::RDX-115[]
export interface UserAddedToSpaceAction<T extends Identifiable> {
  type: typeof ActionType.OBJECTS_USER_ADDED_TO_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-115[]

// tag::RDX-116[]
export interface UserRemovedFromSpaceAction<T extends Identifiable> {
  type: typeof ActionType.OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-116[]

// tag::RDX-117[]
export interface UserMembershipUpdatedOnSpaceAction<T extends Identifiable> {
  type: typeof ActionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-117[]

// tag::RDX-118[]
export interface FetchMembersBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERS_BEGIN;
  payload: string;
}
// end::RDX-118[]

// tag::RDX-119[]
export interface FetchMembersAction {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERS;
  payload: PubNubObjectApiSuccess<MembersResult>;
}
// end::RDX-119[]

// tag::RDX-120[]
export interface FetchMembersErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-120[]

// tag::RDX-121[]
export interface MembersUpdatedAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERS;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-121[]

// tag::RDX-122[]
export interface UpdateMembersBeginAction {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERS_BEGIN;
  payload: string;
}
// end::RDX-122[]

// tag::RDX-123[]
export interface UpdateMembersErrorAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-123[]

// tag::RDX-124[]
export interface MembersAddedAction<T> {
  type: typeof ActionType.OBJECTS_MEMBERS_ADDED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-124[]

// tag::RDX-125[]
export interface AddMembersBeginAction<T> {
  type: typeof ActionType.OBJECTS_ADD_MEMBERS_BEGIN;
  payload: T;
}
// end::RDX-125[]

// tag::RDX-126[]
export interface AddMembersErrorAction<T> {
  type: typeof ActionType.OBJECTS_ADD_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-126[]

// tag::RDX-127[]
export interface MembersRemovedAction<T> {
  type: typeof ActionType.OBJECTS_MEMBERS_REMOVED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-127[]

// tag::RDX-128[]
export interface RemoveMembersBeginAction<T> {
  type: typeof ActionType.OBJECTS_REMOVE_MEMBERS_BEGIN;
  payload: T;
}
// end::RDX-128[]

// tag::RDX-129[]
export interface RemoveMembersErrorAction<T> {
  type: typeof ActionType.OBJECTS_REMOVE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-129[]

// tag::RDX-130[]
export interface FetchUserByIdAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-130[]

// tag::RDX-131[]
export interface FetchMembershipsBeginAction {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN;
  payload: string;
}
// end::RDX-131[]

// tag::RDX-132[]
export interface FetchMembershipsAction {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERSHIPS;
  payload: PubNubObjectApiSuccess<MembershipResult>;
}
// end::RDX-132[]

// tag::RDX-133[]
export interface FetchMembershipsErrorAction<T> {
  type: typeof ActionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-133[]

// tag::RDX-134[]
export interface MembershipUpdatedAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERSHIP;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-134[]

// tag::RDX-135[]
export interface UpdateMembershipBeginAction {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN;
  payload: string;
}
// end::RDX-135[]

// tag::RDX-136[]
export interface UpdateMembershipErrorAction<T> {
  type: typeof ActionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-136[]

// tag::RDX-137[]
export interface SpacesJoinedAction<T> {
  type: typeof ActionType.OBJECTS_SPACES_JOINED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-137[]

// tag::RDX-138[]
export interface JoinSpacesBeginAction<T> {
  type: typeof ActionType.OBJECTS_JOIN_SPACES_BEGIN;
  payload: T;
}
// end::RDX-138[]

// tag::RDX-139[]
export interface JoinSpacesErrorAction<T> {
  type: typeof ActionType.OBJECTS_JOIN_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-139[]

// tag::RDX-140[]
export interface SpacesLeftAction<T> {
  type: typeof ActionType.OBJECTS_SPACES_LEFT;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-140[]

// tag::RDX-141[]
export interface LeaveSpacesBeginAction<T> {
  type: typeof ActionType.OBJECTS_LEAVE_SPACES_BEGIN;
  payload: T;
}
// end::RDX-141[]

// tag::RDX-142[]
export interface LeaveSpacesErrorAction<T> {
  type: typeof ActionType.OBJECTS_LEAVE_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-142[]

// tag::RDX-143[]
export interface MessageAction {
  type: typeof ActionType.MESSAGE;
  payload: Message;
}
// end::RDX-143[]

// tag::RDX-144[]
export interface SendMessageBeginAction<T extends { channel: string }> {
  type: typeof ActionType.SEND_MESSAGE_BEGIN;
  payload: T;
}
// end::RDX-144[]

// tag::RDX-145[]
export interface SendMessageAction<T extends { channel: string }> {
  type: typeof ActionType.SEND_MESSAGE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RDX-145[]

// tag::RDX-146[]
export interface SendMessageErrorAction<T extends { channel: string }> {
  type: typeof ActionType.SEND_MESSAGE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RDX-146[]

// tag::RDX-147[]
export interface SignalAction {
  type: typeof ActionType.SIGNAL;
  payload: SignalActionPayload;
}
// end::RDX-147[]

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
