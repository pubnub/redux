import { createSpaceListReducer } from './SpaceListReducer';
import { SpaceActionType } from './SpaceActionType.enum';
import { SpacesRetrievedAction } from './SpaceActions';
import { Space } from './SpaceActions';
const deepFreeze = require('deep-freeze');

describe('Handling space list reducer without mutating the state', () => {
  interface spaceListReducerInitialState {
    spaceIds: string[];
  }
  let initialState: spaceListReducerInitialState;
  beforeEach(() => {
    initialState = {
      spaceIds: [],
    };
    deepFreeze(initialState);
  });

  describe('Fetching spaces actions', () => {
    it('should fetch spaces without mutations', () => {
      const payload = {
        request: {},
        response: {
          status: '',
          data: [
            {
              id: 'space1',
              name: 'updatedSpace1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'space2',
              name: 'updatedSpace2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'space3',
              name: 'space3',
              created: '',
              updated: '',
              eTag: '',
            },
          ],
        },
        status: {
          error: false,
          errorData: '',
          category: '',
          operation: '',
          statusCode: 0,
        },
      };
      const action: SpacesRetrievedAction<Space, never> = {
        type: SpaceActionType.SPACES_RETRIEVED,
        payload,
      };
      const expectedState = {
        ...initialState,
        spaceIds: [
          payload.response.data[0].id,
          payload.response.data[1].id,
          payload.response.data[2].id,
        ],
      };
      expect(createSpaceListReducer()(initialState, action)).toEqual(
        expectedState
      );
    });
  });
});
