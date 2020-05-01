import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import { SignalReceivedAction, Signal } from './SignalActions';
import { SignalActionType } from './SignalActionType.enum';

// tag::RDX-type-signals[]
export const signalReceived = <SignalType extends Signal>(
  payload: SignalType
): SignalReceivedAction<SignalType> => ({
  type: SignalActionType.SIGNAL_RECEIVED,
  payload,
});
// end::RDX-type-signals[]

// tag::RDX-method-listener-signals[]
export const createSignalListener = <SignalType extends Signal>(
  dispatch: Dispatch<SignalReceivedAction<SignalType>>
) => ({
  signal: (payload: Pubnub.SignalEvent) =>
    dispatch(signalReceived<SignalType>((payload as unknown) as SignalType)),
});
// end::RDX-method-listener-signals[]
