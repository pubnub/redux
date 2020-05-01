import Pubnub from 'pubnub';
import { UserActionType } from '../UserActionType.enum';
import { updateUser } from './UpdateUser';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubUpdateUserSuccess() {
  const pubnub = {
    updateUser: (
      _params: Pubnub.UserInputParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetUserResponse
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

function fixturePubnubUpdateUserFail() {
  const pubnub = {
    updateUser: (
      _params: Pubnub.UserInputParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetUserResponse
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

describe('Updating user ', () => {
  it('should receive USER_UPDATED after succesfully updating user', async () => {
    const expectedActions = [
      UserActionType.UPDATING_USER,
      UserActionType.USER_UPDATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateUserSuccess(), {});

    try {
      await store.dispatch(updateUser({ id: 'test', name: 'test' }));
    } catch {
      console.log('dispatch updateUsers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_UPDATING_USER after unsuccesfully updating user', async () => {
    const expectedActions = [
      UserActionType.UPDATING_USER,
      UserActionType.ERROR_UPDATING_USER,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateUserFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(updateUser({ id: 'test', name: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
