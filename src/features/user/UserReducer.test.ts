import { UserActionType } from './UserActionType.enum';
import {
  User,
  UserUpdatedAction,
  UserDeletedAction,
  UsersRetrievedAction,
  UserRetrievedAction,
} from './UserActions';
import { createUserReducer } from '../..';
import { UserCreatedAction } from './UserActions';
import { MembersRetrievedAction } from '../members/MembersActions';
import { MembersActionType } from '../members/MembersActionType.enum';
const deepFreeze = require('deep-freeze');

describe('Handling user reducer without mutating the state', () => {
  interface userReducerInitialState {
    byId: { [key: string]: User };
  }
  interface MetaType {}
  let initialState: userReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        user1: { id: 'user1', name: 'user1' },
      },
    };

    deepFreeze(initialState);
  });

  it('should create user without mutating the state', () => {
    const payload = {
      request: {
        id: 'user2',
        name: 'user2',
      },
      response: {
        status: '',
        data: {
          id: 'user2',
          name: 'user2',
        },
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserCreatedAction<User, MetaType> = {
      type: UserActionType.USER_CREATED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.id]: {
          ...payload.request,
        },
      },
    };
    expect(createUserReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update the user without mutations', () => {
    const payload = {
      request: {
        id: '',
        name: '',
      },
      response: {
        status: '',
        data: {
          id: 'user2',
          name: 'user2',
        },
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserUpdatedAction<User, MetaType> = {
      type: UserActionType.USER_UPDATED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.response.data.id]: {
          ...payload.response.data,
        },
      },
    };
    expect(createUserReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should delete the user without mutations', () => {
    const payload = {
      request: {
        userId: 'user1',
      },
      response: {
        status: 0,
        request: {
          userId: 'user1',
        },
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserDeletedAction<MetaType> = {
      type: UserActionType.USER_DELETED,
      payload,
    };
    const userToDelete = payload.response.request.userId;
    const { [userToDelete]: value, ...rest } = initialState.byId;
    const expectedState = {
      ...initialState,
      byId: rest,
    };
    expect(createUserReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should fetch users without mutations', () => {
    const payload = {
      request: {},
      response: {
        status: '',
        data: [
          {
            id: 'user1',
            name: 'updatedUser1',
            created: '',
            updated: '',
            eTag: '',
          },
          {
            id: 'user2',
            name: 'updatedUser2',
            created: '',
            updated: '',
            eTag: '',
          },
          {
            id: 'user3',
            name: 'user3',
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
    const expectedState = {
      ...initialState,
      byId: {
        [payload.response.data[0].id]: { ...payload.response.data[0] },
        [payload.response.data[1].id]: { ...payload.response.data[1] },
        [payload.response.data[2].id]: { ...payload.response.data[2] },
      },
    };
    const action: UsersRetrievedAction<User, MetaType> = {
      type: UserActionType.USERS_RETRIEVED,
      payload,
    };
    expect(createUserReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should fetch the user by id without mutations', () => {
    const payload = {
      request: {
        userId: 'user2',
      },
      response: {
        status: '',
        data: {
          id: 'user2',
          name: 'user2',
          created: '',
          updated: '',
          eTag: '',
        },
      },
      status: {
        error: false,
        errorData: '',
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserRetrievedAction<User, MetaType> = {
      type: UserActionType.USER_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.userId]: payload.response.data,
      },
    };
    expect(createUserReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should fetch members without mutating the state', () => {
    const payload = {
      request: {
        spaceId: '',
      },
      response: {
        status: '',
        data: [
          {
            id: 'user1',
            name: 'user1',
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
    const action: MembersRetrievedAction<User, MetaType> = {
      type: MembersActionType.MEMBERS_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
    };
    expect(createUserReducer()(initialState, action)).toEqual(expectedState);
  });
});
