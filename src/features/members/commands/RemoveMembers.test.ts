import Pubnub from 'pubnub';
import { MembersActionType } from '../MembersActionType.enum';
import { removeMembers } from './RemoveMembers';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubRemoveMembersSuccess() {
  const pubnub = {
    removeMembers: (
      _params: Pubnub.RemoveMembersParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetMembersResponse
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

function fixturePubnubRemoveMembersFail() {
  const pubnub = {
    removeMembers: (
      _params: Pubnub.RemoveMembersParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetMembersResponse
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
  } as Pubnub;

  return pubnub;
}

describe('Removing members ', () => {
  it('should receive MEMBERS_REMOVED after succesfully removing members', async () => {
    const expectedActions = [
      MembersActionType.REMOVING_MEMBERS,
      MembersActionType.MEMBERS_REMOVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubRemoveMembersSuccess(), {});

    try {
      await store.dispatch(
        removeMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      console.log('dispatch removeMembers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_REMOVING_MEMBERS after unsuccesfully removing members', async () => {
    const expectedActions = [
      MembersActionType.REMOVING_MEMBERS,
      MembersActionType.ERROR_REMOVING_MEMBERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubRemoveMembersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        removeMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
