import { createUsersListReducer } from './UsersListReducer';
import { UserDataActionType } from './UserDataActionType.enum';
import { AllUserDataRetrievedAction } from './UserDataActions';
import deepFreeze from 'deep-freeze';

describe('Handling user list reducer without mutating the state', () => {
  interface UserListReducerInitialState {
    uuids: string[];
  }
  let initialState: UserListReducerInitialState;
  beforeEach(() => {
    initialState = {
      uuids: [],
    };
    deepFreeze(initialState);
  });

  describe('Fetching users actions', () => {
    it('should fetch users without mutations', () => {
      const payload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'User1',
              name: 'updatedUser1',
              updated: '',
              eTag: '',
            },
            {
              id: 'User2',
              name: 'updatedUser2',
              updated: '',
              eTag: '',
            },
            {
              id: 'User3',
              name: 'User3',
              updated: '',
              eTag: '',
            },
          ],
        },
        status: {
          error: false,
          errorData: undefined,
          category: '',
          operation: '',
          statusCode: 0,
        },
      };
      const action: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload,
      };
      const expectedState = {
        ...initialState,
        uuids: [
          payload.response.data[0].id,
          payload.response.data[1].id,
          payload.response.data[2].id,
        ],
      };
      expect(createUsersListReducer()(initialState, action)).toEqual(
        expectedState
      );
    });
  });
});
