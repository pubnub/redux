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
  });
});
