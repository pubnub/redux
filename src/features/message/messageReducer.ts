import { Message, MessageActions } from './MessageActions';
import { MessageActionType } from './MessageActionType.enum';

export type MessageState<MessageType extends Message> = {
  byId: {
    [channel: string]: MessageType[]
  },
};

// tag::RDX-028[]
const createInitialState = <MessageType extends Message>(): MessageState<MessageType> => ({
  byId: {},
});
// end::RDX-028[]

const messageReceived = <MessageType extends Message>(
  state: MessageState<MessageType>,
  payload: MessageType
) => {
  let newState = {
    byId: { ...state.byId },
  };

  if (newState.byId[payload.channel] === undefined) {
    newState.byId[payload.channel] = [];
  }

  newState.byId[payload.channel] = [ ...newState.byId[payload.channel], payload ];

  return newState;
};

export const createMessageReducer = <MessageType extends Message, MessageContentType, MessageMetaType, MetaType>() => (
  state: MessageState<MessageType> = createInitialState<MessageType>(),
  action: MessageActions<MessageType, MessageContentType, MessageMetaType, MetaType>
): MessageState<MessageType> => {
  switch (action.type) {
    case MessageActionType.MESSAGE_RECEIVED:
      return messageReceived<MessageType>(state, action.payload);
    default:
      return state;
  }
};
