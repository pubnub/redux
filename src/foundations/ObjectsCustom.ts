// tag::RDX-type-pubnub-custom[]
export type ObjectsCustom = object;
// end::RDX-type-pubnub-custom[]

// tag::RDX-type-pubnub-customany[]
export interface AnyCustom extends ObjectsCustom {
  [key: string]: string | number | boolean;
}
// end::RDX-type-pubnub-customany[]
