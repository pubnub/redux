import { SignalActionType } from './SignalActionType.enum';
import { SignalActionPayload } from './Signal';

// tag::RDX-147[]
export interface SignalAction {
  type: typeof SignalActionType.SIGNAL;
  payload: SignalActionPayload;
}
// end::RDX-147[]
