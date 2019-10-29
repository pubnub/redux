import { createNetworkStatusReducer } from 'features/networkStatus/createNetworkStatusReducer';
import { NetworkUpAction, NetworkDownAction } from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';

export const networkUp = (): NetworkUpAction => ({
  type: ActionType.NETWORK_UP,
});

export const networkDown = (): NetworkDownAction => ({
  type: ActionType.NETWORK_DOWN,
});

describe('createNetworkStatusReducer', () => {
  it('should return the reducer when initilizer is a boolean value', () => {
    const initializer = false;
    const reducer = createNetworkStatusReducer(initializer);
    expect(reducer).toBeDefined();
  });

  it('should return the reducer when initializer function returns a boolean value', () => {
    const initializer = () => true;
    const reducer = createNetworkStatusReducer(initializer);
    expect(reducer).toBeDefined();
  });

  it('should handle NETWORK_UP action', () => {
    const initializer = true;
    const reducer = createNetworkStatusReducer(initializer);
    const initialState = { isConnected: initializer };
    expect(reducer(initialState, networkUp())).toEqual({
      isConnected: initializer,
    });
  });

  it('should handle NETWORK_DOWN action', () => {
    const initializer = false;
    const reducer = createNetworkStatusReducer(initializer);
    const initialState = { isConnected: initializer };
    expect(reducer(initialState, networkDown())).toEqual({
      isConnected: initializer,
    });
  });
});
