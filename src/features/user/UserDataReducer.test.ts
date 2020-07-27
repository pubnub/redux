import { UserDataActionType } from './UserDataActionType.enum';
import {
  UserDataSetAction,
  UserDataRemovedAction,
  UserDataRetrievedAction,
  AllUserDataRetrievedAction,
  UserData,
} from './UserDataActions';
import { createUserDataReducer } from '../..';
import { ChannelMembersRetrievedAction } from '../members/ChannelMembersActions';
import { ChannelMembersActionType } from '../members/ChannelMembersActionType.enum';
import deepFreeze from 'deep-freeze';

describe('Handling user reducer without mutating the state', () => {
  interface UserReducerInitialState {
    byId: { [key: string]: UserData<{}> };
  }
  interface MetaType {}
  let initialState: UserReducerInitialState;
  beforeEach(() => {
    initialState = {
      byId: {
        user1: { id: 'user1', name: 'user1', eTag: '', updated: '' },
      },
    };

    deepFreeze(initialState);
  });

  it('should update the user without mutations', () => {
    const payload = {
      request: {
        uuid: '',
        name: '',
      },
      response: {
        status: 200,
        data: {
          id: 'user2',
          name: 'user2',
          eTag: '',
          updated: '',
        },
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserDataSetAction<{}, MetaType> = {
      type: UserDataActionType.USER_DATA_SET,
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
    expect(createUserDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should delete the user without mutations', () => {
    const payload = {
      request: {
        uuid: 'user1',
      },
      response: {
        status: 0,
        request: {
          uuid: 'user1',
        },
      },
      status: {
        error: false,
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserDataRemovedAction<MetaType> = {
      type: UserDataActionType.USER_DATA_REMOVED,
      payload,
    };
    const userToDelete = payload.response.request.uuid;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [userToDelete]: value, ...rest } = initialState.byId;
    const expectedState = {
      ...initialState,
      byId: rest,
    };
    expect(createUserDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch users without mutations', () => {
    const payload = {
      request: {},
      response: {
        status: 200,
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
        errorData: undefined,
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
    const action: AllUserDataRetrievedAction<{}, MetaType> = {
      type: UserDataActionType.ALL_USER_DATA_RETRIEVED,
      payload,
    };
    expect(createUserDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch the user by id without mutations', () => {
    const payload = {
      request: {
        uuid: 'user2',
      },
      response: {
        status: 200,
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
        errorData: undefined,
        category: '',
        operation: '',
        statusCode: 0,
      },
    };
    const action: UserDataRetrievedAction<{}, MetaType> = {
      type: UserDataActionType.USER_DATA_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.uuid]: payload.response.data,
      },
    };
    expect(createUserDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch members without mutating the state', () => {
    const payload = {
      request: {
        channel: '',
      },
      response: {
        status: 200,
        data: [
          {
            uuid: { id: 'user1' },
            name: 'user1',
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
    const action: ChannelMembersRetrievedAction<{}, {}, MetaType> = {
      type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
    };
    expect(createUserDataReducer()(initialState, action)).toEqual(
      expectedState
    );
  });
});
