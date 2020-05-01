import { createMembersReducer } from './MembersReducer';
import { MembersActionType } from './MembersActionType.enum';
import {
  MembersRetrievedAction,
  MembersUpdatedAction,
  MembersAddedAction,
  MembersRemovedAction,
  Members,
} from './MembersActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
import {
  UserMembershipUpdatedOnSpaceEventAction,
  UserRemovedFromSpaceEventAction,
  UserAddedToSpaceEventAction,
} from '../membership/MembershipActions';
import deepFreeze from 'deep-freeze';

describe('Handling members reducer without mutating the state', () => {
  interface MembersReducerInitialState {
    byId: { [key: string]: Members[] };
  }
  interface MetaType {}
  let initialState: MembersReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        space1: [{ id: 'user1', custom: {} }],
      },
    };

    deepFreeze(initialState);
  });

  it('should add user to the space without mutations', () => {
    const firstPayload = {
      data: {
        spaceId: 'space1',
        userId: 'user2',
        custom: {},
      },
      event: '',
      type: '',
    };
    const secondPayload = {
      data: {
        spaceId: 'space1',
        userId: 'user3',
        custom: {},
      },
      event: '',
      type: '',
    };
    const firstAction: UserAddedToSpaceEventAction<Members> = {
      type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
      payload: firstPayload,
    };
    const secondAction: UserAddedToSpaceEventAction<Members> = {
      type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
      payload: secondPayload,
    };
    const expectedState = {
      byId: {
        ...initialState.byId,
        [firstPayload.data.spaceId]: [
          ...initialState.byId[firstPayload.data.spaceId],
          { id: firstPayload.data.userId, custom: {} },
          { id: secondPayload.data.userId, custom: {} },
        ],
      },
    };

    //state after first space is added to the user
    const state = createMembersReducer()(initialState, firstAction);
    //state after second space is added to the user
    expect(createMembersReducer()(state, secondAction)).toEqual({
      ...expectedState,
    });
  });

  it('should remove user from the space without mutations', () => {
    const testData = {
      spaceId: 'space1',
      userId: 'user1',
    };
    const payload = {
      data: {
        spaceId: testData.spaceId,
        userId: testData.userId,
        custom: {},
      },
      event: '',
      type: '',
    };
    const action: UserRemovedFromSpaceEventAction<Members> = {
      type: MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.spaceId]: [],
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update user membership on the space without mutations', () => {
    const testData = {
      spaceId: 'space1',
      userId: 'user1',
    };
    const payload = {
      data: {
        spaceId: testData.spaceId,
        userId: testData.userId,
        custom: { myValue: 'updated' },
      },
      event: '',
      type: '',
    };
    const action: UserMembershipUpdatedOnSpaceEventAction<Members> = {
      type: MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.spaceId]: [
          { id: testData.userId, custom: { myValue: 'updated' } },
        ],
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should retrieve members without mutating the state', () => {
    const testData = {
      spaceId: 'space1',
      users: [
        {
          id: 'user1',
        },
        {
          id: 'user2',
        },
      ],
    };
    const payload = {
      request: {
        spaceId: testData.spaceId,
      },
      response: {
        status: 200,
        data: testData.users,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembersRetrievedAction<Members, MetaType> = {
      type: MembersActionType.MEMBERS_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.spaceId]: payload.response.data,
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update members without mutating the state', () => {
    const testData = {
      spaceId: 'space1',
      users: [
        {
          id: 'user1',
        },
        {
          id: 'user2',
        },
      ],
    };
    const payload = {
      request: {
        spaceId: testData.spaceId,
        users: testData.users,
      },
      response: {
        status: 0,
        data: testData.users,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembersUpdatedAction<Members, MetaType> = {
      type: MembersActionType.MEMBERS_UPDATED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        space1: payload.response.data,
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should add members without mutating the state', () => {
    const testData = {
      spaceId: 'space1',
      users: [
        {
          id: 'user1',
        },
        {
          id: 'user2',
        },
        {
          id: 'user3',
        },
      ],
    };
    const payload = {
      request: {
        spaceId: testData.spaceId,
        users: testData.users,
      },
      response: {
        status: 0,
        data: testData.users,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembersAddedAction<Members, MetaType> = {
      type: MembersActionType.MEMBERS_ADDED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.spaceId]: payload.response.data,
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should remove members without mutating the state', () => {
    const testData = {
      spaceId: 'space1',
      users: [
        {
          id: 'user1',
        },
      ],
    };
    const payload = {
      request: {
        spaceId: testData.spaceId,
        users: testData.users,
      },
      response: {
        status: 0,
        data: [],
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembersRemovedAction<Members, MetaType> = {
      type: MembersActionType.MEMBERS_REMOVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.spaceId]: payload.response.data,
      },
    };
    expect(createMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });
});
