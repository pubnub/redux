import Pubnub from 'pubnub';
import { SpaceActionType } from '../SpaceActionType.enum';
import { updateSpace } from './UpdateSpace';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubUpdateSpaceSuccess() {
  const pubnub = {
    updateSpace: (
      _params: Pubnub.SpaceInputParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpaceResponse
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
            created: 'test',
            updated: 'test',
          },
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubUpdateSpaceFail() {
  const pubnub = {
    updateSpace: (
      _params: Pubnub.SpaceInputParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpaceResponse
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
            created: 'test',
            updated: 'test',
          },
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Updating space ', () => {
  it('should receive SPACE_UPDATED after succesfully updating space', async () => {
    const expectedActions = [
      SpaceActionType.UPDATING_SPACE,
      SpaceActionType.SPACE_UPDATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateSpaceSuccess(), {});

    try {
      await store.dispatch(updateSpace({ id: 'test', name: 'test' }));
    } catch {
      console.log('dispatch updateSpace failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_UPDATING_SPACE after unsuccesfully updating space', async () => {
    const expectedActions = [
      SpaceActionType.UPDATING_SPACE,
      SpaceActionType.ERROR_UPDATING_SPACE,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateSpaceFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(updateSpace({ id: 'test', name: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
