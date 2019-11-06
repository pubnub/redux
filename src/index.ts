// Commands
import {
  joinSpaces,
  joiningSpaces,
  spacesJoined,
  errorJoiningSpaces,
} from './features/membership/commands/JoinSpaces';
import {
  leaveSpaces,
  leavingSpaces,
  spacesLeft,
  errorLeavingSpaces,
} from './features/membership/commands/LeaveSpaces';
import {
  fetchMemberships,
  fetchingMemberships,
  membershipsRetrieved,
  errorFetchingMemberships,
} from './features/membership/commands/FetchMemberships';
import {
  updateMembership,
  updatingMemberships,
  membershipUpdated,
  errorUpdatingMembership,
} from './features/membership/commands/UpdateMembership';
import {
  fetchMembers,
  fetchingMembers,
  membersRetrieved,
  errorFetchingMembers,
} from './features/members/commands/FetchMembers';
import {
  updateMembers,
  updatingMembers,
  membersUpdated,
  errorUpdatingMembers,
} from './features/members/commands/UpdateMembers';
import {
  addMembers,
  addingMembers,
  membersAdded,
  errorAddingMembers,
} from './features/members/commands/AddMembers';
import {
  removeMembers,
  removingMembers,
  membersRemoved,
  errorRemovingMembers,
} from './features/members/commands/RemoveMembers';
import {
  sendMessage,
  sendingMessage,
  messageSent,
  errorSendingmessage,
} from './features/message/commands/SendMessage';
import {
  createSpace,
  creatingSpace,
  spaceCreated,
  errorCreatingSpace,
} from './features/space/commands/CreateSpace';
import {
  deleteSpace,
  deletingSpace,
  spaceDeleted,
  errorDeletingSpace,
} from './features/space/commands/DeleteSpace';
import {
  fetchSpaceById,
  fetchingSpaceById,
  spaceRetrieved,
  errorFetchingSpaceById,
} from './features/space/commands/FetchSpaceById';
import {
  fetchSpaces,
  fetchingSpaces,
  spacesRetrieved,
  errorFetchingSpaces,
} from './features/space/commands/FetchSpaces';
import {
  updateSpace,
  updatingSpace,
  spaceUpdated,
  errorUpdatingSpace,
} from './features/space/commands/UpdateSpace';
import {
  createUser,
  creatingUser,
  userCreated,
  errorCreatingUser,
} from './features/user/commands/CreateUser';
import {
  deleteUser,
  deletingUser,
  userDeleted,
  errorDeletingUser,
} from './features/user/commands/DeleteUser';
import {
  fetchUserById,
  fetchingUserById,
  userRetrieved,
  errorFetchingUserById,
} from './features/user/commands/FetchUserById';
import {
  fetchUsers,
  fetchingUsers,
  usersRetrieved,
  errorFetchingUsers,
} from './features/user/commands/FetchUsers';
import {
  updateUser,
  updatingUser,
  userUpdated,
  errorUpdatingUser,
} from './features/user/commands/UpdateUser';
// Listeners
import { createUserListener } from './features/user/UserListener';
import { createSpaceListener } from './features/space/SpaceListener';
import { createMembershipListener } from './features/membership/MembershipListener';
import { createPubNubListener } from './features/quickStart/PubNubListener';
import { createMessageListener } from './features/message/MessageListener';
import { createPresenceListener } from './features/presence/PresenceListener';
import { createSignalListener } from './features/signal/SignalListener';
import { combineListeners } from './common/Combinelisteners';
import {
  networkIssues,
  accessDenied,
  malformedResponse,
  badRequest,
  decryptionError,
  timeoutConnection,
  requestMessageCountExceeded,
  unknown,
  createErrorStatusListener,
} from './features/errorStatus/ErrorStatusListener'
import {
  networkUp,
  networkDown,
  createNetworkStatusListener,
} from './features/networkStatus/NetworkStatusListener'
import {
  connected,
  reconnected,
  createSubscriptionStatusListener,
} from './features/subscriptionStatus/SubscriptionStatusListener'
// Reducers
import { createMessageReducer } from './features/message/MessageReducer';
import { createNetworkStatusReducer } from './features/networkStatus/NetworkStatusReducer';
import { createUserReducer } from './features/user/UserReducer';
import { createUserListReducer } from './features/user/UserListReducer';
import { createSpaceReducer } from './features/space/SpaceReducer';
import { createSpaceListReducer } from './features/space/SpaceListReducer';
import { createMembershipReducer } from './features/membership/MembershipReducer';
import { createMembersReducer } from './features/members/MembersReducer';
// Types

// Response Types
import { ErrorStatusResponse } from './features/errorStatus/ErrorStatusActions';
import { NetworkStatusResponse } from './features/networkStatus/NetworkStatusActions';
import { SubscriptionStatusResponse } from './features/subscriptionStatus/SubscribeStatusActions';

