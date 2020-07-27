import Pubnub from 'pubnub';

/**
 * Describe thunk middleware context
 */
export interface PubnubThunkContext {
  pubnub: {
    api: Pubnub;
  };
}
