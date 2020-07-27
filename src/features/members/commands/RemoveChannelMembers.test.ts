import Pubnub from 'pubnub';
import { ChannelMembersActionType } from '../ChannelMembersActionType.enum';
import { removeChannelMembers } from './RemoveChannelMembers';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubRemoveMembersSuccess() {
  const pubnub = {
    objects: {
      removeChannelMembers: (
        _params: Pubnub.RemoveChannelMembersParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.ManageChannelMembersResponse<{}, {}>
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

function fixturePubnubRemoveMembersFail() {
  const pubnub = {
    objects: {
      removeChannelMembers: (
        _params: Pubnub.RemoveChannelMembersParameters,
        callback: (
          status: Pubnub.PubnubStatus,
          response: Pubnub.ManageChannelMembersResponse<{}, {}>
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

describe('Removing members ', () => {
  it('should receive CHANNEL_MEMBERS_REMOVED after succesfully removing members', async () => {
    const expectedActions = [
      ChannelMembersActionType.REMOVING_CHANNEL_MEMBERS,
      ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubRemoveMembersSuccess(), {});

    try {
      await store.dispatch(
        removeChannelMembers({ channel: 'test', uuids: ['usera'] })
      );
    } catch {
      console.log('dispatch removeMembers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_REMOVING_CHANNEL_MEMBERS after unsuccesfully removing members', async () => {
    const expectedActions = [
      ChannelMembersActionType.REMOVING_CHANNEL_MEMBERS,
      ChannelMembersActionType.ERROR_REMOVING_CHANNEL_MEMBERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubRemoveMembersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        removeChannelMembers({ channel: 'test', uuids: ['usera'] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
