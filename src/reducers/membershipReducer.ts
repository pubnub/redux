// import {
//   OBJECTS_USER_ADDED_TO_SPACE,
//   OBJECTS_FETCH_MEMBERSHIPS,
//   OBJECTS_FETCH_MEMBERSHIPS_ERROR,
//   OBJECTS_USER_REMOVED_FROM_SPACE,
//   OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
//   MembershipListenerActions,
//   MembershipActions,
// } from '../types/actions';
// import {
//   ObjectsResponsePayload,
//   ObjectsStatusPayload,
//   ObjectsData,
// } from '../types/Objects';
// import {
//   MembershipInfo,
//   PubNubObjectApiSuccess,
//   PubNubObjectApiState,
//   Identifiable
// } from 'types/PubNubApi';
// import {
//   MembershipList, MembershipResult, Membership
// } from 'types/Membership';
// import { successObjectById } from './reducerUtil';

// let createInitialState = <T extends MembershipList>(): PubNubObjectApiState<T> => ({
//   byId: {},
//   loadingById: {},
//   errorById: {},
// });

// const userAddedToSpace = <T extends MembershipList>(
//   state: PubNubObjectApiState<T>,
//   payload: PubNubObjectApiSuccess<MembershipInfo>,
// ) => {
//   let newState = { ...state };

//   Object.keys(newState.byId).forEach((key) => {
//     newState.byId[key] = [ ...newState.byId[key] ] as unknown as T;
//   });

//   let currentValue = newState.byId[payload.data.userId];

//   if (currentValue === undefined) {
//     newState.byId[payload.data.userId] = [ { id: payload.data.spaceId } ] as unknown as T;
//   } else if (currentValue.filter((item) => item.id === payload.data.spaceId).length === 0) {
//     currentValue.push({ id: payload.data.spaceId });
//   }

//   return newState;
// }

// const userRemovedFromSpace = <T extends MembershipList>(
//   state: PubNubObjectApiState<T>,
//   payload: PubNubObjectApiSuccess<MembershipInfo>,
// ) => {
//   let newState = { ...state };

//   Object.keys(newState.byId).forEach((key) => {
//     newState.byId[key] = [ ...state.byId[key] ] as unknown as T;
//   });

//   let currentValue = newState.byId[payload.data.userId];

//   if (currentValue !== undefined) {
//     newState.byId[payload.data.userId] = newState.byId[payload.data.userId].filter((item) => item.id !== payload.data.spaceId ) as unknown as T;
//   }
//   return newState;
// };

// const userMembershipUpdatedOnSpace = <T extends MembershipList>(
//   state: PubNubObjectApiState<T>,
//   payload: PubNubObjectApiSuccess<MembershipInfo>,
// ) => {
//   let newState = { ...state };

//   Object.keys(newState.byId).forEach((key) => {
//     newState.byId[key] = [ ...state.byId[key] ] as unknown as T;
//   });

//   let currentValue = newState.byId[payload.data.userId];

//   if (currentValue !== undefined) {
//     let existing = newState.byId[payload.data.userId].filter((item) => item.id === payload.data.spaceId );

//     if (existing.length > 0) {
//       // existing[0];
//       // update the custom properties on existing
//     }
//   }

//   return newState;
// };

// // const beginFetchSpaceById = <T extends MembershipList>(
// //   state: PubNubObjectApiState<T>,
// //   payload: string
// //   ): PubNubObjectApiState<T> => {
// //     let newState = { ...state };

// //     Object.keys(newState.byId).forEach((key) => {
// //       newState.byId[key] = [ ...state.byId[key] ] as unknown as T;
// //     });

// //     // decrement loading count or set to 0
// //     newState.loadingById[payload] =
// //       newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

// //     // set response payload
// //     newState.byId[id] = { ...payload.data };

// //     return newState;
// //   };

// const fetchMembers = <T extends MembershipResult>(
//   state: PubNubObjectApiState<MembershipList>,
//   payload: PubNubObjectApiSuccess<MembershipInfo>
// ): PubNubObjectApiState<T> => {
//   let newState = { ...state };

//   Object.keys(newState.byId).forEach((key) => {
//     newState.byId[key] = [ ...state.byId[key] ] as unknown as T;
//   });

//   // decrement loading count or set to 0
//   newState.loadingById[payload.] =
//     newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

//   // set response payload
//   newState.byId[id] = { ...payload.data };

//   return newState;
// };

// const fetchSpaceError = <T extends Identifiable>(
//   state: PubNubObjectApiState<T>,
//   payload: PubNubObjectApiError<T>
// ) => errorObjectById<T>(state, payload);

// const createMembershipActionsReducer = <T extends MembershipList>() => (
//   state = createInitialState<T>(),
//   action: MembershipActions<T> | MembershipListenerActions<MembershipInfo>
// ): PubNubObjectApiState<T> => {
//   switch (action.type) {
//     case OBJECTS_USER_ADDED_TO_SPACE:
//       return userAddedToSpace<T>(state, action.payload);
//     case OBJECTS_USER_REMOVED_FROM_SPACE:
//       return userRemovedFromSpace(state, action.payload);
//     case OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
//       return userMembershipUpdatedOnSpace(state, action.payload);
//     case OBJECTS_FETCH_MEMBERS:
//       return fetchMembers(state, action.payload);
//     case OBJECTS_FETCH_MEMBERSHIPS:
//       return fetchMembeberships(state, action.payload);
//     case OBJECTS_FETCH_MEMBERSHIPS_ERROR:
//         return fetchMembershipError(state, action.payload);
//     case OBJECTS_FETCH_MEMBERS_ERROR:
//       return fetchMemberError(state, action.payload);
//     default:
//       return state;
//   }
// };

// // | FetchMembershipsBeginAction
// // | FetchMembershipsAction
// // | FetchMembershipsErrorAction
// // | UpdateMembershipBeginAction<T>
// // | MembershipUpdatedAction<T>
// // | UpdateMembershipErrorAction<T>
// // | JoinSpacesBeginAction<T>
// // | SpacesJoinedAction<T>
// // | JoinSpacesErrorAction<T>
// // | LeaveSpacesBeginAction<T>
// // | SpacesLeftAction<T>
// // | LeaveSpacesErrorAction<T>;
//   // | UserAddedToSpaceAction<T>
//   // | UserRemovedFromSpaceAction<T>
//   // | UserMembershipUpdatedOnSpaceAction<T>;
