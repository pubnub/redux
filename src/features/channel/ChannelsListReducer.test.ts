import { createChannelsListReducer } from './ChannelsListReducer';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import { AllChannelDataRetrievedAction } from './ChannelDataActions';
import deepFreeze from 'deep-freeze';

describe('Handling channel list reducer without mutating the state', () => {
  interface ChannelListReducerInitialState {
    channelIds: string[];
  }
  let initialState: ChannelListReducerInitialState;
  beforeEach(() => {
    initialState = {
      channelIds: [],
    };
    deepFreeze(initialState);
  });

  describe('Fetching channels actions', () => {
    it('should fetch channels without mutations', () => {
      const payload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'channel1',
              name: 'updatedChannel1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel2',
              name: 'updatedChannel2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel3',
              name: 'channel3',
              created: '',
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
      const action: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload,
      };
      const expectedState = {
        ...initialState,
        channelIds: [
          payload.response.data[0].id,
          payload.response.data[1].id,
          payload.response.data[2].id,
        ],
      };
      expect(createChannelsListReducer()(initialState, action)).toEqual(
        expectedState
      );
    });

    it('should fetch multiple pages of channels without mutations', () => {
      const firstPayload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'channel1',
              name: 'updatedChannel1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel2',
              name: 'updatedChannel2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel3',
              name: 'channel3',
              created: '',
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
      const secondPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
        response: {
          status: 200,
          data: [
            {
              id: 'channel4',
              name: 'updatedChannel41',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel5',
              name: 'updatedChannel5',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel6',
              name: 'channel6',
              created: '',
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
      const firstAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        channelIds: [
          firstPayload.response.data[0].id,
          firstPayload.response.data[1].id,
          firstPayload.response.data[2].id,
          secondPayload.response.data[0].id,
          secondPayload.response.data[1].id,
          secondPayload.response.data[2].id,
        ],
      };
      const reducer = createChannelsListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });

    it('should remove duplicates pages of channels without mutations', () => {
      const firstPayload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'channel1',
              name: 'updatedChannel1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel2',
              name: 'updatedChannel2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel3',
              name: 'channel3',
              created: '',
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
      const secondPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
        response: {
          status: 200,
          data: [
            {
              id: 'channel1',
              name: 'updatedChannel1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel2',
              name: 'updatedChannel2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel3',
              name: 'channel3',
              created: '',
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
      const firstAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        channelIds: [
          firstPayload.response.data[0].id,
          firstPayload.response.data[1].id,
          firstPayload.response.data[2].id,
        ],
      };
      const reducer = createChannelsListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });

    it('should fetch multiple pages of channels without mutations', () => {
      const firstPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
        response: {
          status: 200,
          data: [
            {
              id: 'channel1',
              name: 'updatedChannel1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel2',
              name: 'updatedChannel2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel3',
              name: 'channel3',
              created: '',
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
      const secondPayload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'channel4',
              name: 'updatedChannel41',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel5',
              name: 'updatedChannel5',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'channel6',
              name: 'channel6',
              created: '',
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
      const firstAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllChannelDataRetrievedAction<{}, never> = {
        type: ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        channelIds: [
          secondPayload.response.data[0].id,
          secondPayload.response.data[1].id,
          secondPayload.response.data[2].id,
        ],
      };
      const reducer = createChannelsListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });
  });
});
