import { SignalActionType } from './SignalActionType.enum';
import { SignalActionPayload } from './Signal';

// tag::RDX-type-signal-action[]
export interface SignalAction {
  type: typeof SignalActionType.SIGNAL;
  payload: SignalActionPayload;
}
// end::RDX-type-signal-action[]
