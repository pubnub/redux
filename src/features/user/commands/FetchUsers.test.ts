import Pubnub from 'pubnub';
import { fetchUsers } from './FetchUsers';
import { UserActionType } from '../UserActionType.enum';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetUsersSuccess() {
  const pubnub = {
    getUsers: (
      _params: Pubnub.GetObjectsParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetUsersResponse
      ) => void
    ) => {
      callback(
        {
          error: false,
          statusCode: 200,
          operation: 'test',
        },
        {
          data: [],
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubGetUsersFail() {
  const pubnub = {
    getUsers: (
      _params: Pubnub.GetObjectsParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetUsersResponse
      ) => void
    ) => {
      callback(
        {
          error: true,
          statusCode: 200,
          operation: 'test',
        },
        {
          data: [],
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Updating user ', () => {
  it('should receive USERS_RETRIEVED after succesfully fetching users', async () => {
    const expectedActions = [
      UserActionType.FETCHING_USERS,
      UserActionType.USERS_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetUsersSuccess(), {});

    try {
      await store.dispatch(fetchUsers());
    } catch {
      console.log('dispatch fetchUsers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_USERS after unsuccesfully fetching users', async () => {
    const expectedActions = [
      UserActionType.FETCHING_USERS,
      UserActionType.ERROR_FETCHING_USERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetUsersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchUsers());
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
