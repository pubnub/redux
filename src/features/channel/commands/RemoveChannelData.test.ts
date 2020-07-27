import Pubnub from 'pubnub';
import { ChannelDataActionType } from '../ChannelDataActionType.enum';
import { removeChannelData } from './RemoveChannelData';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubDeleteChannelSuccess() {
  const pubnub = {
    objects: {
      removeChannelMetadata: (
        _params: { channel: string },
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.RemoveChannelMetadataResponse
        ) => void
      ) => {
        callback(
          {
            error: false,
            statusCode: 200,
            operation: 'test',
          },
          {
            status: 200,
            data: {},
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubDeleteChannelFail() {
  const pubnub = {
    objects: {
      removeChannelMetadata: (
        _params: { channel: string },
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.RemoveChannelMetadataResponse
        ) => void
      ) => {
        callback(
          {
            error: true,
            statusCode: 200,
            operation: 'test',
          },
          {
            status: 200,
            data: {},
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

describe('Deleting channel ', () => {
  it('should receive CHANNEL_DATA_REMOVED after succesfully deleting channel', async () => {
    const expectedActions = [
      ChannelDataActionType.REMOVING_CHANNEL_DATA,
      ChannelDataActionType.CHANNEL_DATA_REMOVED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteChannelSuccess(), {});

    try {
      await store.dispatch(removeChannelData({ channel: 'test' }));
    } catch {
      console.log('dispatch deleteChannel failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_REMOVING_CHANNEL_DATA after unsuccesfully deleting channel', async () => {
    const expectedActions = [
      ChannelDataActionType.REMOVING_CHANNEL_DATA,
      ChannelDataActionType.ERROR_REMOVING_CHANNEL_DATA,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteChannelFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(removeChannelData({ channel: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
