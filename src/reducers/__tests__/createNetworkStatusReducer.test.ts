import { createNetworkStatusReducer } from '../createNetworkStatusReducer';
import { NETWORK_UP, NETWORK_DOWN } from '../../types/actions';

const statusActionPayloadMock = {
  affectedChannelGroups: [''],
  affectedChannels: [''],
  category: '',
  operation: '',
  lastTimetoken: 1,
  currentTimetoken: '',
  subscribedChannels: [''],
};

describe('createNetworkStatusReducer', () => {
  it('should handle NETWORK_UP action', () => {
    const initialState = true;
    const reducer = createNetworkStatusReducer(initialState);
    expect(
      reducer(
        { isConnected: initialState },
        {
          type: NETWORK_UP,
          payload: statusActionPayloadMock,
        }
      )
    ).toEqual({ isConnected: initialState });
  });

  it('should handle NETWORK_DOWN action', () => {
    const initialState = false;
    const reducer = createNetworkStatusReducer(initialState);
    expect(
      reducer(
        { isConnected: initialState },
        {
          type: NETWORK_DOWN,
          payload: statusActionPayloadMock,
        }
      )
    ).toEqual({ isConnected: initialState });
  });
});
