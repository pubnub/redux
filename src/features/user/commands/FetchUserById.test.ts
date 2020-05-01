import Pubnub from 'pubnub';
import { UserActionType } from '../UserActionType.enum';
import { fetchUserById } from './FetchUserById';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetUserSuccess() {
  const pubnub = {
    getUser: (
      _params: Pubnub.GetUserParameters,
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

function fixturePubnubGetUserFail() {
  const pubnub = {
    getUser: (
      _params: Pubnub.GetUserParameters,
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

describe('Fetching user by ID ', () => {
  it('should receive USER_RETRIEVED after succesfully fetching user by id', async () => {
    const expectedActions = [
      UserActionType.FETCHING_USER_BY_ID,
      UserActionType.USER_RETRIEVED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetUserSuccess(), {});

    try {
      await store.dispatch(fetchUserById({ userId: 'test' }));
    } catch {
      console.log('dispatch fetchUserById failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_USER_BY_ID after unsuccesfully fetching user by id', async () => {
    const expectedActions = [
      UserActionType.FETCHING_USER_BY_ID,
      UserActionType.ERROR_FETCHING_USER_BY_ID,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetUserFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchUserById({ userId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
