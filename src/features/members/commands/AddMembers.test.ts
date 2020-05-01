import Pubnub from 'pubnub';
import { MembersActionType } from '../MembersActionType.enum';
import { addMembers } from './AddMembers';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubAddMembersSuccess() {
  const pubnub = {
    addMembers: (
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

function fixturePubnubAddMembersFail() {
  const pubnub = {
    addMembers: (
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

describe('Adding members ', () => {
  it('should receive MEMBERS_ADDED after succesfully adding members', async () => {
    const expectedActions = [
      MembersActionType.ADDING_MEMBERS,
      MembersActionType.MEMBERS_ADDED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubAddMembersSuccess(), {});

    try {
      await store.dispatch(
        addMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      console.log('dispatch addMembers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_ADDING_MEMBERS after unsuccesfully adding members', async () => {
    const expectedActions = [
      MembersActionType.ADDING_MEMBERS,
      MembersActionType.ERROR_ADDING_MEMBERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubAddMembersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        addMembers({ spaceId: 'test', users: [{ id: 'usera' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
