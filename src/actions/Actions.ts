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

// tag::RED-001[]
export interface JoinAction {
  type: typeof actionType.JOIN;
  payload: PresenceActionPayload;
}
// end::RED-001[]

// tag::RED-002[]
export interface LeaveAction {
  type: typeof actionType.LEAVE;
  payload: PresenceActionPayload;
}
// end::RED-002[]

// tag:RED-003[]
export interface TimeoutAction {
  type: typeof actionType.TIMEOUT;
  payload: PresenceActionPayload;
}
// end:RED-003[]

// tag::RED-004[]
export interface StateChangeAction {
  type: typeof actionType.STATE_CHANGE;
  payload: PresenceActionPayload;
}
// end::RED-004[]

// tag::RED-005[]
export interface NetworkUpAction {
  type: typeof actionType.NETWORK_UP;
}
// end::RED-005[]

// tag::RED-006[]
export interface NetworkDownAction {
  type: typeof actionType.NETWORK_DOWN;
}
// end::RED-006[]

// tag::RED-007[]
export interface NetworkIssuesAction {
  type: typeof actionType.NETWORK_ISSUES;
  payload: StatusActionPayload;
}
// end::RED-007[]

// tag::RED-008[]
export interface ReconnectedAction {
  type: typeof actionType.RECONNECTED;
  payload: StatusActionPayload;
}
// end::RED-008[]

// tag::RED-009[]
export interface ConnectedAction {
  type: typeof actionType.CONNECTED;
  payload: StatusActionPayload;
}
// end::RED-009[]

// tag::RED-010[]
export interface AccessDeniedAction {
  type: typeof actionType.ACCESS_DENIED;
  payload: StatusActionPayload;
}
// end::RED-010[]

// tag::RED-011[]
export interface MalformedResponseAction {
  type: typeof actionType.MALFORMED_RESPONSE;
  payload: StatusActionPayload;
}
// end::RED-011[]

// tag::RED-012[]
export interface BadRequestAction {
  type: typeof actionType.BAD_REQUEST;
  payload: StatusActionPayload;
}
// end::RED-012[]

// tag::RED-013[]
export interface DecryptionErrorAction {
  type: typeof actionType.DECRYPTION_ERROR;
  payload: StatusActionPayload;
}
// end::RED-013[]

// tag::RED-014[]
export interface RequestMessageCountExceedAction {
  type: typeof actionType.REQUEST_MESSAGE_COUNT_EXCEED;
  payload: StatusActionPayload;
}
// end::RED-014[]

// tag::RED-015[]
export interface TimeoutConnectionAction {
  type: typeof actionType.TIMEOUT_CONNECTION;
  payload: StatusActionPayload;
}
// end::RED-015[]

// tag::RED-016[]
export interface UnknownAction {
  type: typeof actionType.UNKNOWN;
  payload: StatusActionPayload;
}
// end::RED-016[]

// tag::RED-017[]
export interface UserUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-017[]

// tag::RED-018[]
export interface UpdateUserBeginAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER_BEGIN;
  payload: T;
}
// end::RED-018[]

// tag::RED-019[]
export interface UpdateUserErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-019[]

// tag::RED-020[]
export interface UserDeletedAction<T> {
  type: typeof actionType.OBJECTS_DELETE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-020[]

// tag::RED-021[]
export interface DeleteUserBeginAction {
  type: typeof actionType.OBJECTS_DELETE_USER_BEGIN;
  payload: string;
}
// end::RED-021[]

// tag::RED-022[]
export interface DeleteUserErrorAction<T> {
  type: typeof actionType.OBJECTS_DELETE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-022[]

// tag::RED-023[]
export interface UserCreatedAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-023[]

// tag::RED-024[]
export interface CreateUserBeginAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER_BEGIN;
  payload: T;
}
// end::RED-024[]

// tag::RED-025[]
export interface CreateUserErrorAction<T> {
  type: typeof actionType.OBJECTS_CREATE_USER_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-025[]

// tag::RED-026[]
export interface FetchUsersBeginAction {
  type: typeof actionType.OBJECTS_FETCH_USERS_BEGIN;
  payload: { label: string };
}
// end::RED-026[]

// tag::RED-027[]
export interface UserListRetrievedAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USERS;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}
// end::RED-027[]

// tag::RED-028[]
export interface FetchUsersErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-028[]

// tag::[]
export interface FetchUserByIdErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-029[]

// tag::RED-030[]
export interface FetchUserByIdBeginAction {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID_BEGIN;
  payload: string;
}
// end::RED-030[]

// tag::RED-031[]
export interface FetchUserByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-031[]

// tag::RED-032[]
export interface SpaceListRetrievedAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACES;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
}
// end::RED-032[]

