import Pubnub from 'pubnub';
import { MembershipActionType } from '../MembershipActionType.enum';
import { leaveSpaces } from './LeaveSpaces';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubLeaveSpacesSuccess() {
  const pubnub = {
    leaveSpaces: (
      _params: Pubnub.LeaveSpacesParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetMembershipsResponse
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

function fixturePubnubLeaveSpacesFail() {
  const pubnub = {
    leaveSpaces: (
      _params: Pubnub.LeaveSpacesParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetMembershipsResponse
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

describe('Leaving membership ', () => {
  it('should receive SPACES_LEFT after succesfully leaving spaces', async () => {
    const expectedActions = [
      MembershipActionType.LEAVING_SPACES,
      MembershipActionType.SPACES_LEFT,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubLeaveSpacesSuccess(), {});

    try {
      await store.dispatch(
        leaveSpaces({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      console.log('dispatch leaveSpaces failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_LEAVING_SPACES after unsuccesfully leaving spaces', async () => {
    const expectedActions = [
      MembershipActionType.LEAVING_SPACES,
      MembershipActionType.ERROR_LEAVING_SPACES,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubLeaveSpacesFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        leaveSpaces({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
