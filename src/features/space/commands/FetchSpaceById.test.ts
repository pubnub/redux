import Pubnub from 'pubnub';
import { SpaceActionType } from '../SpaceActionType.enum';
import { fetchSpaceById } from './FetchSpaceById';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetSpaceSuccess() {
  const pubnub = {
    getSpace: (
      _params: Pubnub.GetSpaceParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpaceResponse
      ) => void
    ) => {
      callback(
        {
          error: false,
          statusCode: 200,
          operation: 'test',
        },
        {
          data: {
            id: 'test',
            name: 'test',
            eTag: 'test',
            created: 'test',
            updated: 'test',
          },
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

function fixturePubnubGetSpaceFail() {
  const pubnub = {
    getSpace: (
      _params: Pubnub.GetSpaceParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpaceResponse
      ) => void
    ) => {
      callback(
        {
          error: true,
          statusCode: 200,
          operation: 'test',
        },
        {
          data: {
            id: 'test',
            name: 'test',
            eTag: 'test',
            created: 'test',
            updated: 'test',
          },
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Fetching space by ID ', () => {
  it('should receive SPACE_RETRIEVED after succesfully fetching space by id', async () => {
    const expectedActions = [
      SpaceActionType.FETCHING_SPACE_BY_ID,
      SpaceActionType.SPACE_RETRIEVED,
    ];

    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetSpaceSuccess(), {});

    try {
      await store.dispatch(fetchSpaceById({ spaceId: 'test' }));
    } catch {
      console.log('dispatch fetchSpaceById failed');
    }

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_SPACE_BY_ID after unsuccesfully fetching space by id', async () => {
    const expectedActions = [
      SpaceActionType.FETCHING_SPACE_BY_ID,
      SpaceActionType.ERROR_FETCHING_SPACE_BY_ID,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetSpaceFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchSpaceById({ spaceId: 'test' }));
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action: any) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