// tag::RED-033[]
export interface FetchSpacesBeginAction {
  type: typeof actionType.OBJECTS_FETCH_SPACES_BEGIN;
  payload: { label: string };
}
// end::RED-033[]

// tag::RED-034[]
export interface FetchSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-034[]

// tag::RED-035[]
export interface SpaceCreatedAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-035[]

// tag::RED-036[]
export interface CreateSpaceBeginAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE_BEGIN;
  payload: T;
}
// end::RED-036[]

// tag::RED-037[]
export interface CreateSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_CREATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-037[]

// tag::RED-038[]
export interface SpaceUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-038[]

// tag::RED-039[]
export interface UpdateSpaceBeginAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE_BEGIN;
  payload: T;
}
// end::RED-039[]

// tag::RED-040[]
export interface UpdateSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-040[]

// tag::RED-041[]
export interface SpaceDeletedAction<T> {
  type: typeof actionType.OBJECTS_DELETE_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-041[]

// tag::RED-042[]
export interface DeleteSpaceBeginAction {
  type: typeof actionType.OBJECTS_DELETE_SPACE_BEGIN;
  payload: string;
}
// end::RED-042[]

// tag::RED-043[]
export interface DeleteSpaceErrorAction<T> {
  type: typeof actionType.OBJECTS_DELETE_SPACE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-043[]

// tag::RED-044[]
export interface FetchSpaceByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-044[]

// tag::RED-045[]
export interface FetchSpaceByIdBeginAction {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID_BEGIN;
  payload: string;
}
// end::RED-045[]

// tag::RED-046[]
export interface FetchSpaceByIdErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_SPACE_BY_ID_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-046[]

// tag::RED-047[]
export interface UserAddedToSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_ADDED_TO_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-047[]

// tag::RED-048[]
export interface UserRemovedFromSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-048[]

// tag::RED-049[]
export interface UserMembershipUpdatedOnSpaceAction<T extends Identifiable> {
  type: typeof actionType.OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-049[]

// tag::RED-050[]
export interface FetchMembersBeginAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS_BEGIN;
  payload: string;
}
// end::RED-050[]

// tag::RED-051[]
export interface FetchMembersAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS;
  payload: PubNubObjectApiSuccess<MembersResult>;
}
// end::RED-051[]

// tag::RED-052[]
export interface FetchMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-052[]

// tag::RED-053[]
export interface MembersUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-053[]

// tag::RED-054[]
export interface UpdateMembersBeginAction {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS_BEGIN;
  payload: string;
}
// end::RED-054[]

// tag::RED-055[]
export interface UpdateMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-055[]

// tag::RED-056[]
export interface MembersAddedAction<T> {
  type: typeof actionType.OBJECTS_MEMBERS_ADDED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-056[]

// tag::RED-057[]
export interface AddMembersBeginAction<T> {
  type: typeof actionType.OBJECTS_ADD_MEMBERS_BEGIN;
  payload: T;
}
// end::RED-057[]

// tag::RED-058[]
export interface AddMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_ADD_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::RED-058[]

// tag::RED-059[]
export interface MembersRemovedAction<T> {
  type: typeof actionType.OBJECTS_MEMBERS_REMOVED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::RED-059[]

// tag::RED-060[]
export interface RemoveMembersBeginAction<T> {
  type: typeof actionType.OBJECTS_REMOVE_MEMBERS_BEGIN;
  payload: T;
}
// end::RED-060[]

// tag::[RED-061]
export interface RemoveMembersErrorAction<T> {
  type: typeof actionType.OBJECTS_REMOVE_MEMBERS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-061]

// tag::[RED-062]
export interface FetchUserByIdAction<T> {
  type: typeof actionType.OBJECTS_FETCH_USER_BY_ID;
  payload: PubNubObjectApiSuccess<T>;
}
// end::[RED-062]

// tag::[FetchMembershipsBeginAction]
export interface FetchMembershipsBeginAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS_BEGIN;
  payload: string;
}
// end::[FetchMembershipsBeginAction]

// tag::[RED-064]
export interface FetchMembershipsAction {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS;
  payload: PubNubObjectApiSuccess<MembershipResult>;
}
// end::[RED-064]

// tag::[RED-065]
export interface FetchMembershipsErrorAction<T> {
  type: typeof actionType.OBJECTS_FETCH_MEMBERSHIPS_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-065]

// tag::[RED-066]
export interface MembershipUpdatedAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP;
  payload: PubNubObjectApiSuccess<T>;
}
// end::[RED-066]

// tag::[RED-067]
export interface UpdateMembershipBeginAction {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP_BEGIN;
  payload: string;
}
// end::[RED-067]

// tag::[RED-068]
export interface UpdateMembershipErrorAction<T> {
  type: typeof actionType.OBJECTS_UPDATE_MEMBERSHIP_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-068]

// tag::[RED-069]
export interface SpacesJoinedAction<T> {
  type: typeof actionType.OBJECTS_SPACES_JOINED;
  payload: PubNubObjectApiSuccess<T>;
}
// end::[RED-069]

// tag::[RED-070]
export interface JoinSpacesBeginAction<T> {
  type: typeof actionType.OBJECTS_JOIN_SPACES_BEGIN;
  payload: T;
}
// end::[RED-070]

// tag::[RED-071]
export interface JoinSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_JOIN_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-071]

