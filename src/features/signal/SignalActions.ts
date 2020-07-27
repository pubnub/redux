import Pubnub from 'pubnub';
import { SignalActionType } from './SignalActionType.enum';

export interface Signal {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string;
  timetoken?: number;
}

export interface SignalRequestOptions<SignalContentType> {
  message: SignalContentType;
  channel: string;
}

export type SendSignalRequest<SignalContentType> = SignalRequestOptions<
  SignalContentType
>;

export interface SendSignalResponse {
  timetoken: number;
}

export interface SendSignalError<SignalContentType> {
  request: SendSignalRequest<SignalContentType>;
  status: Pubnub.PubnubStatus;
}

export interface SendSignalSuccess<SignalContentType> {
  request: SendSignalRequest<SignalContentType>;
  response: SendSignalResponse;
  status: Pubnub.PubnubStatus;
}

export interface SignalReceivedAction<SignalType> {
  type: typeof SignalActionType.SIGNAL_RECEIVED;
  payload: SignalType;
}

export interface SendingSignalAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.SENDING_SIGNAL;
  payload: SendSignalRequest<SignalContentType>;
  meta?: MetaType;
}

export interface SignalSentAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.SIGNAL_SENT;
  payload: SendSignalSuccess<SignalContentType>;
  meta?: MetaType;
}

export interface ErrorSendingSignalAction<SignalContentType, MetaType> {
  type: typeof SignalActionType.ERROR_SENDING_SIGNAL;
  payload: SendSignalError<SignalContentType>;
  meta?: MetaType;
}

export type SignalActions<SignalType, SignalContentType, MetaType> =
  | SignalReceivedAction<SignalType>
  | SendingSignalAction<SignalContentType, MetaType>
  | SignalSentAction<SignalContentType, MetaType>
  | ErrorSendingSignalAction<SignalContentType, MetaType>;
