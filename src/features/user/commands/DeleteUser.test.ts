import Pubnub from 'pubnub';
import { UserActionType } from '../UserActionType.enum';
import { deleteUser } from './DeleteUser';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubDeleteUserSuccess() {
  const pubnub = {
    deleteUser: (
      _params: string,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.DeleteUserResponse
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
          data: null,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubDeleteUserFail() {
  const pubnub = {
    deleteUser: (
      _params: string,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.DeleteUserResponse
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
          data: null,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Deleting user ', () => {
  it('should receive USER_DELETED after succesfully deleting user', async () => {
    const expectedActions = [
      UserActionType.DELETING_USER,
      UserActionType.USER_DELETED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteUserSuccess(), {});

    try {
      await store.dispatch(deleteUser({ userId: 'test' }));
    } catch {
      console.log('dispatch deleteUser failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_DELETING_USER after unsuccesfully deleting user', async () => {
    const expectedActions = [
      UserActionType.DELETING_USER,
      UserActionType.ERROR_DELETING_USER,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubDeleteUserFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(deleteUser({ userId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
