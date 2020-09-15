import { createMembershipReducer } from './MembershipReducer';
import { MembershipActionType } from './MembershipActionType.enum';
import {
  MembershipsRetrievedAction,
  MembershipsSetAction,
  MembershipsRemovedAction,
  MembershipSetEventAction,
  MembershipRemovedEventAction,
} from './MembershipActions';
import deepFreeze from 'deep-freeze';

describe('Handling membership reducer without mutating the state', () => {
  interface MembershipReducerInitialState {
    byId: { [key: string]: { id: string; custom: null | {} }[] };
  }
  interface MetaType {}
  let initialState: MembershipReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        user1: [{ id: 'channel1', custom: {} }],
      },
    };

    deepFreeze(initialState);
  });

  it('should add user to the channel without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel2' },
        uuid: { id: 'user1' },
        custom: {},
        updated: '',
        eTag: '',
      },
      event: 'set' as const,
      type: 'membership' as const,
    };
    const secondPayload = {
      data: {
        channel: { id: 'channel3' },
        uuid: { id: 'user1' },
        custom: {},
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
      payload: secondPayload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [firstPayload.data.uuid.id]: [
          ...initialState.byId[firstPayload.data.uuid.id],
          {
            id: firstPayload.data.channel.id,
            custom: {},
          },
          {
            id: secondPayload.data.channel.id,
            custom: {},
          },
        ],
      },
    };

    //state after first channel is added to the user
    const state = createMembershipReducer()(initialState, firstAction);
    //state after second channel is added to the user
    expect(createMembershipReducer()(state, secondAction)).toEqual({
      ...expectedState,
    });
  });

  it('should remove user from the channel without mutations', () => {
    const testData = {
      channel: 'channel1',
      uuid: 'user1',
    };
    const payload = {
      data: {
        channel: { id: testData.channel },
        uuid: { id: testData.uuid },
        custom: {},
        updated: '',
        eTag: '',
      },
      event: 'delete' as const,
      type: 'membership' as const,
    };
    const action: MembershipRemovedEventAction = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: [],
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update user membership on the channel without mutations', () => {
    const testData = {
      channel: 'channel1',
      uuid: 'user1',
    };
    const payload = {
      data: {
        channel: { id: testData.channel },
        uuid: { id: testData.uuid },
        custom: { myValue: 'updated' },
        updated: '',
        eTag: '',
      },
      event: 'set' as const,
      type: 'membership' as const,
    };
    const action: MembershipSetEventAction<{}> = {
      type: MembershipActionType.MEMBERSHIP_SET_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: [
          { id: testData.channel, custom: { myValue: 'updated' } },
        ],
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should retrieve memberships without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
        {
          id: 'channel2',
        },
      ],
    };
    const payload = {
      request: {
        uuid: testData.uuid,
      },
      response: {
        status: 200,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: payload.response.data.map(
          ({ channel: { id }, custom }) => ({ id, custom })
        ),
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should retrieve multiple pages of memberships without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
        {
          id: 'channel2',
        },
      ],
    };
    const testData2 = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel3',
        },
        {
          id: 'channel4',
        },
      ],
    };
    const firstPayload = {
      request: {
        uuid: testData.uuid,
      },
      response: {
        status: 200,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
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
        uuid: testData2.uuid,
        page: {
          next: 'page1',
          prev: 'page0',
        },
      },
      response: {
        status: 200,
        data: testData2.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const firstAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: firstPayload,
    };
    const secondAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: secondPayload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: [
          ...firstPayload.response.data,
          ...secondPayload.response.data,
        ].map(({ channel: { id }, custom }) => ({ id, custom })),
      },
    };
    const reducer = createMembershipReducer();
    const state = reducer(reducer(initialState, firstAction), secondAction);
    expect(state).toEqual({
      ...expectedState,
    });
  });

  it('should remove duplicates between multiple pages of memberships without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
        {
          id: 'channel2',
        },
      ],
    };
    const firstPayload = {
      request: {
        uuid: testData.uuid,
        page: {
          next: 'page1',
          prev: 'page0',
        },
      },
      response: {
        status: 200,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
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
        uuid: testData.uuid,
      },
      response: {
        status: 200,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const firstAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: firstPayload,
    };
    const secondAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: secondPayload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: [
          ...firstPayload.response.data,
        ].map(({ channel: { id }, custom }) => ({ id, custom })),
      },
    };
    const reducer = createMembershipReducer();
    const state = reducer(reducer(initialState, firstAction), secondAction);
    expect(state).toEqual({
      ...expectedState,
    });
  });

  it('should reset when missing pagination without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
        {
          id: 'channel2',
        },
      ],
    };
    const testData2 = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel3',
        },
        {
          id: 'channel4',
        },
      ],
    };
    const firstPayload = {
      request: {
        uuid: testData2.uuid,
        page: {
          next: 'page1',
          prev: 'page0',
        },
      },
      response: {
        status: 200,
        data: testData2.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
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
        uuid: testData.uuid,
      },
      response: {
        status: 200,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: null,
          updated: '',
          eTag: '',
        })),
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const firstAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: firstPayload,
    };
    const secondAction: MembershipsRetrievedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
      payload: secondPayload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: secondPayload.response.data.map(
          ({ channel: { id }, custom }) => ({ id, custom })
        ),
      },
    };
    const reducer = createMembershipReducer();
    const state = reducer(reducer(initialState, firstAction), secondAction);
    expect(state).toEqual({
      ...expectedState,
    });
  });

  it('should update memberships without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
        {
          id: 'channel2',
        },
      ],
    };
    const payload = {
      request: {
        uuid: testData.uuid,
        channels: testData.channels,
      },
      response: {
        status: 0,
        data: testData.channels.map(({ id }) => ({
          channel: { id },
          custom: {},
          updated: '',
          eTag: '',
        })),
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: MembershipsSetAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_SET,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.uuid]: payload.response.data.map(
          ({ channel: { id }, custom }) => ({ id, custom })
        ),
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should left channels without mutating the state', () => {
    const testData = {
      uuid: 'user1',
      channels: [
        {
          id: 'channel1',
        },
      ],
    };
    const payload = {
      request: {
        uuid: testData.uuid,
        channels: testData.channels,
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
    const action: MembershipsRemovedAction<{}, {}, MetaType> = {
      type: MembershipActionType.MEMBERSHIPS_REMOVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.uuid]: payload.response.data,
      },
    };
    expect(createMembershipReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });
});
