import Pubnub from 'pubnub';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import { fetchChannelData } from './FetchChannelData';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubFetchChannelSuccess() {
  const pubnub = {
    objects: {
      getChannelMetadata: (
        _params: Pubnub.GetChannelMetadataParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.GetChannelMetadataResponse<{}>
        ) => void
      ) => {
        callback(
          {
            error: false,
            statusCode: 200,
            operation: 'test',
          },
          {
            data: {
              id: 'test',
              name: 'test',
              eTag: 'test',
              updated: 'test',
            },
            status: 200,
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubFetchChannelFail() {
  const pubnub = {
    objects: {
      getChannelMetadata: (
        _params: Pubnub.GetChannelMetadataParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.GetChannelMetadataResponse<{}>
        ) => void
      ) => {
        callback(
          {
            error: true,
            statusCode: 200,
            operation: 'test',
          },
          {
            data: {
              id: 'test',
              name: 'test',
              eTag: 'test',
              updated: 'test',
            },
            status: 200,
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

describe('Fetching channel by ID ', () => {
  it('should receive CHANNEL_DATA_RETRIEVED after succesfully fetching channel by id', async () => {
    const expectedActions = [
      ChannelDataActionType.FETCHING_CHANNEL_DATA,
      ChannelDataActionType.CHANNEL_DATA_RETRIEVED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchChannelSuccess(), {});

    try {
      await store.dispatch(fetchChannelData({ channel: 'test' }));
    } catch {
      console.log('dispatch fetchChannelById failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_CHANNEL_DATA after unsuccesfully fetching channel by id', async () => {
    const expectedActions = [
      ChannelDataActionType.FETCHING_CHANNEL_DATA,
      ChannelDataActionType.ERROR_FETCHING_CHANNEL_DATA,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchChannelFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchChannelData({ channel: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
