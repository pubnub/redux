import { createSpaceReducer } from './SpaceReducer';
import { SpaceActionType } from './SpaceActionType.enum';
import {
  SpaceCreatedAction,
  SpaceUpdatedAction,
  SpaceDeletedAction,
  SpacesRetrievedAction,
  SpaceRetrievedAction,
} from './SpaceActions';
import { Space } from './SpaceActions';
import { MembershipRetrievedAction } from '../membership/MembershipActions';
import { MembershipActionType } from '../membership/MembershipActionType.enum';
const deepFreeze = require('deep-freeze');

describe('Handling space reducer without mutating the state', () => {
  interface spaceReducerInitialState {
    byId: {
      [spaceId: string]: Space;
    };
  }
  let initialState: spaceReducerInitialState;
  interface MetaType {}
  beforeEach(() => {
    initialState = {
      byId: {
        space1: {
          id: 'space1',
          name: 'space1',
          created: '',
          updated: '',
          eTag: '',
        },
        space2: {
          id: 'space2',
          name: 'space2',
          created: '',
          updated: '',
          eTag: '',
        },
        space3: {
          id: 'space3',
          name: 'space3',
          created: '',
          updated: '',
          eTag: '',
        },
      },
    };
    deepFreeze(initialState);
  });

  it('should create the space without mutations', () => {
    const payload = {
      request: {
        id: 'space4',
        name: 'space4',
      },
      response: {
        status: '',
        data: {
          id: 'space4',
          name: 'space4',
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
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.id]: {
          ...payload.response.data,
        },
      },
    };
    const action: SpaceCreatedAction<Space, MetaType> = {
      type: SpaceActionType.SPACE_CREATED,
      payload,
    };
    expect(createSpaceReducer()(initialState, action)).toEqual({
      ...expectedState,
    });
  });

  it('should update the space without mutations', () => {
    const payload = {
      request: {
        id: '',
        name: '',
      },
      response: {
        status: '',
        data: {
          id: 'space2',
          name: 'updatedSpace2',
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
    const action: SpaceUpdatedAction<Space, MetaType> = {
      type: SpaceActionType.SPACE_UPDATED,
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
    expect(createSpaceReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should delete the space without mutations', () => {
    const payload = {
      request: {
        spaceId: 'space1',
      },
      response: {
        status: 0,
        request: {
          spaceId: 'space1',
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
    const action: SpaceDeletedAction<MetaType> = {
      type: SpaceActionType.SPACE_DELETED,
      payload,
    };
    const spaceToDelete = payload.response.request.spaceId;
    const { [spaceToDelete]: value, ...rest } = initialState.byId;
    const expectedState = {
      ...initialState,
      byId: rest,
    };
    expect(createSpaceReducer()(initialState, action)).toEqual(expectedState);
  });

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
    const expectedState = {
      ...initialState,
      byId: {
        [payload.response.data[0].id]: { ...payload.response.data[0] },
        [payload.response.data[1].id]: { ...payload.response.data[1] },
        [payload.response.data[2].id]: { ...payload.response.data[2] },
      },
    };
    const action: SpacesRetrievedAction<Space, MetaType> = {
      type: SpaceActionType.SPACES_RETRIEVED,
      payload,
    };
    expect(createSpaceReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should fetch the space by id without mutations', () => {
    const payload = {
      request: {
        spaceId: 'space2',
      },
      response: {
        status: '',
        data: {
          id: 'space2',
          name: 'space2',
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
    const action: SpaceRetrievedAction<Space, MetaType> = {
      type: SpaceActionType.SPACE_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
      byId: {
        ...initialState.byId,
        [payload.request.spaceId]: payload.response.data,
      },
    };
    expect(createSpaceReducer()(initialState, action)).toEqual(expectedState);
  });

  it('should fetch memberships without mutating the state', () => {
    const payload = {
      request: {
        userId: '',
      },
      response: {
        status: '',
        data: [
          {
            id: 'space1',
            name: 'space1',
            space: {
              id: 'space1',
              name: 'space1',
              created: '',
              updated: '',
              eTag: '',
            },
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
    const action: MembershipRetrievedAction<Space, MetaType> = {
      type: MembershipActionType.MEMBERSHIP_RETRIEVED,
      payload,
    };
    const expectedState = {
      ...initialState,
    };
    expect(createSpaceReducer()(initialState, action)).toEqual(expectedState);
  });
});
