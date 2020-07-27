import Pubnub from 'pubnub';
import { MembershipActionType } from '../MembershipActionType.enum';
import { removeMemberships } from './RemoveMemberships';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubLeaveChannelsSuccess() {
  const pubnub = {
    objects: {
      removeMemberships: (
        _params: Pubnub.RemoveMembershipsParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.ManageMembershipsResponse<{}, {}>
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
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubLeaveChannelsFail() {
  const pubnub = {
    objects: {
      removeMemberships: (
        _params: Pubnub.RemoveMembershipsParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.ManageMembershipsResponse<{}, {}>
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
            status: 500,
          }
        );
      },
    },
  } as Pubnub;

  return pubnub;
}

describe('Leaving membership ', () => {
  it('should receive MEMBERSHIPS_REMOVED after succesfully leaving channels', async () => {
    const expectedActions = [
      MembershipActionType.REMOVING_MEMBERSHIPS,
      MembershipActionType.MEMBERSHIPS_REMOVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubLeaveChannelsSuccess(), {});

    try {
      await store.dispatch(
        removeMemberships({ uuid: 'test', channels: ['channela'] })
      );
    } catch {
      console.log('dispatch leaveChannels failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_REMOVING_MEMBERSHIPS after unsuccesfully leaving channels', async () => {
    const expectedActions = [
      MembershipActionType.REMOVING_MEMBERSHIPS,
      MembershipActionType.ERROR_REMOVING_MEMBERSHIPS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubLeaveChannelsFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        removeMemberships({ uuid: 'test', channels: ['channela'] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
