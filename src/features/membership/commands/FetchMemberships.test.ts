import Pubnub from 'pubnub';
import { fetchMemberships } from './FetchMemberships';
import { MembershipActionType } from '../MembershipActionType.enum';
import { createMockStore } from 'foundations/Test-utils';

function fixturePubnubFetchMembershipsSuccess() {
  const pubnub = {
    objects: {
      getMemberships: (
        _params: Pubnub.GetMembershipsParametersv2,
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

function fixturePubnubFetchMembershipsFail() {
  const pubnub = {
    objects: {
      getMemberships: (
        _params: Pubnub.GetMembershipsParametersv2,
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

describe('Updating memberships ', () => {
  it('should receive MEMBERSHIPS_RETRIEVED after succesfully fetching membership', async () => {
    const expectedActions = [
      MembershipActionType.FETCHING_MEMBERSHIPS,
      MembershipActionType.MEMBERSHIPS_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchMembershipsSuccess(), {});

    try {
      await store.dispatch(fetchMemberships({ uuid: 'test' }));
    } catch {
      console.log('dispatch fetchMemberships failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_MEMBERSHIPS after unsuccesfully fetching membership', async () => {
    const expectedActions = [
      MembershipActionType.FETCHING_MEMBERSHIPS,
      MembershipActionType.ERROR_FETCHING_MEMBERSHIPS,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubFetchMembershipsFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchMemberships({ uuid: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
