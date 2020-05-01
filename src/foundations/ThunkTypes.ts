import Pubnub from 'pubnub';

/**
 * Describe thunk middleware context
 */
// tag::RDX-type-pubnub-thunk[]
export interface PubnubThunkContext {
  pubnub: {
    api: Pubnub;
  };
}
// end::RDX-type-pubnub-thunk[]
