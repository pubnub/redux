import { Dispatch } from 'redux';
import { MessageReceivedAction, Message } from './MessageActions';
import { MessageActionType } from './MessageActionType.enum';

export const messageRecieved = <MessageType extends Message>(
  payload: MessageType
): MessageReceivedAction<MessageType> => ({
  type: MessageActionType.MESSAGE_RECEIVED,
  payload,
});

export const createMessageListener = <MessageType extends Message>(
  dispatch: Dispatch<MessageReceivedAction<MessageType>>
) => ({
  message: (payload: MessageType) =>
    dispatch(messageRecieved<MessageType>(payload)),
});
