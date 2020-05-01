import Pubnub from 'pubnub';
import { UserActionType } from '../UserActionType.enum';
import { createUser } from './CreateUser';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubCreateUserSuccess() {
  const pubnub = {
    createUser: (
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

function fixturePubnubCreateUserFail() {
  const pubnub = {
    createUser: (
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

describe('Creating user ', () => {
  it('should receive USER_CREATED after succesfully creating user', async () => {
    const expectedActions = [
      UserActionType.CREATING_USER,
      UserActionType.USER_CREATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubCreateUserSuccess(), {});

    try {
      await store.dispatch(createUser({ id: 'test', name: 'test' }));
    } catch {
      console.log('dispatch createUser failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_CREATING_USER after unsuccesfully creating user', async () => {
    const expectedActions = [
      UserActionType.CREATING_USER,
      UserActionType.ERROR_CREATING_USER,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubCreateUserFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(createUser({ id: 'test', name: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
