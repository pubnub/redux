import { Dispatch } from 'redux';
import { SignalAction } from './SignalActions';
import { SignalActionPayload } from './Signal';
import { SignalActionType } from './SignalActionType.enum';

// tag::RDX-method-listener-signal[]
export const createSignalListener = (dispatch: Dispatch<SignalAction>) => ({
  signal: (payload: SignalActionPayload): SignalAction =>
    dispatch({
      type: SignalActionType.SIGNAL,
      payload,
    }),
});
// end::RDX-method-listener-signal[]
