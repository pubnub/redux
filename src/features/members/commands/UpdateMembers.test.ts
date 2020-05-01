import Pubnub from 'pubnub';
import { MembersActionType } from '../MembersActionType.enum';
import { updateMembers } from './UpdateMembers';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubUpdateMembersSuccess() {
  const pubnub = {
    updateMembers: (
      _params: Pubnub.MembersInputParameters,
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

function fixturePubnubUpdateMembersFail() {
  const pubnub = {
    updateMembers: (
      _params: Pubnub.MembersInputParameters,
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

describe('Updating members ', () => {
  it('should receive MEMBERS_UPDATED after succesfully updating members', async () => {
    const expectedActions = [
      MembersActionType.UPDATING_MEMBERS,
      MembersActionType.MEMBERS_UPDATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateMembersSuccess(), {});

    try {
      await store.dispatch(
        updateMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      console.log('dispatch updateMembers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_UPDATING_MEMBERS after unsuccesfully updating members', async () => {
    const expectedActions = [
      MembersActionType.UPDATING_MEMBERS,
      MembersActionType.ERROR_UPDATING_MEMBERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateMembersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        updateMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
