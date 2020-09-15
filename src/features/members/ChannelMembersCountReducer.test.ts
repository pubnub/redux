import {
  createChannelMembersCountReducer,
  MembersCountByChannelIdState,
} from './ChannelMembersCountReducer';
import { ChannelMembersActionType } from './ChannelMembersActionType.enum';
import {
  ChannelMembersRetrievedAction,
  ChannelMembersSetAction,
  ChannelMembersRemovedAction,
} from './ChannelMembersActions';
import { MembershipActionType } from 'features/membership/MembershipActionType.enum';
import {
  MembershipSetEventAction,
  MembershipRemovedEventAction,
} from 'features/membership/MembershipActions';
import deepFreeze from 'deep-freeze';

describe('Handling channel members count reducer without mutating the state', () => {
  let initialState: MembersCountByChannelIdState;
  beforeEach(() => {
    initialState = {
      byId: {
        channel1: 10,
      },
      removed: {
        channel1: {},
      },
      added: {
        channel1: {},
      },
    };

    deepFreeze(initialState);
  });

  it('should set channel members without mutations', () => {
    // test all types of actions that include a potential totalCount
    const firstPayload = {
      request: {
        channel: 'channel1',
      },
      response: {
        status: 0,
        data: [],
        totalCount: 100,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const secondPayload = {
      request: {
        channel: 'channel2',
        uuids: ['uuid1'],
      },
      response: {
        status: 0,
        data: [],
        totalCount: 90,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const thirdPayload = {
      request: {
        channel: 'channel3',
        uuids: ['uuid1'],
      },
      response: {
        status: 0,
        data: [],
        totalCount: 80,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const firstAction: ChannelMembersRetrievedAction<{}, {}, {}> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
      payload: firstPayload,
    };
    const secondAction: ChannelMembersSetAction<{}, {}, {}> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_SET,
      payload: secondPayload,
    };
    const thirdAction: ChannelMembersRemovedAction<{}, {}, {}> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED,
      payload: thirdPayload,
    };
    // only care about byId (counts)
    const expectedState = {
      byId: {
        channel1: 100,
        channel2: 90,
        channel3: 80,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(
      reducer(reducer(initialState, firstAction), secondAction),
      thirdAction
    );
    expect(state.byId).toEqual(expectedState.byId);
  });

  it('should ignore responses missing totalCount without mutations', () => {
    const firstPayload = {
      request: {
        channel: 'channel1',
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
    const firstAction: ChannelMembersRetrievedAction<{}, {}, {}> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
      payload: firstPayload,
    };
    // only care about byId (counts)
    const expectedState = {
      byId: {
        channel1: 10,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(initialState, firstAction);
    expect(state.byId).toEqual(expectedState.byId);
  });

  it('should ignore repeated set events without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'uuid1' },
        custom: null,
        updated: '',
        eTag: '',
      },
      event: 'set' as const,
      type: 'membership' as const,
    };
    const firstAction: MembershipSetEventAction<{}> = {
      type: MembershipActionType.MEMBERSHIP_SET_EVENT,
      payload: firstPayload,
    };
    const secondAction: MembershipSetEventAction<{}> = {
      type: MembershipActionType.MEMBERSHIP_SET_EVENT,
      payload: firstPayload,
    };
    // only care about byId
    const expectedState = {
      byId: {
        channel1: 11,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(reducer(initialState, firstAction), secondAction);
    expect(expectedState.byId).toEqual(state.byId);
  });

  it('should ignore repeated remove events without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'uuid1' },
        custom: null,
        updated: '',
        eTag: '',
      },
      event: 'delete' as const,
      type: 'membership' as const,
    };
    const firstAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    const secondAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    // only care about byId
    const expectedState = {
      byId: {
        channel1: 9,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(reducer(initialState, firstAction), secondAction);
    expect(expectedState.byId).toEqual(state.byId);
  });

  it('should accept repeated events after reset without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'uuid1' },
        custom: null,
        updated: '',
        eTag: '',
      },
      event: 'delete' as const,
      type: 'membership' as const,
    };
    const secondPayload = {
      request: {
        channel: 'channel1',
      },
      response: {
        status: 0,
        data: [],
        totalCount: 100,
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const firstAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    const secondAction: ChannelMembersRetrievedAction<{}, {}, {}> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
      payload: secondPayload,
    };
    const thirdAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    // only care about byId (counts)
    const expectedState = {
      byId: {
        channel1: 99,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(
      reducer(reducer(initialState, firstAction), secondAction),
      thirdAction
    );
    expect(state.byId).toEqual(expectedState.byId);
  });

  it('should track events without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'uuid1' },
        custom: null,
        updated: '',
        eTag: '',
      },
      event: 'delete' as const,
      type: 'membership' as const,
    };
    const secondPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'uuid1' },
        custom: null,
        updated: '',
        eTag: '',
      },
      event: 'set' as const,
      type: 'membership' as const,
    };
    const firstAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    const secondAction: MembershipSetEventAction<{}> = {
      type: MembershipActionType.MEMBERSHIP_SET_EVENT,
      payload: secondPayload,
    };
    const thirdAction: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload: firstPayload,
    };
    // only care about byId (counts)
    const expectedState = {
      byId: {
        channel1: 9,
      },
    };
    // perform actions
    const reducer = createChannelMembersCountReducer();
    const state = reducer(
      reducer(reducer(initialState, firstAction), secondAction),
      thirdAction
    );
    expect(state.byId).toEqual(expectedState.byId);
  });
});
