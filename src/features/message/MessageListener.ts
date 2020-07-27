import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import { MessageReceivedAction, Message } from './MessageActions';
import { MessageActionType } from './MessageActionType.enum';

export const messageReceived = <MessageType extends Message>(
  payload: MessageType
): MessageReceivedAction<MessageType> => ({
  type: MessageActionType.MESSAGE_RECEIVED,
  payload,
});

export const createMessageListener = <MessageType extends Message>(
  dispatch: Dispatch<MessageReceivedAction<MessageType>>
): Pubnub.ListenerParameters => ({
  message: (payload) =>
    dispatch(messageReceived<MessageType>((payload as unknown) as MessageType)),
});
