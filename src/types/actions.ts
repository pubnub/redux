import { MessageActionPayload } from './Message';
import { PresenceActionPayload } from './Presence';
import { StatusActionPayload } from './Status';
import { ObjectsActionPayload, ObjectResponsePayload } from './Objects';
import { SignalActionPayload } from './Signal';

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
export const USER_LIST_RETRIEVED = 'pubnub/USER_LIST_RETRIEVED';
export const GET_USERS_ERROR = 'pubnub/GET_USERS_ERROR';
export const SPACE_UPDATED = 'pubnub/SPACE_UPDATED';
export const SPACE_DELETED = 'pubnub/SPACE_DELETED';
export const USER_ADDED_TO_SPACE = 'pubnub/USER_ADDED_TO_SPACE';
export const USER_REMOVED_FROM_SPACE = 'pubnub/USER_REMOVED_FROM_SPACE';
export const USER_MEMBERSHIP_UPDATED_ON_SPACE =
  'pubnub/USER_MEMBERSHIP_UPDATED_ON_SPACE';

export const SIGNAL = 'pubnub/SIGNAL';

export interface MessageAction {
  type: typeof MESSAGE;
  payload: MessageActionPayload;
}

export interface Join {
  type: typeof JOIN;
  payload: PresenceActionPayload;
}

export interface Leave {
  type: typeof LEAVE;
  payload: PresenceActionPayload;
}

export interface Timeout {
  type: typeof TIMEOUT;
  payload: PresenceActionPayload;
}

export interface State_Change {
  type: typeof STATE_CHANGE;
  payload: PresenceActionPayload;
}

export interface Network_Up {
  type: typeof NETWORK_UP;
}

export interface Network_Down {
  type: typeof NETWORK_DOWN;
}

export interface Network_Issues {
  type: typeof NETWORK_ISSUES;
  payload: StatusActionPayload;
}

export interface Reconnected {
  type: typeof RECONNECTED;
  payload: StatusActionPayload;
}

export interface Connected {
  type: typeof CONNECTED;
  payload: StatusActionPayload;
}

export interface Access_Denied {
  type: typeof ACCESS_DENIED;
  payload: StatusActionPayload;
}

export interface Malformed_Response {
  type: typeof MALFORMED_RESPONSE;
  payload: StatusActionPayload;
}

export interface Bad_Request {
  type: typeof BAD_REQUEST;
  payload: StatusActionPayload;
}

export interface Decryption_Error {
  type: typeof DECRYPTION_ERROR;
  payload: StatusActionPayload;
}

export interface Request_Message_Count_Exceed {
  type: typeof REQUEST_MESSAGE_COUNT_EXCEED;
  payload: StatusActionPayload;
}

export interface Timeout_Connection {
  type: typeof TIMEOUT_CONNECTION;
  payload: StatusActionPayload;
}

export interface Unknown {
  type: typeof UNKNOWN;
  payload: StatusActionPayload;
}

export interface User_Updated {
  type: typeof USER_UPDATED;
  payload: ObjectsActionPayload;
}

export interface User_Deleted {
  type: typeof USER_DELETED;
  payload: ObjectsActionPayload;
}

export interface User_List_Retrieved {
  type: typeof USER_LIST_RETRIEVED;
  payload: ObjectResponsePayload;
}

export interface Get_Users_Error {
  type: typeof GET_USERS_ERROR;
}

export interface Space_Updated {
  type: typeof SPACE_UPDATED;
  payload: ObjectsActionPayload;
}

export interface Space_Deleted {
  type: typeof SPACE_DELETED;
  payload: ObjectsActionPayload;
}

export interface User_Added_To_Space {
  type: typeof USER_ADDED_TO_SPACE;
  payload: ObjectsActionPayload;
}

export interface User_Removed_From_Space {
  type: typeof USER_REMOVED_FROM_SPACE;
  payload: ObjectsActionPayload;
}

export interface User_Membership_Updated_On_Space {
  type: typeof USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: ObjectsActionPayload;
}

export interface SignalAction {
  type: typeof SIGNAL;
  payload: SignalActionPayload;
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
  | User_List_Retrieved
  | Get_Users_Error
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
