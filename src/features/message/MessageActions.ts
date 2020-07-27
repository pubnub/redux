import Pubnub from 'pubnub';
import { MessageActionType } from './MessageActionType.enum';
import { AnyMeta } from 'foundations/ActionMeta';

export interface Message {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string;
  timetoken?: number;
}

export interface MessageRequestOptions<MessageContentType, MessageMetaType> {
  message: MessageContentType;
  channel: string;
  storeInHistory?: boolean;
  sendByPost?: boolean;
  meta?: MessageMetaType;
  ttl?: number;
}

export type SendMessageRequest<
  MessageContentType,
  MessageMetaType
> = MessageRequestOptions<MessageContentType, MessageMetaType>;

export interface SendMessageResponse {
  timetoken: number;
}

export interface SendMessageError<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  status: Pubnub.PubnubStatus;
}

export interface SendMessageSuccess<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  response: SendMessageResponse;
  status: Pubnub.PubnubStatus;
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

export interface MessageHistoryRequestOptions {
  channel: string;
  reverse?: boolean;
  count?: number;
  stringifiedTimeToken?: boolean;
  includeMeta?: boolean;
  start?: string;
  end?: string;
}

export type FetchMessageHistoryRequest = MessageHistoryRequestOptions;

export interface HistoryResponseMessage<MessageContentType> {
  timetoken?: string;
  entry: MessageContentType;
  meta?: AnyMeta;
}

export interface FetchMessageHistoryResponse<MessageContentType> {
  startTimeToken: number;
  messages: HistoryResponseMessage<MessageContentType>[];
  endTimeToken: number;
}

export interface FetchMessageHistoryError {
  request: FetchMessageHistoryRequest;
  status: Pubnub.PubnubStatus;
}

export interface FetchMessageHistorySuccess<MessageContentType> {
  request: FetchMessageHistoryRequest;
  response: FetchMessageHistoryResponse<MessageContentType>;
  status: Pubnub.PubnubStatus;
}

export interface FetchingMessageHistoryAction<MetaType> {
  type: typeof MessageActionType.FETCHING_MESSAGE_HISTORY;
  payload: FetchMessageHistoryRequest;
  meta?: MetaType;
}

export interface MessageHistoryRetrievedAction<MessageContentType, MetaType> {
  type: typeof MessageActionType.MESSAGE_HISTORY_RETRIEVED;
  payload: FetchMessageHistorySuccess<MessageContentType>;
  meta?: MetaType;
}

export interface ErrorFetchingMessageHistoryAction<MetaType> {
  type: typeof MessageActionType.ERROR_FETCHING_MESSAGE_HISTORY;
  payload: FetchMessageHistoryError;
  meta?: MetaType;
}

export type MessageActions<
  MessageType,
  MessageContentType,
  MessageMetaType,
  MetaType
> =
  | MessageReceivedAction<MessageType>
  | SendingMessageAction<MessageContentType, MessageMetaType, MetaType>
  | MessageSentAction<MessageContentType, MessageMetaType, MetaType>
  | ErrorSendingMessageAction<MessageContentType, MessageMetaType, MetaType>
  | FetchingMessageHistoryAction<MetaType>
  | MessageHistoryRetrievedAction<MessageContentType, MetaType>
  | ErrorFetchingMessageHistoryAction<MetaType>;