// tag::[RED-072]
export interface SpacesLeftAction<T> {
  type: typeof actionType.OBJECTS_SPACES_LEFT;
  payload: PubNubObjectApiSuccess<T>;
}
// end::[RED-072]

// tag::[RED-073]
export interface LeaveSpacesBeginAction<T> {
  type: typeof actionType.OBJECTS_LEAVE_SPACES_BEGIN;
  payload: T;
}
// end::[RED-073]

// tag::[RED-074]
export interface LeaveSpacesErrorAction<T> {
  type: typeof actionType.OBJECTS_LEAVE_SPACES_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-074]

// tag::[RED-075]
export interface MessageAction {
  type: typeof actionType.MESSAGE;
  payload: Message;
}
// end::[RED-075]

// tag::[RED-076]
export interface SendMessageBeginAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE_BEGIN;
  payload: T;
}
// end::[RED-076]

// tag::[RED-077]
export interface SendMessageAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE;
  payload: PubNubObjectApiSuccess<T>;
}
// end::[RED-077]

// tag::[RED-078]
export interface SendMessageErrorAction<T extends { channel: string }> {
  type: typeof actionType.SEND_MESSAGE_ERROR;
  payload: PubNubObjectApiError<T>;
}
// end::[RED-078]

// tag::[RED-079]
export interface SignalAction {
  type: typeof actionType.SIGNAL;
  payload: SignalActionPayload;
}
// end::[RED-079]

// tag::[RED-080]
export type PresenceListenerActions =
  | JoinAction
  | LeaveAction
  | TimeoutAction
  | StateChangeAction;
// end::[RED-080]

// tag::[RED-081]
export type NetworkStatusListenerActions = NetworkUpAction | NetworkDownAction;
// end::[RED-081]

// tag::[RED-082]
export type SubscriptionStatusListenerActions =
  | ReconnectedAction
  | ConnectedAction;
// end::[RED-082]

// tag::[RED-083]
export type ErrorStatusListenerActions =
  | NetworkIssuesAction
  | AccessDeniedAction
  | MalformedResponseAction
  | BadRequestAction
  | RequestMessageCountExceedAction
  | DecryptionErrorAction
  | TimeoutConnectionAction
  | UnknownAction;
// end::[RED-083]

// tag::[RED-084]
export type StatusListenerActions =
  | NetworkStatusListenerActions
  | SubscriptionStatusListenerActions
  | ErrorStatusListenerActions;
// end::[RED-084]

// tag::[RED-085]
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
// end::[RED-085]

// tag::[RED-086]
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
// end::[RED-086]

// tag::[RED-087]
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
// end::[RED-087]

// tag::[RED-088]
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
// end::[RED-088]

// tag::[RED-089]
export type UserListenerActions<T> =
  | UserUpdatedAction<T>
  | UserDeletedAction<T>;
// end::[RED-089]

// tag::[RED-090]
export type SpaceListenerActions<T> =
  | SpaceUpdatedAction<T>
  | SpaceDeletedAction<T>;
// end::[RED-090]

// tag::[RED-091]
export type MembershipListenerActions<T extends Identifiable> =
  | UserAddedToSpaceAction<T>
  | UserRemovedFromSpaceAction<T>
  | UserMembershipUpdatedOnSpaceAction<T>;
// end::[RED-091]

// tag::[RED-092]
export type ObjectListenerActions<T extends Identifiable> =
  | UserListenerActions<T>
  | SpaceListenerActions<T>
  | MembershipListenerActions<T>;
// end::[RED-092]

// tag::[RED-093]
export type ListenerActions<T extends Identifiable> =
  | MessageAction
  | SignalAction
  | PresenceListenerActions
  | StatusListenerActions
  | ObjectListenerActions<T>;
// end::[RED-093]

// tag::[RED-094]
export type MessageActions<T extends { channel: string }> =
  | MessageAction
  | SendMessageAction<T>
  | SendMessageBeginAction<T>
  | SendMessageErrorAction<T>;
// end::[RED-094]
