import Pubnub from 'pubnub';
import { MembershipActionType } from '../MembershipActionType.enum';
import { updateMembership } from './UpdateMembership';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubUpdateMembershipSuccess() {
  const pubnub = {
    updateMemberships: (
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

function fixturePubnubUpdateMembershipFail() {
  const pubnub = {
    updateMemberships: (
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

describe('Updating membership ', () => {
  it('should receive MEMBERSHIP_UPDATED after succesfully updating membership', async () => {
    const expectedActions = [
      MembershipActionType.UPDATING_MEMBERSHIP,
      MembershipActionType.MEMBERSHIP_UPDATED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateMembershipSuccess(), {});

    try {
      await store.dispatch(
        updateMembership({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      console.log('dispatch updateMembership failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_UPDATING_MEMBERSHIP after unsuccesfully updating membership', async () => {
    const expectedActions = [
      MembershipActionType.UPDATING_MEMBERSHIP,
      MembershipActionType.ERROR_UPDATING_MEMBERSHIP,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubUpdateMembershipFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(
        updateMembership({ userId: 'test', spaces: [{ id: 'spacea' }] })
      );
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
