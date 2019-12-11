import { createMembershipReducer } from './MembershipReducer';
import { MembershipActionType } from './MembershipActionType.enum';
import {
  MembershipRetrievedAction,
  Membership,
  MembershipUpdatedAction,
  SpacesJoinedAction,
  SpacesLeftAction,
  UserMembershipUpdatedOnSpaceEventAction,
  UserAddedToSpaceEventAction,
  UserRemovedFromSpaceEventAction,
} from './MembershipActions';
const deepFreeze = require('deep-freeze');

describe('Handling membership reducer without mutating the state', () => {
  interface membershipReducerInitialState {
    byId: { [key: string]: Membership[] };
  }
  interface MetaType {}
  let initialState: membershipReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        user1: [{ id: 'space1', custom: {} }],
      },
    };

    deepFreeze(initialState);
  });

  it('should add user to the space without mutations', () => {
    const firstPayload = {
      data: {
        spaceId: 'space2',
        userId: 'user1',
        custom: {},
      },
      event: '',
      type: '',
    };
    const secondPayload = {
      data: {
        spaceId: 'space3',
        userId: 'user1',
        custom: {},
      },
      event: '',
      type: '',
    };
    const firstAction: UserAddedToSpaceEventAction<Membership> = {
      type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
      payload: firstPayload,
    };
    const secondAction: UserAddedToSpaceEventAction<Membership> = {
      type: MembershipActionType.USER_ADDED_TO_SPACE_EVENT,
      payload: secondPayload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [firstPayload.data.userId]: [
          ...initialState.byId[firstPayload.data.userId],
          {
            id: firstPayload.data.spaceId,
            custom: {},
          },
          {
            id: secondPayload.data.spaceId,
            custom: {},
          },
        ],
      },
    };

    //state after first space is added to the user
    let state = createMembershipReducer()(initialState, firstAction);
    //state after second space is added to the user
    expect(createMembershipReducer()(state, secondAction)).toEqual({
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
    let action: UserRemovedFromSpaceEventAction<Membership> = {
      type: MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.userId]: [],
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
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
    let action: UserMembershipUpdatedOnSpaceEventAction<Membership> = {
      type: MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT,
      payload,
    };
    let expectedState = {
      ...initialState,
      byId: {
        [testData.userId]: [
          { id: testData.spaceId, custom: { myValue: 'updated' } },
        ],
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should retrieve memberships without mutating the state', () => {
    const testData = {
      userId: 'user1',
      spaces: [
        {
          id: 'space1',
        },
        {
          id: 'space2',
        },
      ],
    };
    const payload = {
      request: {
        userId: testData.userId,
      },
      response: {
        status: '',
        data: testData.spaces,
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembershipRetrievedAction<Membership, MetaType> = {
      type: MembershipActionType.MEMBERSHIP_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.userId]: payload.response.data,
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update memberships without mutating the state', () => {
    const testData = {
      userId: 'user1',
      spaces: [
        {
          id: 'space1',
        },
        {
          id: 'space2',
        },
      ],
    };
    const payload = {
      request: {
        userId: testData.userId,
        spaces: testData.spaces,
      },
      response: {
        status: '',
        data: testData.spaces,
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembershipUpdatedAction<Membership, MetaType> = {
      type: MembershipActionType.MEMBERSHIP_UPDATED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.userId]: payload.response.data,
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should join spaces without mutating the state', () => {
    const testData = {
      userId: 'user1',
      spaces: [
        {
          id: 'space1',
        },
        {
          id: 'space2',
        },
        {
          id: 'space3',
        },
      ],
    };
    const payload = {
      request: {
        userId: testData.userId,
        spaces: testData.spaces,
      },
      response: {
        status: '',
        data: testData.spaces,
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: SpacesJoinedAction<Membership, MetaType> = {
      type: MembershipActionType.SPACES_JOINED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.userId]: payload.response.data,
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should left spaces without mutating the state', () => {
    const testData = {
      userId: 'user1',
      spaces: [
        {
          id: 'space1',
        },
      ],
    };
    const payload = {
      request: {
        userId: testData.userId,
        spaces: testData.spaces,
      },
      response: {
        status: '',
        data: [],
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: SpacesLeftAction<Membership, MetaType> = {
      type: MembershipActionType.SPACES_LEFT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.userId]: payload.response.data,
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });
});
