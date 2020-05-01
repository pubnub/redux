import Pubnub from 'pubnub';
import { SpaceActionType } from '../SpaceActionType.enum';
import { deleteSpace } from './DeleteSpace';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubDeleteSpaceSuccess() {
  const pubnub = {
    deleteSpace: (
      _params: string,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.DeleteSpaceResponse
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
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubDeleteSpaceFail() {
  const pubnub = {
    deleteSpace: (
      _params: string,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.DeleteSpaceResponse
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
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Deleting space ', () => {
  it('should receive SPACE_DELETED after succesfully deleting space', async () => {
    const expectedActions = [
      SpaceActionType.DELETING_SPACE,
      SpaceActionType.SPACE_DELETED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteSpaceSuccess(), {});

    try {
      await store.dispatch(deleteSpace({ spaceId: 'test' }));
    } catch {
      console.log('dispatch deleteSpace failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_DELETING_SPACE after unsuccesfully deleting space', async () => {
    const expectedActions = [
      SpaceActionType.DELETING_SPACE,
      SpaceActionType.ERROR_DELETING_SPACE,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteSpaceFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(deleteSpace({ spaceId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
