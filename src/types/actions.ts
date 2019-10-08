import { MessageActionPayload } from './Message';
import { PresenceActionPayload } from './Presence';
import { StatusActionPayload } from './Status';
import {
  ObjectsActionPayload,
  ObjectsResponsePayload,
  ObjectsStatusPayload,
} from './Objects';
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

export const OBJECTS_UPDATE_USER = 'pubnub/OBJECTS_UPDATE_USER';
export const OBJECTS_DELETE_USER = 'pubnub/OBJECTS_DELETE_USER';
export const OBJECTS_CREATE_USER = 'pubnub/OBJECTS_CREATE_USER';
export const OBJECTS_CREATE_USER_ERROR = 'pubnub/OBJECTS_CREATE_USER_ERROR';
export const OBJECTS_GET_USERS = 'pubnub/OBJECTS_GET_USERS';
export const OBJECTS_GET_USERS_ERROR = 'pubnub/OBJECTS_GET_USERS_ERROR';
export const OBJECTS_GET_USER_BY_ID = 'pubnub/OBJECTS_GET_USER_BY_ID';
export const OBJECTS_GET_USER_BY_ID_ERROR =
  'pubnub/OBJECTS_GET_USER_BY_ID_ERROR';
export const OBJECTS_UPDATE_SPACE = 'pubnub/OBJECTS_UPDATE_SPACE';
export const OBJECTS_DELETE_SPACE = 'pubnub/OBJECTS_DELETE_SPACE';
export const OBJECTS_GET_SPACES = 'pubnub/OBJECTS_GET_SPACES';
export const OBJECTS_GET_SPACES_ERROR = 'pubnub/OBJECTS_GET_SPACES_ERROR';
export const OBJECTS_CREATE_SPACE = 'pubnub/OBJECTS_CREATE_SPACE';
export const OBJECTS_CREATE_SPACE_ERROR = 'pubnub/OBJECTS_CREATE_SPACE_ERROR';
export const OBJECTS_GET_SPACE_BY_ID = 'pubnub/OBJECTS_GET_SPACE_BY_ID';
export const OBJECTS_GET_SPACE_BY_ID_ERROR =
  'pubnub/OBJECTS_GET_SPACE_BY_ID_ERROR';
export const OBJECTS_USER_ADDED_TO_SPACE = 'pubnub/OBJECTS_USER_ADDED_TO_SPACE';
export const OBJECTS_USER_REMOVED_FROM_SPACE =
  'pubnub/OBJECTS_USER_REMOVED_FROM_SPACE';
export const OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE =
  'pubnub/OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE';
export const OBJECTS_GET_MEMBERS = 'pubnub/OBJECTS_GET_MEMBERS';
export const OBJECTS_GET_MEMBERS_ERROR = 'pubnub/OBJECTS_GET_MEMBERS_ERROR';
export const OBJECTS_GET_MEMBERSHIPS = 'pubnub/OBJECTS_GET_MEMBERSHIPS';
export const OBJECTS_GET_MEMBERSHIPS_ERROR =
  'pubnub/OBJECTS_GET_MEMBERSHIPS_ERROR';
export const OBJECTS_ADD_MEMBERS = 'pubunb/OBJECTS_ADD_MEMBERS';
export const OBJECTS_ADD_MEMBERS_ERROR = 'pubnub/OBJECTS_ADD_MEMBERS_ERROR';
export const OBJECTS_REMOVE_MEMBERS = 'pubnub/OBJECTS_REMOVE_MEMBERS';
export const OBJECTS_REMOVE_MEMBERS_ERROR =
  'pubnub/OBJECTS_REMOVE_MEMBERS_ERROR';

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
  type: typeof OBJECTS_UPDATE_USER;
  payload: ObjectsActionPayload;
}

export interface User_Deleted {
  type: typeof OBJECTS_DELETE_USER;
  payload: ObjectsActionPayload;
}

export interface User_Created {
  type: typeof OBJECTS_CREATE_USER;
  payload: ObjectsResponsePayload;
}

