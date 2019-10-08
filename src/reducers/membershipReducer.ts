import {
  ObjectsActionTypes,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_GET_MEMBERS,
  OBJECTS_GET_MEMBERS_ERROR,
  OBJECTS_GET_MEMBERSHIPS,
  OBJECTS_GET_MEMBERSHIPS_ERROR,
  OBJECTS_ADD_MEMBERS,
  OBJECTS_ADD_MEMBERS_ERROR,
  OBJECTS_REMOVE_MEMBERS,
  OBJECTS_REMOVE_MEMBERS_ERROR,
} from '../types/actions';
import { MembershipState } from '../types/Membership';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
} from '../types/Objects';

let initialState: MembershipState = {
  user: {},
  error: '',
  data: [],
};

const userAddedToSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) => ({
  ...state,
  user: payload.message.data,
});

const addMembers = (
  state: MembershipState,
  payload: ObjectsResponsePayload
) => ({
  ...state,
  data: [...state.data, payload.data],
});

const addMembersError = (
  state: MembershipState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error: payload.errorData.error.message,
});

const removeMembersError = (
  state: MembershipState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error: payload.errorData.error.message,
});

const getMembers = (
  state: MembershipState,
  payload: ObjectsResponsePayload
) => ({
  ...state,
  data: payload.data,
});

const getMembeberships = (
  state: MembershipState,
  payload: ObjectsResponsePayload
) => ({
  ...state,
  user: payload.data,
});

const getMemberError = (
  state: MembershipState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error: payload.errorData.error.message,
});

export const membershipReducer = (
  state = initialState,
  action: ObjectsActionTypes
): MembershipState => {
  switch (action.type) {
    case OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace(state, action.payload);
    case OBJECTS_ADD_MEMBERS:
      return addMembers(state, action.payload);
    case OBJECTS_ADD_MEMBERS_ERROR:
      return addMembersError(state, action.payload);
    case OBJECTS_REMOVE_MEMBERS_ERROR:
      return removeMembersError(state, action.payload);
    case OBJECTS_GET_MEMBERS:
      return getMembers(state, action.payload);
    case OBJECTS_GET_MEMBERSHIPS:
      return getMembeberships(state, action.payload);
    case OBJECTS_GET_MEMBERSHIPS_ERROR:
    case OBJECTS_GET_MEMBERS_ERROR:
      return getMemberError(state, action.payload);
    default:
      return state;
  }
};
