import Pubnub from 'pubnub';
import { SpaceActionType } from '../SpaceActionType.enum';
import { createSpace } from './CreateSpace';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubCreateSpaceSuccess() {
  const pubnub = {
    createSpace: (
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

function fixturePubnubCreateSpaceFail() {
  const pubnub = {
    createSpace: (
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

describe('Creating space ', () => {
  it('should receive SPACE_CREATED after succesfully creating space', async () => {
    const expectedActions = [
      SpaceActionType.CREATING_SPACE,
      SpaceActionType.SPACE_CREATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubCreateSpaceSuccess(), {});

    try {
      await store.dispatch(createSpace({ id: 'test', name: 'test' }));
    } catch {
      console.log('dispatch createSpace failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_CREATING_SPACE after unsuccesfully creating space', async () => {
    const expectedActions = [
      SpaceActionType.CREATING_SPACE,
      SpaceActionType.ERROR_CREATING_SPACE,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubCreateSpaceFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(createSpace({ id: 'test', name: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
