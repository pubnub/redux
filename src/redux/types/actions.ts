import { Message } from './Message';
import { Presence } from './Presence';
import { Status } from './Status';

export const MESSAGE = 'MESSAGE';

export const JOIN = 'JOIN';
export const LEAVE = 'LEAVE';
export const TIMEOUT = 'TIMEOUT';
export const STATE_CHANGE = 'STATE_CHANGE';

export const NETWORK_UP = 'NETWORK_UP';
export const NETWORK_DOWN = 'NETWORK_DOWN';
export const NETWORK_ISSUES = 'NETWORK_ISSUES';
export const RECONNECTED = 'RECONNECTED';
export const CONNECTED = 'CONNECTED';
export const ACCESS_DENIED = 'ACCESS_DENIED';
export const MALFORMED_RESPONSE = 'MALFORMED_RESPONSE';
export const BAD_REQUEST = 'BAD_REQUEST';
export const DECRYPTION_ERROR = 'DECRYPTION_ERROR';
export const TIMEOUT_CONNECTION = 'TIMEOUT_CONNECTION';
export const REQUEST_MESSAGE_COUNT_EXCEED = 'REQUEST_MESSAGE_COUNT_EXCEED';
export const UNKNOWN = 'UNKNOWN';

export interface MessageAction {
    type: typeof MESSAGE;
    payload: Message;
}

export interface Join {
    type: typeof JOIN;
    payload: Presence;
}

export interface Leave {
    type: typeof LEAVE;
    payload: Presence;
}

export interface Timeout {
    type: typeof TIMEOUT;
    payload: Presence;
}

export interface State_Change {
    type: typeof STATE_CHANGE;
    payload: Presence;
}

export interface Network_Up {
    type: typeof NETWORK_UP;
    payload: Status;
}

export interface Network_Down {
    type: typeof NETWORK_DOWN;
    payload: Status;
}

export interface Network_Issues {
    type: typeof NETWORK_ISSUES;
    payload: Status;
}

export interface Reconnected {
    type: typeof RECONNECTED;
    payload: Status;
}

export interface Connected {
    type: typeof CONNECTED;
    payload: Status;
}

export interface Access_Denied {
    type: typeof ACCESS_DENIED;
    payload: Status;
}

export interface Malformed_Response {
    type: typeof MALFORMED_RESPONSE;
    payload: Status;
}

export interface Bad_Request {
    type: typeof BAD_REQUEST;
    payload: Status;
}

export interface Decryption_Error {
    type: typeof DECRYPTION_ERROR;
    payload: Status;
}

export interface Request_Message_Count_Exceed {
    type: typeof REQUEST_MESSAGE_COUNT_EXCEED;
    payload: Status;
}

export interface Timeout_Connection {
    type: typeof TIMEOUT_CONNECTION;
    payload: Status;
}

export interface Unknown {
    type: typeof UNKNOWN;
    payload: Status;
}


export type PresenceActionTypes = Join | Leave | Timeout | State_Change;
export type StatusActionTypes = Network_Up | Network_Down | Network_Issues | Reconnected | Connected | Access_Denied | 
                                Malformed_Response | Bad_Request | Request_Message_Count_Exceed | Decryption_Error | Timeout_Connection | Unknown;

export type AppActions = MessageAction | PresenceActionTypes | StatusActionTypes;