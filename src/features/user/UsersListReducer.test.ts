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

    it('should fetch multiple pages of users without mutations', () => {
      const firstPayload = {
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
      const secondPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
        response: {
          status: 200,
          data: [
            {
              id: 'User4',
              name: 'updatedUser4',
              updated: '',
              eTag: '',
            },
            {
              id: 'User5',
              name: 'updatedUser5',
              updated: '',
              eTag: '',
            },
            {
              id: 'User6',
              name: 'User6',
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
      const firstAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        uuids: [
          firstPayload.response.data[0].id,
          firstPayload.response.data[1].id,
          firstPayload.response.data[2].id,
          secondPayload.response.data[0].id,
          secondPayload.response.data[1].id,
          secondPayload.response.data[2].id,
        ],
      };
      const reducer = createUsersListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });

    it('should remove duplicates between pages without mutations', () => {
      const firstPayload = {
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
      const secondPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
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
      const firstAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        uuids: [
          firstPayload.response.data[0].id,
          firstPayload.response.data[1].id,
          firstPayload.response.data[2].id,
        ],
      };
      const reducer = createUsersListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });

    it('should reset when missing pagination without mutations', () => {
      const firstPayload = {
        request: {
          page: {
            next: 'page1',
          },
        },
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
      const secondPayload = {
        request: {},
        response: {
          status: 200,
          data: [
            {
              id: 'User4',
              name: 'updatedUser4',
              updated: '',
              eTag: '',
            },
            {
              id: 'User5',
              name: 'updatedUser5',
              updated: '',
              eTag: '',
            },
            {
              id: 'User6',
              name: 'User6',
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
      const firstAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: firstPayload,
      };
      const secondAction: AllUserDataRetrievedAction<{}, never> = {
        type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
        payload: secondPayload,
      };
      const expectedState = {
        ...initialState,
        uuids: [
          secondPayload.response.data[0].id,
          secondPayload.response.data[1].id,
          secondPayload.response.data[2].id,
        ],
      };
      const reducer = createUsersListReducer();
      const state = reducer(reducer(initialState, firstAction), secondAction);
      expect(state).toEqual(expectedState);
    });
  });
});
