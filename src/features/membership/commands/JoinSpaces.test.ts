import Pubnub from 'pubnub';
import { MembershipActionType } from '../MembershipActionType.enum';
import { joinSpaces } from './JoinSpaces';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubJoinSpacesSuccess() {
  const pubnub = {
    joinSpaces: (
      _params: Pubnub.MembershipsInputParameters,
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

function fixturePubnubJoinSpacesFail() {
  const pubnub = {
    joinSpaces: (
      _params: Pubnub.MembershipsInputParameters,
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

describe('Joining spaces ', () => {
  it('should receive SPACES_JOINED after succesfully joining spaces', async () => {
    const expectedActions = [
      MembershipActionType.JOINING_SPACES,
      MembershipActionType.SPACES_JOINED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubJoinSpacesSuccess(), {});

    try {
      await store.dispatch(
        joinSpaces({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      console.log('dispatch joinSpaces failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_JOINING_SPACES after unsuccesfully joining spaces', async () => {
    const expectedActions = [
      MembershipActionType.JOINING_SPACES,
      MembershipActionType.ERROR_JOINING_SPACES,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubJoinSpacesFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        joinSpaces({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
