import Pubnub from 'pubnub';
import { PresenceActionType } from '../PresenceActionType.enum';
import { fetchPresenceState } from './FetchPresenceState';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubFetchPresenceStateSuccess() {
  const pubnub = {
    getState: (
      _params: Pubnub.GetStateParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetStateResponse
      ) => void
    ) => {
      callback(
        {
          error: false,
          statusCode: 200,
          operation: 'test',
        },
        {
          channels: {},
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubFetchPresenceStateFail() {
  const pubnub = {
    getState: (
      _params: Pubnub.GetStateParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetStateResponse
      ) => void
    ) => {
      callback(
        {
          error: true,
          statusCode: 200,
          operation: 'test',
        },
        {
          channels: {},
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Fetching presence state ', () => {
  it('should receive PRESENCE_STATE_RETRIEVED after succesfully fetching presence state', async () => {
    const expectedActions = [
      PresenceActionType.FETCHING_PRESENCE_STATE,
      PresenceActionType.PRESENCE_STATE_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchPresenceStateSuccess(), {});

    try {
      await store.dispatch(fetchPresenceState({ channels: ['channela'] }));
    } catch {
      console.log('dispatch fetchPresenceState failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_PRESENCE_STATE after unsuccesfully fetching presence state', async () => {
    const expectedActions = [
      PresenceActionType.FETCHING_PRESENCE_STATE,
      PresenceActionType.ERROR_FETCHING_PRESENCE_STATE,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchPresenceStateFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchPresenceState({ channels: ['channela'] }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
