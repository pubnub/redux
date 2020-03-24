// tag::RDX-enum-signals-action[]
export enum SignalActionType {
  SEND_SIGNAL_COMMAND = 'pubnub/SEND_SIGNAL_COMMAND',
  SIGNAL_RECEIVED = 'pubnub/SIGNAL_RECEIVED',
  SENDING_SIGNAL = 'pubnub/SENDING_SIGNAL',
  SIGNAL_SENT = 'pubnub/SIGNAL_SENT',
  ERROR_SENDING_SIGNAL = 'pubnub/ERROR_SENDING_SIGNAL',
}
// end::RDX-enum-signals-action[]