export {
  // Commands
  joinSpaces,
  joiningSpaces,
  spacesJoined,
  errorJoiningSpaces,
  leaveSpaces,
  leavingSpaces,
  spacesLeft,
  errorLeavingSpaces,
  fetchMemberships,
  fetchingMemberships,
  membershipsRetrieved,
  errorFetchingMemberships,
  updateMembership,
  updatingMemberships,
  membershipUpdated,
  errorUpdatingMembership,
  fetchMembers,
  fetchingMembers,
  membersRetrieved,
  errorFetchingMembers,
  updateMembers,
  updatingMembers,
  membersUpdated,
  errorUpdatingMembers,
  addMembers,
  addingMembers,
  membersAdded,
  errorAddingMembers,
  removeMembers,
  removingMembers,
  membersRemoved,
  errorRemovingMembers,
  sendMessage,
  sendingMessage,
  messageSent,
  errorSendingmessage,
  // Listeners
  createPubNubListener,
  createMembershipListener,
  createMessageListener,
  createPresenceListener,
  createSignalListener,
  createSpaceListener,
  createNetworkStatusListener,
  createSubscriptionStatusListener,
  createErrorStatusListener,
  createUserListener,
  combineListeners,
  createSpace,
  creatingSpace,
  spaceCreated,
  errorCreatingSpace,
  deleteSpace,
  deletingSpace,
  spaceDeleted,
  errorDeletingSpace,
  fetchSpaceById,
  fetchingSpaceById,
  spaceRetrieved,
  errorFetchingSpaceById,
  fetchSpaces,
  fetchingSpaces,
  spacesRetrieved,
  errorFetchingSpaces,
  updateSpace,
  updatingSpace,
  spaceUpdated,
  errorUpdatingSpace,
  createUser,
  creatingUser,
  userCreated,
  errorCreatingUser,
  deleteUser,
  deletingUser,
  userDeleted,
  errorDeletingUser,
  fetchUserById,
  fetchingUserById,
  userRetrieved,
  errorFetchingUserById,
  fetchUsers,
  fetchingUsers,
  usersRetrieved,
  errorFetchingUsers,
  updateUser,
  updatingUser,
  userUpdated,
  errorUpdatingUser,
  createMessageReducer,
  createNetworkStatusReducer,
  createUserReducer,
  createUserListReducer,
  createSpaceReducer,
  createSpaceListReducer,
  createMembershipReducer,
  createMembersReducer,
  networkIssues,
  accessDenied,
  malformedResponse,
  badRequest,
  decryptionError,
  timeoutConnection,
  requestMessageCountExceeded,
  unknown,
  networkUp,
  networkDown,
  connected,
  reconnected,
  // JoinAction,
  // LeaveAction,
  // TimeoutAction,
  // StateChangeAction,
  // NetworkUpAction,
  // NetworkDownAction,
  // NetworkIssuesAction,
  // ReconnectedAction,
  // ConnectedAction,
  // AccessDeniedAction,
  // MalformedResponseAction,
  // BadRequestAction,
  // DecryptionErrorAction,
  // RequestMessageCountExceedAction,
  // TimeoutConnectionAction,
  // UnknownAction,
  // UpdatingUserAction,
  // UserUpdatedAction,
  // ErrorUpdatingUserAction,
  // DeletingUserAction,
  // UserDeletedAction,
  // ErrorDeletingUserAction,
  // CreatingUserAction,
  // UserCreatedAction,
  // ErrorCreatingUserAction,
  // FetchingUsersAction,
  // UsersRetrievedAction,
  // ErrorFetchingUsersAction,
  // FetchingUserByIdAction,
  // UserRetrievedAction,
  // ErrorFetchingUserByIdAction,
  // FetchingSpacesAction,
  // SpacesRetrievedAction,
  // ErrorFetchingSpacesAction,
  // CreatingSpaceAction,
  // SpaceCreatedAction,
  // ErrorCreatingSpaceAction,
  // UpdatingSpaceAction,
  // SpaceUpdatedAction,
  // ErrorUpdatingSpaceAction,
  // DeletingSpaceAction,
  // SpaceDeletedAction,
  // ErrorDeletingSpaceAction,
  // FetchingSpaceByIdAction,
  // SpaceRetrievedAction,
  // ErrorFetchingSpaceByIdAction,
  // UserAddedToSpaceAction,
  // UserRemovedFromSpaceAction,
  // UserMembershipUpdatedOnSpaceAction,
  // FetchingMembersAction,
  // MembersRetrievedAction,
  // ErrorFetchingMembersAction,
  // UpdatingMembersAction,
  // MembersUpdatedAction,
  // ErrorUpdatingMembersAction,
  // AddingMembersAction,
  // MembersAddedAction,
  // ErrorAddingMembersAction,
  // RemovingMembersAction,
  // MembersRemovedAction,
  // ErrorRemovingMembersAction,
  // FetchingMembershipsAction,
  // MembershipsRetrievedAction,
  // ErrorFetchingMembershipsAction,
  // UpdatingMembershipAction,
  // MembershipUpdatedAction,
  // ErrorUpdatingMembershipAction,
  // JoiningSpacesAction,
  // SpacesJoinedAction,
  // ErrorJoiningSpacesAction,
  // LeavingSpacesAction,
  // SpacesLeftAction,
  // ErrorLeavingSpacesAction,
  // MessageReceivedAction,
  // SendingMessageAction,
  // MessageSentAction,
  // ErrorSendingMessageAction,
  // SignalAction,
  // MessageResponse,
  // Space,
  // User,
  ErrorStatusResponse,
  NetworkStatusResponse,
  SubscriptionStatusResponse,
};
