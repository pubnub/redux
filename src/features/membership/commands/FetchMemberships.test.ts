import Pubnub from 'pubnub';
import { fetchMemberships } from './FetchMemberships';
import { MembershipActionType } from '../MembershipActionType.enum';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetMembershipsSuccess() {
  const pubnub = {
    getMemberships: (
      _params: Pubnub.GetMembershipsParameters,
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

function fixturePubnubGetMembershipsFail() {
  const pubnub = {
    getMemberships: (
      _params: Pubnub.GetMembershipsParameters,
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

describe('Updating memberships ', () => {
  it('should receive MEMBERSHIP_RETRIEVED after succesfully fetching membership', async () => {
    const expectedActions = [
      MembershipActionType.FETCHING_MEMBERSHIP,
      MembershipActionType.MEMBERSHIP_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetMembershipsSuccess(), {});

    try {
      await store.dispatch(fetchMemberships({ userId: 'test' }));
    } catch {
      console.log('dispatch fetchMemberships failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_MEMBERSHIP after unsuccesfully fetching membership', async () => {
    const expectedActions = [
      MembershipActionType.FETCHING_MEMBERSHIP,
      MembershipActionType.ERROR_FETCHING_MEMBERSHIP,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetMembershipsFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchMemberships({ userId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
