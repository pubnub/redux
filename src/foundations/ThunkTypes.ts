type PubNub = any;

/**
 * Describe thunk middleware context
 */
export interface PubnubThunkContext {
  pubnub: {
    api: PubNub;
  };
}
