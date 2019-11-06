import { MessageActionType } from './MessageActionType.enum';
import { PubNubApiStatus } from 'common/PubNubApi';
import { ActionMeta } from 'common/ActionMeta';

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
  ttl? : number;
}

export interface SendMessageRequest<MessageRequestType extends 
MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType> {
  message: MessageRequestType
}

export interface SendMessageResponse {
  timetoken: number;
}

export interface SendMessageError<MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageRequestType, MessageContentType, MessageMetaType>;
  status: PubNubApiStatus;
}

export interface SendMessageSuccess<MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageRequestType, MessageContentType, MessageMetaType>;
  response: SendMessageResponse;
  status: PubNubApiStatus;
}

export interface MessageReceivedAction<MessageType extends Message> {
  type: typeof MessageActionType.MESSAGE_RECEIVED;
  payload: MessageType;
}

export interface SendingMessageAction<MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType> {
  type: typeof MessageActionType.SENDING_MESSAGE;
  payload: SendMessageRequest<MessageRequestType, MessageContentType, MessageMetaType>;
  meta?: ActionMeta<MetaType>;
}
export interface MessageSentAction<MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType> {
  type: typeof MessageActionType.MESSAGE_SENT;
  payload: SendMessageSuccess<MessageRequestType, MessageContentType, MessageMetaType>;
  meta?: ActionMeta<MetaType>;
}

export interface ErrorSendingMessageAction<MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType> {
  type: typeof MessageActionType.ERROR_SENDING_MESSAGE;
  payload: SendMessageError<MessageRequestType, MessageContentType, MessageMetaType>;
  meta?: ActionMeta<MetaType>;
}

export type MessageActions<MessageType extends Message, MessageRequestType extends MessageRequestOptions<MessageContentType, MessageMetaType>, MessageContentType, MessageMetaType, MetaType> =
| MessageReceivedAction<MessageType>
| MessageSentAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType>
| SendingMessageAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType>
| ErrorSendingMessageAction<MessageRequestType, MessageContentType, MessageMetaType, MetaType>;
