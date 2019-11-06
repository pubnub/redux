import { createNetworkStatusReducer } from './NetworkStatusReducer';
import { NetworkUpEventAction, NetworkDownEventAction } from './NetworkStatusActions';
import { NetworkStatusActionType } from './NetworkStatusActionType.enum';

const networkUp = (): NetworkUpEventAction => ({
  type: NetworkStatusActionType.NETWORK_UP_EVENT,
});

const networkDown = (): NetworkDownEventAction => ({
  type: NetworkStatusActionType.NETWORK_DOWN_EVENT,
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
