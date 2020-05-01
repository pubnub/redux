import Pubnub from 'pubnub';
import { fetchMembers } from './FetchMembers';
import { MembersActionType } from '../MembersActionType.enum';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetMembersSuccess() {
  const pubnub = {
    getMembers: (
      _params: Pubnub.GetMembersParameters,
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

function fixturePubnubGetMembersFail() {
  const pubnub = {
    getMembers: (
      _params: Pubnub.GetMembersParameters,
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
  it('should receive MEMBERS_RETRIEVED after succesfully fetching members', async () => {
    const expectedActions = [
      MembersActionType.FETCHING_MEMBERS,
      MembersActionType.MEMBERS_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetMembersSuccess(), {});

    try {
      await store.dispatch(fetchMembers({ spaceId: 'test' }));
    } catch {
      console.log('dispatch fetchMembers failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_MEMBERS after unsuccesfully fetching members', async () => {
    const expectedActions = [
      MembersActionType.FETCHING_MEMBERS,
      MembersActionType.ERROR_FETCHING_MEMBERS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetMembersFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchMembers({ spaceId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
