import {
  ObjectsActionTypes,
  OBJECTS_USER_ADDED_TO_SPACE,
  OBJECTS_GET_MEMBERS,
  OBJECTS_GET_MEMBERS_ERROR,
  OBJECTS_GET_MEMBERSHIPS,
  OBJECTS_GET_MEMBERSHIPS_ERROR,
  OBJECTS_USER_REMOVED_FROM_SPACE,
  OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE,
} from '../types/actions';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
} from '../types/Objects';

interface MembershipState {
  user: object;
  error: string;
  data: object[];
}

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

const userRemovedFromSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) => ({
  ...state,
  user: payload.message.data,
});

const userMembershipUpdatedOnSpace = (
  state: MembershipState,
  payload: ObjectsActionPayload
) => ({
  ...state,
  user: payload.message.data,
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
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

export const membershipReducer = (
  state = initialState,
  action: ObjectsActionTypes
): MembershipState => {
  switch (action.type) {
    case OBJECTS_USER_ADDED_TO_SPACE:
      return userAddedToSpace(state, action.payload);
    case OBJECTS_USER_REMOVED_FROM_SPACE:
      return userRemovedFromSpace(state, action.payload);
    case OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE:
      return userMembershipUpdatedOnSpace(state, action.payload);
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
