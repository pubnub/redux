import { Dispatch as ReduxDispatch } from 'redux';

export type Dispatch = ReduxDispatch;
type PubNub = any;

/**
 * Describe thunk middleware context
 */
export interface PubnubThunkContext {
  pubnub: {
    api: PubNub;
  };
}
