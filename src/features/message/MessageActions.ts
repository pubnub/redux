import { MessageActionType } from './MessageActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';

// tag::RDX-type-message[]
export interface Message {
  channel: string;
  message: object;
  publisher?: string;
  subscription?: string;
  timetoken?: number;
}
// end::RDX-type-message[]

// tag::RDX-type-message-request-option[]
export interface MessageRequestOptions<MessageContentType, MessageMetaType> {
  message: MessageContentType;
  channel: string;
  storeInHistory?: boolean;
  sendByPost?: boolean;
  meta?: MessageMetaType;
  ttl?: number;
}
// end::RDX-type-message-request-option[]

// tag::RDX-type-message-send[]
export interface SendMessageRequest<MessageContentType, MessageMetaType>
  extends MessageRequestOptions<MessageContentType, MessageMetaType> {}
// end::RDX-type-message-send[]

// tag::RDX-type-message-send-response[]
export interface SendMessageResponse {
  timetoken: number;
}
// end::RDX-type-message-send-response[]

// tag::RDX-type-message-send-error[]
export interface SendMessageError<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  status: PubNubApiStatus;
}
// end::RDX-type-message-send-error[]

// tag::RDX-type-message-send-success[]
export interface SendMessageSuccess<MessageContentType, MessageMetaType> {
  request: SendMessageRequest<MessageContentType, MessageMetaType>;
  response: SendMessageResponse;
  status: PubNubApiStatus;
}
// end::RDX-type-message-send-success[]

// tag::RDX-type-message-received[]
export interface MessageReceivedAction<MessageType> {
  type: typeof MessageActionType.MESSAGE_RECEIVED;
  payload: MessageType;
}
// end::RDX-type-message-received[]

// tag::RDX-action-message-send[]
export interface SendingMessageAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.SENDING_MESSAGE;
  payload: SendMessageRequest<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}
// end::RDX-action-message-send[]

// tag::RDX-action-message-send-success[]
export interface MessageSentAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.MESSAGE_SENT;
  payload: SendMessageSuccess<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}
// end::RDX-action-message-send-success[]

// tag::RDX-action-message-send-error[]
export interface ErrorSendingMessageAction<
  MessageContentType,
  MessageMetaType,
  MetaType
> {
  type: typeof MessageActionType.ERROR_SENDING_MESSAGE;
  payload: SendMessageError<MessageContentType, MessageMetaType>;
  meta?: MetaType;
}
// end::RDX-action-message-send-error[]

// tag::RDX-type-messagehistory-request-option[]
export interface MessageHistoryRequestOptions {
  channel: string;
  reverse?: boolean;
  count?: number;
  stringifiedTimeToken?: boolean;
  includeMeta?: boolean;
  start?: string;
  end?: string;
}
// end::RDX-type-messagehistory-request-option[]

// tag::RDX-type-messagehistory-fetch[]
export interface FetchMessageHistoryRequest
  extends MessageHistoryRequestOptions {}
// end::RDX-type-messagehistory-fetch[]

// tag::RDX-type-messagehistory-fetch-response[]
export interface FetchMessageHistoryResponse<MessageContentType> {
  startTimeToken: number;
  messages: [
    {
      timetoken: string;
      entry: MessageContentType;
    }
  ];
  endTimeToken: number;
}
// end::RDX-type-messagehistory-fetch-response[]

// tag::RDX-type-messagehistory-fetch-error[]
export interface FetchMessageHistoryError {
  request: FetchMessageHistoryRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-messagehistory-fetch-error[]

// tag::RDX-type-messagehistory-fetch-success[]
export interface FetchMessageHistorySuccess<MessageContentType> {
  request: FetchMessageHistoryRequest;
  response: FetchMessageHistoryResponse<MessageContentType>;
  status: PubNubApiStatus;
}
// end::RDX-type-messagehistory-fetch-success[]

// tag::RDX-action-messagehistory-fetch[]
export interface FetchingMessageHistoryAction<MetaType> {
  type: typeof MessageActionType.FETCHING_MESSAGE_HISTORY;
  payload: FetchMessageHistoryRequest;
  meta?: MetaType;
}
// end::RDX-action-messagehistory-fetch[]

// tag::RDX-action-messagehistory-fetch-success[]
export interface MessageHistoryRetrievedAction<MessageContentType, MetaType> {
  type: typeof MessageActionType.MESSAGE_HISTORY_RETRIEVED;
  payload: FetchMessageHistorySuccess<MessageContentType>;
  meta?: MetaType;
}
// end::RDX-action-messagehistory-fetch-success[]

// tag::RDX-action-messagehistory-fetch-error[]
export interface ErrorFetchingMessageHistoryAction<MetaType> {
  type: typeof MessageActionType.ERROR_FETCHING_MESSAGE_HISTORY;
  payload: FetchMessageHistoryError;
  meta?: MetaType;
}
// end::RDX-action-messagehistory-fetch-error[]

// tag::RDX-action-message[]
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
// end::RDX-action-message[]
