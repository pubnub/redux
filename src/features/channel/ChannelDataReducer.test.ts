import { createChannelDataReducer } from './ChannelDataReducer';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import {
  ChannelDataSetAction,
  ChannelDataRemovedAction,
  AllChannelDataRetrievedAction,
  ChannelDataRetrievedAction,
  Channel,
} from './ChannelDataActions';
import { MembershipsRetrievedAction } from '../membership/MembershipActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
import deepFreeze from 'deep-freeze';

describe('Handling channel reducer without mutating the state', () => {
  interface ChannelReducerInitialState {
    byId: {
      [channelId: string]: Channel<{}>;
    };
  }
  let initialState: ChannelReducerInitialState;
  interface MetaType {}
  beforeEach(() => {
    initialState = {
      byId: {
        channel1: {
          id: 'channel1',
          name: 'channel1',
          description: 'channel1',
          updated: '',
          eTag: '',
        },
        channel2: {
          id: 'channel2',
          name: 'channel2',
          description: 'channel2',
          updated: '',
          eTag: '',
        },
        channel3: {
          id: 'channel3',
          name: 'channel3',
          description: 'channel3',
          updated: '',
          eTag: '',
        },
      },
    };
    deepFreeze(initialState);
  });

  it('should update the channel without mutations', () => {
    const payload = {
      request: {
        channel: '',
        data: {
          name: '',
        },
      },
      response: {
        status: 200,
        data: {
          id: 'channel2',
          name: 'updatedChannel2',
          updated: '',
          eTag: '',
        },
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: ChannelDataSetAction<{}, MetaType> = {
      type: ChannelDataActionType.CHANNEL_DATA_SET,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.response.data.id]: {
          ...initialState.byId[payload.response.data.id],
          ...payload.response.data,
        },
      },
    };
    expect(createChannelDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should delete the channel without mutations', () => {
    const payload = {
      request: {
        channel: 'channel1',
      },
      response: {
        status: 0,
        request: {
          channel: 'channel1',
        },
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: ChannelDataRemovedAction<MetaType> = {
      type: ChannelDataActionType.CHANNEL_DATA_REMOVED,
      payload,
    };
    const channelToDelete = payload.response.request.channel;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [channelToDelete]: value, ...rest } = initialState.byId;
    const expectedState = {
      ...initialState,
      byId: rest,
    };
    expect(createChannelDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch channels without mutations', () => {
    const payload = {
      request: {},
      response: {
        status: 200,
        data: [
          {
            id: 'channel1',
            name: 'updatedChannel1',
            description: 'channel1',
            updated: '',
            eTag: '',
          },
          {
            id: 'channel2',
            name: 'updatedChannel2',
            description: 'channel2',
            updated: '',
            eTag: '',
          },
          {
            id: 'channel3',
            name: 'channel3',
            description: 'channel3',
            updated: '',
            eTag: '',
          },
        ],
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const expectedState = {
      ...initialState,
      byId: {
        [payload.response.data[0].id]: { ...payload.response.data[0] },
        [payload.response.data[1].id]: { ...payload.response.data[1] },
        [payload.response.data[2].id]: { ...payload.response.data[2] },
      },
    };
    const action: AllChannelDataRetrievedAction<{}, MetaType> = {
      type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
      payload,
    };
    expect(createChannelDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch the channel by id without mutations', () => {
    const payload = {
      request: {
        channel: 'channel2',
      },
      response: {
        status: 200,
        data: {
          id: 'channel2',
          name: 'channel2',
          description: 'channel2',
          updated: '',
          eTag: '',
        },
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: ChannelDataRetrievedAction<{}, MetaType> = {
      type: ChannelDataActionType.CHANNEL_DATA_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.channel]: payload.response.data,
      },
    };
    expect(createChannelDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch memberships without mutating the state', () => {
    const payload = {
      request: {
        uuid: '',
      },
      response: {
        status: 200,
        data: [
          {
            id: 'channel1',
            name: 'channel1',
            channel: {
              id: 'channel1',
              name: 'channel1',
              description: 'channel1',
              updated: '',
              eTag: '',
            },
            updated: '',
            eTag: '',
          },
        ],
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
    };
    expect(createChannelDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });
});
