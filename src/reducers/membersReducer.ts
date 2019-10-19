// import {
//   OBJECTS_USER_ADDED_TO_SPACE,
//   OBJECTS_FETCH_MEMBERSHIPS,
//   OBJECTS_FETCH_MEMBERSHIPS_ERROR,
//   OBJECTS_USER_REMOVED_FROM_SPACE,
//   OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
//   MembershipListenerActions,
//   MembershipActions,
// } from '../types/actions';
// import { MembershipList } from '../types/Membership';
// import { MembersList } from '../types/Member';
// import {
//   ObjectsActionPayload,
//   ObjectsResponsePayload,
//   ObjectsStatusPayload,
//   ObjectsData,
// } from '../types/Objects';
// import { Identifiable } from 'types/PubNubApi';

// interface MembershipState {
//   membershipById: {
//     [key: string]: MembershipList;
//   };
// }

// let initialState: MembershipState = {
//   membershipById: {
//     byId: [],
//   },
// };

// const userAddedToSpace = <T extends Identifiable>(
//   state: MembershipState,
//   payload: MembershipList
// ) => {
//   let newState = {};

//   Object.keys(newState).forEach((key) => {
//     newState[key] = [...state[key]];
//   });

//   return newState;
// };

// const userRemovedFromSpace = <T extends Identifiable>(
//   state: MembershipState,
//   payload: ObjectsActionPayload<T>
// ) => {
//   const idToDelete = payload.message.data.id;
//   const { [idToDelete]: value, ...otherUsers } = state.usersById.byId;
//   return {
//     ...state,
//     usersById: {
//       ...state.usersById,
//       byId: otherUsers,
//       allIds: state.usersById.allIds.filter(
//         (id) => id !== payload.message.data.id
//       ),
//     },
//   };
// };

// const userMembershipUpdatedOnSpace = <T extends Identifiable>(
//   state: MembershipState,
//   payload: ObjectsActionPayload<T>
// ) => ({
//   ...state,
//   user: payload.message.data,
// });

// const fetchMembers = (
//   state: MembershipState,
//   payload: ObjectsResponsePayload
// ) => {
//   let receivedUsers = initialState;
//   if (Array.isArray(payload.data)) {
//     payload.data.forEach((user: ObjectsData) => {
//       receivedUsers.usersById.byId[user.id] = user;
//       receivedUsers.usersById.allIds = receivedUsers.usersById.allIds.concat(
//         user.id
//       );
//     });
//   }

//   return {
//     ...state,
//     spacesById: {
//       ...state.usersById,
//       byId: receivedUsers.usersById.byId,
//       allIds: receivedUsers.usersById.allIds,
//     },
//   };
// };

// const fetchMembeberships = (
//   state: MembershipState,
//   payload: ObjectsResponsePayload
// ) => {
//   let receivedSpaces = initialState;
//   if (Array.isArray(payload.data)) {
//     payload.data.forEach((space: ObjectsData) => {
//       receivedSpaces.spacesById.byId[space.id] = space;
//       receivedSpaces.spacesById.allIds = receivedSpaces.spacesById.allIds.concat(
//         space.id
//       );
//     });
//   }

//   return {
//     ...state,
//     spacesById: {
//       ...state.spacesById,
//       byId: receivedSpaces.spacesById.byId,
//       allIds: receivedSpaces.spacesById.allIds,
//     },
//   };
// };

// const fetchMemberError = (
//   state: MembersState,
//   payload: ObjectsStatusPayload
// ) => ({
//   ...state,
//   error:
//     payload.errorData !== undefined
//       ? payload.errorData.error.message
//       : payload.message,
// });

// const fetchMembershipError = (
//   state: MembershipState,
//   payload: ObjectsStatusPayload
// ) => ({
//   ...state,
//   error:
//     payload.errorData !== undefined
//       ? payload.errorData.error.message
//       : payload.message,
// });

// export const membershipReducer = <T extends Identifiable>(
//   state = initialState,
//   action: MembershipActions | MembershipListenerActions<T>
// ): MembershipState => {
//   switch (action.type) {
//     case OBJECTS_USER_ADDED_TO_SPACE:
//       return userAddedToSpace(state, action.payload);
//     case OBJECTS_USER_REMOVED_FROM_SPACE:
//       return userRemovedFromSpace(state, action.payload);
//     case OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
//       return userMembershipUpdatedOnSpace(state, action.payload);
//     case OBJECTS_FETCH_MEMBERS:
//       return fetchMembers(state, action.payload);
//     case OBJECTS_FETCH_MEMBERSHIPS:
//       return fetchMembeberships(state, action.payload);
//     case OBJECTS_FETCH_MEMBERSHIPS_ERROR:
//       return fetchMembershipError(state, action.payload);
//     case OBJECTS_FETCH_MEMBERS_ERROR:
//       return fetchMemberError(state, action.payload);
//     default:
//       return state;
//   }
// };
