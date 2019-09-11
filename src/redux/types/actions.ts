import { Message } from './Message';
import { Presence } from './Presence';
import { Status } from './Status';
import { Objects } from './Objects';
import { Signal } from './Signal';

export const MESSAGE = 'pubnub/MESSAGE';

export const JOIN = 'pubnub/JOIN';
export const LEAVE = 'pubnub/LEAVE';
export const TIMEOUT = 'pubnub/TIMEOUT';
export const STATE_CHANGE = 'pubnub/STATE_CHANGE';

export const NETWORK_UP = 'pubnub/NETWORK_UP';
export const NETWORK_DOWN = 'pubnub/NETWORK_DOWN';
export const NETWORK_ISSUES = 'pubnub/NETWORK_ISSUES';
export const RECONNECTED = 'pubnub/RECONNECTED';
export const CONNECTED = 'pubnub/CONNECTED';
export const ACCESS_DENIED = 'pubnub/ACCESS_DENIED';
export const MALFORMED_RESPONSE = 'pubnub/MALFORMED_RESPONSE';
export const BAD_REQUEST = 'pubnub/BAD_REQUEST';
export const DECRYPTION_ERROR = 'pubnub/DECRYPTION_ERROR';
export const TIMEOUT_CONNECTION = 'pubnub/TIMEOUT_CONNECTION';
export const REQUEST_MESSAGE_COUNT_EXCEED =
  'pubnub/REQUEST_MESSAGE_COUNT_EXCEED';
export const UNKNOWN = 'pubnub/UNKNOWN';

export const USER_UPDATED = 'pubnub/USER_UPDATED';
export const USER_DELETED = 'pubnub/USER_DELETED';
export const SPACE_UPDATED = 'pubnub/SPACE_UPDATED';
export const SPACE_DELETED = 'pubnub/SPACE_DELETED';
export const USER_ADDED_TO_SPACE = 'pubnub/USER_ADDED_TO_SPACE';
export const USER_REMOVED_FROM_SPACE = 'pubnub/USER_REMOVED_FROM_SPACE';
export const USER_MEMBERSHIP_UPDATED_ON_SPACE =
  'pubnub/USER_MEMBERSHIP_UPDATED_ON_SPACE';

export const SIGNAL = 'pubnub/SIGNAL';

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

export interface User_Updated {
  type: typeof USER_UPDATED;
  payload: Objects;
}

export interface User_Deleted {
  type: typeof USER_DELETED;
  payload: Objects;
}

export interface Space_Updated {
  type: typeof SPACE_UPDATED;
  payload: Objects;
}

export interface Space_Deleted {
  type: typeof SPACE_DELETED;
  payload: Objects;
}

export interface User_Added_To_Space {
  type: typeof USER_ADDED_TO_SPACE;
  payload: Objects;
}

export interface User_Removed_From_Space {
  type: typeof USER_REMOVED_FROM_SPACE;
  payload: Objects;
}

export interface User_Membership_Updated_On_Space {
  type: typeof USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: Objects;
}

export interface SignalAction {
  type: typeof SIGNAL;
  payload: Signal;
}

export type PresenceActionTypes = Join | Leave | Timeout | State_Change;
export type StatusActionTypes =
  | Network_Up
  | Network_Down
  | Network_Issues
  | Reconnected
  | Connected
  | Access_Denied
  | Malformed_Response
  | Bad_Request
  | Request_Message_Count_Exceed
  | Decryption_Error
  | Timeout_Connection
  | Unknown;

export type ObjectsActionTypes =
  | User_Updated
  | User_Deleted
  | Space_Updated
  | Space_Deleted
  | User_Added_To_Space
  | User_Removed_From_Space
  | User_Membership_Updated_On_Space;

export type AppActions =
  | MessageAction
  | PresenceActionTypes
  | StatusActionTypes
  | ObjectsActionTypes
  | SignalAction;
