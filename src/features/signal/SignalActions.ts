import { Dispatch } from 'redux';
import { SignalActionPayload } from 'api/Signal';
import { SignalAction } from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';

// tag::[RED-152]
export const createSignalActionListener = (
  dispatch: Dispatch<SignalAction>
) => ({
  signal: (payload: SignalActionPayload): SignalAction =>
    dispatch({
      type: ActionType.SIGNAL,
      payload,
    }),
});
// end::[RED-152]
