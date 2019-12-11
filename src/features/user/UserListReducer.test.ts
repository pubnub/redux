import { createUserListReducer } from './UserListReducer';
import { UserActionType } from './UserActionType.enum';
import { UsersRetrievedAction } from './UserActions';
import { User } from './UserActions';
const deepFreeze = require('deep-freeze');

describe('Handling user list reducer without mutating the state', () => {
  interface UserListReducerInitialState {
    userIds: string[];
  }
  let initialState: UserListReducerInitialState;
  beforeEach(() => {
    initialState = {
      userIds: [],
    };
    deepFreeze(initialState);
  });

  describe('Fetching users actions', () => {
    it('should fetch users without mutations', () => {
      const payload = {
        request: {},
        response: {
          status: '',
          data: [
            {
              id: 'User1',
              name: 'updatedUser1',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'User2',
              name: 'updatedUser2',
              created: '',
              updated: '',
              eTag: '',
            },
            {
              id: 'User3',
              name: 'User3',
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
      const action: UsersRetrievedAction<User, never> = {
        type: UserActionType.USERS_RETRIEVED,
        payload,
      };
      const expectedState = {
        ...initialState,
        userIds: [
          payload.response.data[0].id,
          payload.response.data[1].id,
          payload.response.data[2].id,
        ],
      };
      expect(createUserListReducer()(initialState, action)).toEqual(
        expectedState
      );
    });
  });
});
