import { PresenceActionPayload } from '../api/Presence';
import { StatusActionPayload } from '../api/Status';
import { SignalActionPayload } from '../api/Signal';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  Identifiable,
  ItemMap,
  Meta,
} from '../api/PubNubApi';
import { MembershipResult } from '../api/Membership';
import { ActionType } from '../actions/ActionType.enum';
import { MembersResult } from '../api/Member';

// tag::RDX-069[]
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

// tag::RDX-086[]
export interface UpdatingUserAction<T> {
  type: typeof ActionType.UPDATING_USER;
  payload: T;
  meta?: Meta;
}
// end::RDX-086[]

// tag::RDX-085[]
export interface UserUpdatedAction<T> {
  type: typeof ActionType.USER_UPDATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-085[]

// tag::RDX-087[]
export interface ErrorUpdatingUserAction<T> {
  type: typeof ActionType.ERROR_UPDATING_USER;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-087[]

// tag::RDX-089[]
export interface DeletingUserAction {
  type: typeof ActionType.DELETING_USER;
  payload: string;
  meta?: Meta;
}
// end::RDX-089[]

// tag::RDX-088[]
export interface UserDeletedAction<T> {
  type: typeof ActionType.USER_DELETED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-088[]

// tag::RDX-090[]
export interface ErrorDeletingUserAction<T> {
  type: typeof ActionType.ERROR_DELETING_USER;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-090[]

// tag::RDX-092[]
export interface CreatingUserAction<T> {
  type: typeof ActionType.CREATING_USER;
  payload: T;
  meta?: Meta;
}
// end::RDX-092[]

// tag::RDX-091[]
export interface UserCreatedAction<T> {
  type: typeof ActionType.USER_CREATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-091[]

// tag::RDX-093[]
export interface ErrorCreatingUserAction<T> {
  type: typeof ActionType.ERROR_CREATING_USER;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-093[]

// tag::RDX-094[]
export interface FetchingUsersAction {
  type: typeof ActionType.FETCHING_USERS;
  meta?: Meta;
}
// end::RDX-094[]

// tag::RDX-095[]
export interface UsersRetrievedAction<T> {
  type: typeof ActionType.USERS_RETRIEVED;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
  meta?: Meta;
}
// end::RDX-095[]

// tag::RDX-096[]
export interface ErrorFetchingUsersAction<T> {
  type: typeof ActionType.ERROR_FETCHING_USERS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-096[]

// tag::RDX-098[]
export interface FetchingUserByIdAction {
  type: typeof ActionType.FETCHING_USER_BY_ID;
  payload: string;
  meta?: Meta;
}
// end::RDX-098[]

// tag::RDX-099[]
export interface UserRetrievedAction<T> {
  type: typeof ActionType.USER_RETRIEVED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-099[]

// tag::RDX-097[]
export interface ErrorFetchingUserByIdAction<T> {
  type: typeof ActionType.ERROR_FETCHING_USER_BY_ID;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-097[]

// tag::RDX-101[]
export interface FetchingSpacesAction {
  type: typeof ActionType.FETCHING_SPACES;
  meta?: Meta;
}
// end::RDX-101[]

// tag::RDX-100[]
export interface SpacesRetrievedAction<T> {
  type: typeof ActionType.SPACES_RETRIEVED;
  payload: PubNubObjectApiSuccess<ItemMap<T>>;
  meta?: Meta;
}
// end::RDX-100[]

// tag::RDX-102[]
export interface ErrorFetchingSpacesAction<T> {
  type: typeof ActionType.ERROR_FETCHING_SPACES;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-102[]

// tag::RDX-104[]
export interface CreatingSpaceAction<T> {
  type: typeof ActionType.CREATING_SPACE;
  payload: T;
  meta?: Meta;
}
// end::RDX-104[]

// tag::RDX-103[]
export interface SpaceCreatedAction<T> {
  type: typeof ActionType.SPACE_CREATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-103[]

// tag::RDX-105[]
export interface ErrorCreatingSpaceAction<T> {
  type: typeof ActionType.ERROR_CREATING_SPACE;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-105[]

// tag::RDX-107[]
export interface UpdatingSpaceAction<T> {
  type: typeof ActionType.UPDATING_SPACE;
  payload: T;
  meta?: Meta;
}
// end::RDX-107[]

// tag::RDX-106[]
export interface SpaceUpdatedAction<T> {
  type: typeof ActionType.SPACE_UPDATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-106[]

// tag::RDX-108[]
export interface ErrorUpdatingSpaceAction<T> {
  type: typeof ActionType.ERROR_UPDATING_SPACE;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-108[]

// tag::RDX-110[]
export interface DeletingSpaceAction {
  type: typeof ActionType.DELETING_SPACE;
  payload: string;
  meta?: Meta;
}
// end::RDX-110[]

// tag::RDX-109[]
export interface SpaceDeletedAction<T> {
  type: typeof ActionType.SPACE_DELETED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-109[]

// tag::RDX-111[]
export interface ErrorDeletingSpaceAction<T> {
  type: typeof ActionType.ERROR_DELETING_SPACE;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-111[]

// tag::RDX-113[]
export interface FetchingSpaceByIdAction {
  type: typeof ActionType.FETCHING_SPACE_BY_ID;
  payload: string;
  meta?: Meta;
}
// end::RDX-113[]

// tag::RDX-112[]
export interface SpaceRetrievedAction<T> {
  type: typeof ActionType.SPACE_RETRIEVED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-112[]

// tag::RDX-114[]
export interface ErrorFetchingSpaceByIdAction<T> {
  type: typeof ActionType.ERROR_FETCHING_SPACE_BY_ID;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-114[]

// tag::RDX-115[]
export interface UserAddedToSpaceAction<T extends Identifiable> {
  type: typeof ActionType.USER_ADDED_TO_SPACE;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-115[]

// tag::RDX-116[]
export interface UserRemovedFromSpaceAction<T extends Identifiable> {
  type: typeof ActionType.USER_REMOVED_FROM_SPACE;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-116[]

// tag::RDX-117[]
export interface UserMembershipUpdatedOnSpaceAction<T extends Identifiable> {
  type: typeof ActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-117[]

// tag::RDX-118[]
export interface FetchingMembersAction {
  type: typeof ActionType.FETCHING_MEMBERS;
  payload: string;
  meta?: Meta;
}
// end::RDX-118[]

// tag::RDX-119[]
export interface MembersRetrievedAction {
  type: typeof ActionType.MEMBERS_RETRIEVED;
  payload: PubNubObjectApiSuccess<MembersResult>;
  meta?: Meta;
}
// end::RDX-119[]

// tag::RDX-120[]
export interface ErrorFetchingMembersAction<T> {
  type: typeof ActionType.ERROR_FETCHING_MEMBERS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-120[]

// tag::RDX-122[]
export interface UpdatingMembersAction {
  type: typeof ActionType.UPDATING_MEMBERS;
  payload: string;
  meta?: Meta;
}
// end::RDX-122[]

// tag::RDX-121[]
export interface MembersUpdatedAction<T> {
  type: typeof ActionType.MEMBERS_UPDATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-121[]

// tag::RDX-123[]
export interface ErrorUpdatingMembersAction<T> {
  type: typeof ActionType.ERROR_UPDATING_MEMBERS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-123[]

// tag::RDX-125[]
export interface AddingMembersAction<T> {
  type: typeof ActionType.ADDING_MEMBERS;
  payload: T;
  meta?: Meta;
}
// end::RDX-125[]

// tag::RDX-124[]
export interface MembersAddedAction<T> {
  type: typeof ActionType.MEMBERS_ADDED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-124[]

// tag::RDX-126[]
export interface ErrorAddingMembersAction<T> {
  type: typeof ActionType.ERROR_ADDING_MEMBERS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-126[]

// tag::RDX-128[]
export interface RemovingMembersAction<T> {
  type: typeof ActionType.REMOVING_MEMBERS;
  payload: T;
  meta?: Meta;
}
// end::RDX-128[]

// tag::RDX-127[]
export interface MembersRemovedAction<T> {
  type: typeof ActionType.MEMBERS_REMOVED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-127[]

// tag::RDX-129[]
export interface ErrorRemovingMembersAction<T> {
  type: typeof ActionType.ERROR_REMOVING_MEMBERS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-129[]

// tag::RDX-131[]
export interface FetchingMembershipsAction {
  type: typeof ActionType.FETCHING_MEMBERSHIPS;
  payload: string;
  meta?: Meta;
}
// end::RDX-131[]

// tag::RDX-132[]
export interface MembershipsRetrievedAction {
  type: typeof ActionType.MEMBERSHIPS_RETRIEVED;
  payload: PubNubObjectApiSuccess<MembershipResult>;
  meta?: Meta;
}
// end::RDX-132[]

// tag::RDX-133[]
export interface ErrorFetchingMembershipsAction<T> {
  type: typeof ActionType.ERROR_FETCHING_MEMBERSHIPS;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-133[]

// tag::RDX-135[]
export interface UpdatingMembershipAction {
  type: typeof ActionType.UPDATING_MEMBERSHIP;
  payload: string;
  meta?: Meta;
}
// end::RDX-135[]

// tag::RDX-134[]
export interface MembershipUpdatedAction<T> {
  type: typeof ActionType.MEMBERSHIP_UPDATED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-134[]

// tag::RDX-136[]
export interface ErrorUpdatingMembershipAction<T> {
  type: typeof ActionType.ERROR_UPDATING_MEMBERSHIP;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-136[]

// tag::RDX-138[]
export interface JoiningSpacesAction<T> {
  type: typeof ActionType.JOINING_SPACES;
  payload: T;
  meta?: Meta;
}
// end::RDX-138[]

// tag::RDX-137[]
export interface SpacesJoinedAction<T> {
  type: typeof ActionType.SPACES_JOINED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-137[]

// tag::RDX-139[]
export interface ErrorJoiningSpacesAction<T> {
  type: typeof ActionType.ERROR_JOINING_SPACES;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-139[]

// tag::RDX-141[]
export interface LeavingSpacesAction<T> {
  type: typeof ActionType.LEAVING_SPACES;
  payload: T;
  meta?: Meta;
}
// end::RDX-141[]

// tag::RDX-140[]
export interface SpacesLeftAction<T> {
  type: typeof ActionType.SPACES_LEFT;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-140[]

// tag::RDX-142[]
export interface ErrorLeavingSpacesAction<T> {
  type: typeof ActionType.ERROR_LEAVING_SPACES;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-142[]

// tag::RDX-143[]
export interface MessageReceivedAction<T extends { channel: string }> {
  type: typeof ActionType.MESSAGE_RECEIVED;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-143[]

// tag::RDX-144[]
export interface SendingMessageAction<T extends { channel: string }> {
  type: typeof ActionType.SENDING_MESSAGE;
  payload: T;
  meta?: Meta;
}
// end::RDX-144[]

// tag::RDX-145[]
export interface MessageSentAction<T extends { channel: string }> {
  type: typeof ActionType.MESSAGE_SENT;
  payload: PubNubObjectApiSuccess<T>;
  meta?: Meta;
}
// end::RDX-145[]

// tag::RDX-146[]
export interface ErrorSendingMessageAction<T extends { channel: string }> {
  type: typeof ActionType.ERROR_SENDING_MESSAGE;
  payload: PubNubObjectApiError<T>;
  meta?: Meta;
}
// end::RDX-146[]

// tag::RDX-147[]
export interface SignalAction {
  type: typeof ActionType.SIGNAL;
  payload: SignalActionPayload;
  meta?: Meta;
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
  | CreatingUserAction<T>
  | ErrorCreatingUserAction<T>
  | UserUpdatedAction<T>
  | UpdatingUserAction<T>
  | ErrorUpdatingUserAction<T>
  | UserDeletedAction<T>
  | DeletingUserAction
  | ErrorDeletingUserAction<T>
  | UsersRetrievedAction<T>
  | FetchingUsersAction
  | ErrorFetchingUsersAction<T>
  | UserRetrievedAction<T>
  | FetchingUserByIdAction
  | ErrorFetchingUserByIdAction<T>;

export type SpaceActions<T> =
  | SpaceCreatedAction<T>
  | CreatingSpaceAction<T>
  | ErrorCreatingSpaceAction<T>
  | SpaceUpdatedAction<T>
  | UpdatingSpaceAction<T>
  | ErrorUpdatingSpaceAction<T>
  | SpaceDeletedAction<T>
  | DeletingSpaceAction
  | ErrorDeletingSpaceAction<T>
  | SpacesRetrievedAction<T>
  | FetchingSpacesAction
  | ErrorFetchingSpacesAction<T>
  | SpaceRetrievedAction<T>
  | FetchingSpaceByIdAction
  | ErrorFetchingSpaceByIdAction<T>;

export type MembershipActions<T> =
  | FetchingMembershipsAction
  | MembershipsRetrievedAction
  | ErrorFetchingMembershipsAction<T>
  | UpdatingMembershipAction
  | MembershipUpdatedAction<T>
  | ErrorUpdatingMembershipAction<T>
  | JoiningSpacesAction<T>
  | SpacesJoinedAction<T>
  | ErrorJoiningSpacesAction<T>
  | LeavingSpacesAction<T>
  | SpacesLeftAction<T>
  | ErrorLeavingSpacesAction<T>;

export type MembersActions<T> =
  | FetchingMembersAction
  | MembersRetrievedAction
  | ErrorFetchingMembersAction<T>
  | UpdatingMembersAction
  | MembersUpdatedAction<T>
  | ErrorUpdatingMembersAction<T>
  | AddingMembersAction<T>
  | MembersAddedAction<T>
  | ErrorAddingMembersAction<T>
  | RemovingMembersAction<T>
  | MembersRemovedAction<T>
  | ErrorRemovingMembersAction<T>;

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

export type ListenerActions<
  T extends Identifiable,
  TT extends { channel: string }
> =
  | MessageReceivedAction<TT>
  | SignalAction
  | PresenceListenerActions
  | StatusListenerActions
  | ObjectListenerActions<T>;

export type MessageActions<T extends { channel: string }> =
  | MessageReceivedAction<T>
  | MessageSentAction<T>
  | SendingMessageAction<T>
  | ErrorSendingMessageAction<T>;
