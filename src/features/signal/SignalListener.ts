import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import { SignalReceivedAction, Signal } from './SignalActions';
import { SignalActionType } from './SignalActionType.enum';

export const signalReceived = <SignalType extends Signal>(
  payload: SignalType
): SignalReceivedAction<SignalType> => ({
  type: SignalActionType.SIGNAL_RECEIVED,
  payload,
});

export const createSignalListener = <SignalType extends Signal>(
  dispatch: Dispatch<SignalReceivedAction<SignalType>>
): Pubnub.ListenerParameters => ({
  signal: (payload) =>
    dispatch(signalReceived<SignalType>((payload as unknown) as SignalType)),
});
