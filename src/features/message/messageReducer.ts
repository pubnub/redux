import { MessageActions } from 'actions/Actions';
import { PubNubObjectApiState, PubNubObjectApiSuccess } from 'api/PubNubApi';
import { ActionType } from 'actions/ActionType.enum';
import { clonePubNubObjectApiState } from 'utilities/reducerUtil';

// tag::RDX-028[]
const createInitialState = <T>(): PubNubObjectApiState<T> => ({
  byId: {},
});
// end::RDX-028[]

const messageReceived = <T extends { channel: string }>(
  state: PubNubObjectApiState<T[]>,
  payload: PubNubObjectApiSuccess<T>
) => {
  let newState = clonePubNubObjectApiState<T[]>(state);
  let id = payload.data.channel;

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
    case ActionType.MESSAGE_RECEIVED:
      return messageReceived<T>(state, {
        data: (action.payload as unknown) as T,
      });
    default:
      return state;
  }
};