export interface Create_User_Error {
  type: typeof OBJECTS_CREATE_USER_ERROR;
  payload: ObjectsStatusPayload;
}

export interface User_List_Retrieved {
  type: typeof OBJECTS_GET_USERS;
  payload: ObjectsResponsePayload;
}

export interface Get_Users_Error {
  type: typeof OBJECTS_GET_USERS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Get_User_By_Id {
  type: typeof OBJECTS_GET_USER_BY_ID;
  payload: ObjectsResponsePayload;
}

export interface Get_User_By_Id_Error {
  type: typeof OBJECTS_GET_USER_BY_ID_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Space_Updated {
  type: typeof OBJECTS_UPDATE_SPACE;
  payload: ObjectsActionPayload;
}

export interface Space_Deleted {
  type: typeof OBJECTS_DELETE_SPACE;
  payload: ObjectsActionPayload;
}

export interface Space_List_Retrieved {
  type: typeof OBJECTS_GET_SPACES;
  payload: ObjectsResponsePayload;
}

export interface Get_Spaces_Error {
  type: typeof OBJECTS_GET_SPACES_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Space_Created {
  type: typeof OBJECTS_CREATE_SPACE;
  payload: ObjectsResponsePayload;
}

export interface Create_Space_Error {
  type: typeof OBJECTS_CREATE_SPACE_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Get_Space_By_Id {
  type: typeof OBJECTS_GET_SPACE_BY_ID;
  payload: ObjectsResponsePayload;
}

export interface Get_Space_By_Id_Error {
  type: typeof OBJECTS_GET_SPACE_BY_ID_ERROR;
  payload: ObjectsStatusPayload;
}

export interface User_Added_To_Space {
  type: typeof OBJECTS_USER_ADDED_TO_SPACE;
  payload: ObjectsActionPayload;
}

export interface User_Removed_From_Space {
  type: typeof OBJECTS_USER_REMOVED_FROM_SPACE;
  payload: ObjectsActionPayload;
}

export interface User_Membership_Updated_On_Space {
  type: typeof OBJECTS_USER_MEMBERSHIP_UPDATED_ON_SPACE;
  payload: ObjectsActionPayload;
}

export interface Member_List_Retrieved {
  type: typeof OBJECTS_GET_MEMBERS;
  payload: ObjectsResponsePayload;
}

export interface Get_Members_Error {
  type: typeof OBJECTS_GET_MEMBERS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Memberships_Retrieved {
  type: typeof OBJECTS_GET_MEMBERSHIPS;
  payload: ObjectsResponsePayload;
}

export interface Get_Memerships_Error {
  type: typeof OBJECTS_GET_MEMBERSHIPS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Members_Added {
  type: typeof OBJECTS_ADD_MEMBERS;
  payload: ObjectsResponsePayload;
}

export interface Add_Members_Error {
  type: typeof OBJECTS_ADD_MEMBERS_ERROR;
  payload: ObjectsStatusPayload;
}

export interface Members_Removed {
  type: typeof OBJECTS_REMOVE_MEMBERS;
  payload: ObjectsResponsePayload;
}

export interface Remove_Members_Error {
  type: typeof OBJECTS_REMOVE_MEMBERS_ERROR;
  payload: ObjectsStatusPayload;
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
  | User_Created
  | Create_User_Error
  | User_List_Retrieved
  | Get_Users_Error
  | Get_User_By_Id
  | Get_User_By_Id_Error
  | Space_Updated
  | Space_Deleted
  | Space_Created
  | Create_Space_Error
  | Space_List_Retrieved
  | Get_Spaces_Error
  | Get_Space_By_Id
  | Get_Space_By_Id_Error
  | User_Added_To_Space
  | User_Removed_From_Space
  | User_Membership_Updated_On_Space
  | Member_List_Retrieved
  | Get_Members_Error
  | Memberships_Retrieved
  | Get_Memerships_Error
  | Members_Added
  | Members_Removed
  | Remove_Members_Error
  | Add_Members_Error;

export type AppActions =
  | MessageAction
  | PresenceActionTypes
  | StatusActionTypes
  | ObjectsActionTypes
  | SignalAction;
