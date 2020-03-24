import { SignalActionType } from './SignalActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-type-signal[]
export interface Signal {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string;
  timetoken?: number;
}
// end::RDX-type-signal[]

// tag::RDX-type-signal-request-option[]
export interface SignalRequestOptions<SignalContentType> {
  message: SignalContentType;
  channel: string;
}
// end::RDX-type-signal-request-option[]

// tag::RDX-type-signal-send[]
export interface SendSignalRequest<SignalContentType>
  extends SignalRequestOptions<SignalContentType> {}
// end::RDX-type-signal-send[]

// tag::RDX-type-signal-send-response[]
export interface SendSignalResponse {
  timetoken: number;
}
// end::RDX-type-signal-send-response[]

// tag::RDX-type-signal-send-error[]
export interface SendSignalError<SignalContentType> {
  request: SendSignalRequest<SignalContentType>;
  status: PubNubApiStatus;
}
// end::RDX-type-signal-send-error[]

// tag::RDX-type-signal-send-success[]
export interface SendSignalSuccess<SignalContentType> {
  request: SendSignalRequest<SignalContentType>;
  response: SendSignalResponse;
  status: PubNubApiStatus;
}
// end::RDX-type-signal-send-success[]

// tag::RDX-type-signal-received[]
export interface SignalReceivedAction<SignalType> {
  type: typeof SignalActionType.SIGNAL_RECEIVED;
  payload: SignalType;
}
// end::RDX-type-signal-received[]

// tag::RDX-action-signal-send[]
export interface SendingSignalAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.SENDING_SIGNAL;
  payload: SendSignalRequest<SignalContentType>;
  meta?: MetaType;
}
// end::RDX-action-signal-send[]

// tag::RDX-action-signal-send-success[]
export interface SignalSentAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.SIGNAL_SENT;
  payload: SendSignalSuccess<SignalContentType>;
  meta?: MetaType;
}
// end::RDX-action-signal-send-success[]

// tag::RDX-action-signal-send-error[]
export interface ErrorSendingSignalAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.ERROR_SENDING_SIGNAL;
  payload: SendSignalError<SignalContentType>;
  meta?: MetaType;
}
// end::RDX-action-signal-send-error[]

// tag::RDX-action-signal[]
export type SignalActions<SignalType, SignalContentType, MetaType> =
  | SignalReceivedAction<SignalType>
  | SendingSignalAction<SignalContentType, MetaType>
  | SignalSentAction<SignalContentType, MetaType>
  | ErrorSendingSignalAction<SignalContentType, MetaType>;
// end::RDX-action-signal[]
