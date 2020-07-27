import { createChannelMembersReducer } from './ChannelMembersReducer';
import { ChannelMembersActionType } from './ChannelMembersActionType.enum';
import {
  ChannelMembersRetrievedAction,
  ChannelMembersSetAction,
  ChannelMembersRemovedAction,
} from './ChannelMembersActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
import {
  MembershipRemovedEventAction,
  MembershipSetEventAction,
} from '../membership/MembershipActions';
import deepFreeze from 'deep-freeze';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

describe('Handling members reducer without mutating the state', () => {
  interface MembersReducerInitialState {
    byId: { [key: string]: { id: string; custom: null | ObjectsCustom }[] };
  }
  interface MetaType {}
  let initialState: MembersReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        channel1: [{ id: 'user1', custom: {} }],
      },
    };

    deepFreeze(initialState);
  });

  it('should add user to the channel without mutations', () => {
    const firstPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'user2' },
        custom: {},
        updated: '',
        eTag: '',
      },
      event: 'set' as const,
      type: 'membership' as const,
    };
    const secondPayload = {
      data: {
        channel: { id: 'channel1' },
        uuid: { id: 'user3' },
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
      byId: {
        ...initialState.byId,
        [firstPayload.data.channel.id]: [
          ...initialState.byId[firstPayload.data.channel.id],
          { id: firstPayload.data.uuid.id, custom: {} },
          { id: secondPayload.data.uuid.id, custom: {} },
        ],
      },
    };

    //state after first channel is added to the user
    const state = createChannelMembersReducer()(initialState, firstAction);
    //state after second channel is added to the user
    expect(createChannelMembersReducer()(state, secondAction)).toEqual({
      ...expectedState,
    });
  });

  it('should remove user from the channel without mutations', () => {
    const testData = {
      channelId: 'channel1',
      uuid: 'user1',
    };
    const payload = {
      data: {
        channel: { id: testData.channelId },
        uuid: { id: testData.uuid },
        custom: {},
      },
      event: 'delete' as const,
      type: 'membership' as const,
    };
    const action: MembershipRemovedEventAction<{}> = {
      type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.channelId]: [],
      },
    };
    expect(createChannelMembersReducer()(initialState, action)).toEqual({
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
    const action: MembershipSetEventAction<{
      myValue: string;
    }> = {
      type: MembershipActionType.MEMBERSHIP_SET_EVENT,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.channel]: [
          { id: testData.uuid, custom: { myValue: 'updated' } },
        ],
      },
    };
    expect(createChannelMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should retrieve members without mutating the state', () => {
    const testData = {
      channel: 'channel1',
      uuids: ['user1', 'user2'],
    };
    const payload = {
      request: {
        channel: testData.channel,
      },
      response: {
        status: 200,
        data: testData.uuids.map((id) => ({
          uuid: { id },
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
    const action: ChannelMembersRetrievedAction<{}, {}, MetaType> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        [testData.channel]: payload.response.data.map(
          ({ uuid: { id }, custom }) => ({ id, custom })
        ),
      },
    };
    expect(createChannelMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update members without mutating the state', () => {
    const testData = {
      channel: 'channel1',
      uuids: ['user1', 'user2'],
    };
    const payload = {
      request: {
        channel: testData.channel,
        uuids: testData.uuids,
      },
      response: {
        status: 0,
        data: testData.uuids.map((id) => ({
          uuid: { id },
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
    const action: ChannelMembersSetAction<{}, {}, MetaType> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_SET,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        channel1: payload.response.data.map(({ uuid: { id }, custom }) => ({
          id,
          custom,
        })),
      },
    };
    expect(createChannelMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should remove members without mutating the state', () => {
    const testData = {
      channel: 'channel1',
      uuids: ['user1'],
    };
    const payload = {
      request: {
        channel: testData.channel,
        uuids: testData.uuids,
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
    const action: ChannelMembersRemovedAction<{}, {}, MetaType> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [testData.channel]: payload.response.data,
      },
    };
    expect(createChannelMembersReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });
});
