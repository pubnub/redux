import { Message } from 'redux/types/Message';
import { AppActions } from 'redux/types/actions';

export const createMessageActions = (payload: Message): AppActions => ({
    type: 'MESSAGE',
    payload
})