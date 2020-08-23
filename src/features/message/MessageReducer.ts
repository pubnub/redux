import {
  Message,
  MessageActions,
  FetchMessageHistorySuccess,
} from './MessageActions';
import { MessageActionType } from './MessageActionType.enum';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';

export type MessageState<MessageType extends Message> = {
  byId: {
    [channel: string]: MessageType[];
  };
};

const createInitialState = <
  MessageType extends Message
>(): MessageState<MessageType> => ({
  byId: {},
});

const messageReceived = <MessageType extends Message>(
  state: MessageState<MessageType>,
  payload: MessageType
) => {
  const newState = {
    byId: { ...state.byId },
  };

  if (newState.byId[payload.channel] === undefined) {
    newState.byId[payload.channel] = [];
  }

  newState.byId[payload.channel] = [...newState.byId[payload.channel], payload];

  return newState;
};

const messageHistoryRetrieved = <
  MessageContentType,
  MessageType extends Message
>(
  state: MessageState<MessageType>,
  payload: FetchMessageHistorySuccess<MessageContentType>
) => {
  const newState = {
    byId: { ...state.byId },
  };

  if (newState.byId[payload.request.channel] === undefined) {
    newState.byId[payload.request.channel] = [];
  }

  const results: MessageType[] = payload.response.messages.map(
    (m) =>
      (({
        channel: payload.request.channel,
        message: m.entry as MessageContentType,
        timetoken: m.timetoken,
        userMetadata: m.meta,
      } as unknown) as MessageType)
  );

  newState.byId[payload.request.channel] = [
    ...newState.byId[payload.request.channel],
    ...results,
  ];

  return newState;
};

export const createMessageReducer = <
  MessageType extends Message = Message,
  MessageContentType extends object = {},
  MessageMetaType extends object = {},
  Meta extends ActionMeta = AnyMeta
>() => (
  state: MessageState<MessageType> = createInitialState<MessageType>(),
  action: MessageActions<MessageType, MessageContentType, MessageMetaType, Meta>
): MessageState<MessageType> => {
  switch (action.type) {
    case MessageActionType.MESSAGE_RECEIVED:
      return messageReceived<MessageType>(state, action.payload);
    case MessageActionType.MESSAGE_HISTORY_RETRIEVED:
      return messageHistoryRetrieved<MessageContentType, MessageType>(
        state,
        action.payload
      );
    default:
      return state;
  }
};
