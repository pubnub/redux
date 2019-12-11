import { PubNub } from './PubNubApi';

/**
 * Describe thunk middleware context
 */
// tag::RDX-type-pubnub-thunk[]
export interface PubnubThunkContext {
  pubnub: {
    api: PubNub;
  };
}
// end::RDX-type-pubnub-thunk[]
