import Pubnub from 'pubnub';
import { fetchSpaces } from './FetchSpaces';
import { SpaceActionType } from '../SpaceActionType.enum';
import { createMockStore } from '../../../foundations/Test-utils';

function fixturePubnubGetSpacesSuccess() {
  const pubnub = {
    getSpaces: (
      _params: Pubnub.GetObjectsParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpacesResponse
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

function fixturePubnubGetSpacesFail() {
  const pubnub = {
    getSpaces: (
      _params: Pubnub.GetObjectsParameters,
      callback: (
        status: Pubnub.PubnubStatus,
        response: Pubnub.GetSpacesResponse
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
          status: 200,
        }
      );
    },
  } as Pubnub;

  return pubnub;
}

describe('Updating space ', () => {
  it('should receive SPACES_RETRIEVED after succesfully fetching spaces', async () => {
    const expectedActions = [
      SpaceActionType.FETCHING_SPACES,
      SpaceActionType.SPACES_RETRIEVED,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetSpacesSuccess(), {});

    try {
      await store.dispatch(fetchSpaces());
    } catch {
      console.log('dispatch fetchSpaces failed');
    }

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });

  it('should receive ERROR_FETCHING_SPACES after unsuccesfully fetching spaces', async () => {
    const expectedActions = [
      SpaceActionType.FETCHING_SPACES,
      SpaceActionType.ERROR_FETCHING_SPACES,
    ];
    let receivedActions = [];

    const store = createMockStore(fixturePubnubGetSpacesFail(), {});

    let exceptionOcurred = false;

    try {
      await store.dispatch(fetchSpaces());
    } catch {
      exceptionOcurred = true;
    }

    expect(exceptionOcurred).toBe(true);

    receivedActions = store.getActions().map((action) => action.type);
    expect(receivedActions).toEqual(expectedActions);
  });
});
