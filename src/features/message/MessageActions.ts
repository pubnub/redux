import { MessageActionType } from './MessageActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-008[]
export interface Message {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string;
  timetoken?: number;
}
// end::RDX-008[]

export interface MessageRequestOptions<MessageContentType, MessageMetaType> {
  message: MessageContentType;
  channel: string;
  storeInHistory?: boolean;
  sendByPost?: boolean;
  meta?: MessageMetaType;
  ttl?: number;
}

export interface SendMessageRequest<MessageContentType, MessageMetaType>
  extends MessageRequestOptions<MessageContentType, MessageMetaType> {}

export interface SendMessageResponse {
  timetoken: number;
}

export interface SendMessageError<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  status: PubNubApiStatus;
}

export interface SendMessageSuccess<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  response: SendMessageResponse;
  status: PubNubApiStatus;
}

export interface MessageReceivedAction<MessageType> {
  type: typeof MessageActionType.MESSAGE_RECEIVED;
  payload: MessageType;
}

export interface SendingMessageAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.SENDING_MESSAGE;
  payload: SendMessageRequest<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}
export interface MessageSentAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.MESSAGE_SENT;
  payload: SendMessageSuccess<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}

export interface ErrorSendingMessageAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.ERROR_SENDING_MESSAGE;
  payload: SendMessageError<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}

export type MessageActions<
  MessageType,
  MessageContentType,
  MessageMetaType,
  MetaType
> =
  | MessageReceivedAction<MessageType>
  | MessageSentAction<MessageContentType, MessageMetaType, MetaType>
  | SendingMessageAction<MessageContentType, MessageMetaType, MetaType>
  | ErrorSendingMessageAction<MessageContentType, MessageMetaType, MetaType>;
