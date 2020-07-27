import Pubnub from 'pubnub';
import { MessageActionType } from '../MessageActionType.enum';
import { sendMessage } from './SendMessage';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubSendMessageSuccess() {
  const pubnub = {
    publish: (
      _params: Pubnub.PublishParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.PublishResponse
      ) => void
    ) => {
      callback(
        {
          error: false,
          statusCode: 200,
          operation: 'test',
        },
        {
          timetoken: 0,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubSendMessageFail() {
  const pubnub = {
    publish: (
      _params: Pubnub.PublishParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.PublishResponse
      ) => void
    ) => {
      callback(
        {
          error: true,
          statusCode: 200,
          operation: 'test',
        },
        {
          timetoken: 0,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Sending message ', () => {
  it('should receive MESSAGE_SENT after succesfully sending message', async () => {
    const expectedActions = [
      MessageActionType.SENDING_MESSAGE,
      MessageActionType.MESSAGE_SENT,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubSendMessageSuccess(), {});

    try {
      await store.dispatch(
        sendMessage({ message: { some: 'thing' }, channel: 'test' })
      );
    } catch {
      console.log('dispatch sendMessage failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_SENDING_MESSAGE after unsuccesfully sending message', async () => {
    const expectedActions = [
      MessageActionType.SENDING_MESSAGE,
      MessageActionType.ERROR_SENDING_MESSAGE,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubSendMessageFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        sendMessage({ message: { some: 'thing' }, channel: 'test' })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
