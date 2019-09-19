import { createNetworkStatusReducer } from '../createNetworkStatusReducer';
import {
  NETWORK_UP,
  NETWORK_DOWN,
  Network_Up,
  Network_Down,
} from '../../types/actions';

describe('createNetworkStatusReducer', () => {
  it('should handle NETWORK_UP action', () => {
    const initialState = true;
    const reducer = createNetworkStatusReducer(initialState);
    const state = { isConnected: initialState };
    const action: Network_Up = { type: NETWORK_UP };
    expect(reducer(state, action)).toEqual({ isConnected: initialState });
  });

  it('should handle NETWORK_DOWN action', () => {
    const initialState = false;
    const reducer = createNetworkStatusReducer(initialState);
    const state = { isConnected: initialState };
    const action: Network_Down = { type: NETWORK_DOWN };
    expect(reducer(state, action)).toEqual({ isConnected: initialState });
  });
});
