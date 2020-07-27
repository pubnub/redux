import Pubnub from 'pubnub';
import { UserDataActionType } from '../UserDataActionType.enum';
import { setUserData } from './SetUserData';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubUpdateUserSuccess() {
  const pubnub = {
    objects: {
      setUUIDMetadata: (
        _params: Pubnub.SetUUIDMetadataParameters<{}>,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.SetUUIDMetadataResponse<{}>
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
              updated: 'test',
            },
            status: 200,
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubUpdateUserFail() {
  const pubnub = {
    objects: {
      setUUIDMetadata: (
        _params: Pubnub.SetUUIDMetadataParameters<{}>,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.SetUUIDMetadataResponse<{}>
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
              updated: 'test',
            },
            status: 200,
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

describe('Updating user ', () => {
  it('should receive USER_DATA_SET after succesfully updating user', async () => {
    const expectedActions = [
      UserDataActionType.SETTING_USER_DATA,
      UserDataActionType.USER_DATA_SET,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateUserSuccess(), {});

    try {
      await store.dispatch(
        setUserData({ uuid: 'test', data: { name: 'test' } })
      );
    } catch {
      console.log('dispatch updateUsers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_SETTING_USER_DATA after unsuccesfully updating user', async () => {
    const expectedActions = [
      UserDataActionType.SETTING_USER_DATA,
      UserDataActionType.ERROR_SETTING_USER_DATA,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateUserFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        setUserData({ uuid: 'test', data: { name: 'test' } })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
