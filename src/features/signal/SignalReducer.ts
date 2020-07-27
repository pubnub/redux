import { Signal, SignalActions } from './SignalActions';
import { SignalActionType } from './SignalActionType.enum';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';

export type SignalState<SignalType extends Signal> = {
  byId: {
    [channel: string]: SignalType[];
  };
};

const createInitialState = <
  SignalType extends Signal
>(): SignalState<SignalType> => ({
  byId: {},
});

const signalReceived = <SignalType extends Signal>(
  state: SignalState<SignalType>,
  payload: SignalType
) => {
  const newState = {
    byId: { ...state.byId },
  };

  if (newState.byId[payload.channel] === undefined) {
    newState.byId[payload.channel] = [];
  }

  newState.byId[payload.channel] = [...newState.byId[payload.channel], payload];

  return newState;
};

export const createSignalReducer = <
  SignalType extends Signal = Signal,
  SignalContentType extends object = {},
  Meta extends ActionMeta = AnyMeta
>() => (
  state: SignalState<SignalType> = createInitialState<SignalType>(),
  action: SignalActions<SignalType, SignalContentType, Meta>
): SignalState<SignalType> => {
  switch (action.type) {
    case SignalActionType.SIGNAL_RECEIVED:
      return signalReceived<SignalType>(state, action.payload);
    default:
      return state;
  }
};
