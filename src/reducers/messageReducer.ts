import { MessageActions } from '../actions/Actions';
import { PubNubObjectApiState, PubNubObjectApiSuccess } from '../api/PubNubApi';
import { actionType } from '../actions/ActionType.enum';
import { clonePubNubObjectApiState } from './reducerUtil';

const createInitialState = <T>(): PubNubObjectApiState<T> => ({
  byId: {},
  loadingById: {},
  errorById: {},
});

export const messageRecieved = <T extends { channel: string }>(
  state: PubNubObjectApiState<T[]>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = clonePubNubObjectApiState<T[]>(state);
  let id = payload.data.channel;

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  if (newState.byId[id] === undefined) {
    newState.byId[id] = [];
  }

  newState.byId[id].push(payload.data);

  return newState;
};

export const createMessageReducer = <T extends { channel: string }>() => (
  state: PubNubObjectApiState<T[]> = createInitialState<T[]>(),
  action: MessageActions<T>
): PubNubObjectApiState<T[]> => {
  switch (action.type) {
    case actionType.MESSAGE:
      return messageRecieved<T>(state, {
        data: (action.payload as unknown) as T,
      });
    default:
      return state;
  }
};
