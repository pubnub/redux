import Pubnub from 'pubnub';
import { UserDataActionType } from './UserDataActionType.enum';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type UserData<
  UserCustom extends ObjectsCustom = ObjectsCustom
> = Pubnub.UUIDMetadataObject<UserCustom>;

export type UserDataRequestOptions = Pubnub.GetAllMetadataParameters;

export type UserDataRequest = Pubnub.GetUUIDMetadataParameters;
export type SetUserDataRequest<
  UserCustom extends ObjectsCustom
> = Pubnub.SetUUIDMetadataParameters<UserCustom>;

export type UserDataResponse<
  UserCustom extends ObjectsCustom
> = Pubnub.GetUUIDMetadataResponse<UserCustom>;

export interface FetchUserDataRequest extends UserDataRequestOptions {
  uuid: string;
}

export type FetchAllUserDataRequest = UserDataRequestOptions;

export type FetchUserDataResponse<
  UserCustom extends ObjectsCustom
> = Pubnub.GetAllUUIDMetadataResponse<UserCustom>;

export type SetUserDataEventMessage<
  UserCustom extends ObjectsCustom
> = Pubnub.SetUUIDMetadataEvent<UserCustom>['message'];
export type RemoveUserDataEventMessage = Pubnub.RemoveUUIDMetadataEvent['message'];
export type UserDataEventMessage<UserCustom extends ObjectsCustom> =
  | SetUserDataEventMessage<UserCustom>
  | RemoveUserDataEventMessage;

export type UsersListenerPayload<UserCustom extends ObjectsCustom> = {
  message: UserDataEventMessage<UserCustom>;
};

export interface FetchUserDataSuccess<UserCustom extends ObjectsCustom> {
  request: FetchAllUserDataRequest;
  response: FetchUserDataResponse<UserCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchUserDataError {
  request: FetchAllUserDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface UserDataSuccess<UserCustom extends ObjectsCustom> {
  request: UserDataRequest;
  response: UserDataResponse<UserCustom>;
  status: Pubnub.PubnubStatus;
}

export interface UserDataError {
  request: UserDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface FetchUserDataByIdSuccess<UserCustom extends ObjectsCustom> {
  request: FetchUserDataRequest;
  response: UserDataResponse<UserCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchUserDataByIdError {
  request: FetchUserDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface DeleteUserDataRequest {
  uuid: string;
}

export interface DeleteUserDataSuccess {
  request: DeleteUserDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface DeleteUserDataError {
  request: DeleteUserDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface FetchingAllUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.FETCHING_ALL_USER_DATA;
  payload: FetchAllUserDataRequest;
  meta?: Meta;
}

export interface AllUserDataRetrievedAction<
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof UserDataActionType.ALL_USER_DATA_RETRIEVED;
  payload: FetchUserDataSuccess<UserCustom>;
  meta?: Meta;
}

export interface ErrorFetchingAllUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.ERROR_FETCHING_ALL_USER_DATA;
  payload: FetchUserDataError;
  meta?: Meta;
  error: true;
}

export interface FetchingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.FETCHING_USER_DATA;
  payload: FetchUserDataRequest;
  meta?: Meta;
}

export interface UserDataRetrievedAction<
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof UserDataActionType.USER_DATA_RETRIEVED;
  payload: FetchUserDataByIdSuccess<UserCustom>;
  meta?: Meta;
}

export interface ErrorFetchingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.ERROR_FETCHING_USER_DATA;
  payload: FetchUserDataByIdError;
  meta?: Meta;
  error: true;
}

export interface SettingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.SETTING_USER_DATA;
  payload: UserDataRequest;
  meta?: Meta;
}

export interface UserDataSetAction<
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof UserDataActionType.USER_DATA_SET;
  payload: UserDataSuccess<UserCustom>;
  meta?: Meta;
}

export interface ErrorSettingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.ERROR_SETTING_USER_DATA;
  payload: UserDataError;
  meta?: Meta;
  error: true;
}

export interface RemovingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.REMOVING_USER_DATA;
  payload: DeleteUserDataRequest;
  meta?: Meta;
}

export interface UserDataRemovedAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.USER_DATA_REMOVED;
  payload: DeleteUserDataSuccess;
  meta?: Meta;
}

export interface ErrorRemovingUserDataAction<Meta extends ActionMeta> {
  type: typeof UserDataActionType.ERROR_REMOVING_USER_DATA;
  payload: DeleteUserDataError;
  meta?: Meta;
  error: true;
}

export interface UserDataSetEventAction<UserCustom extends ObjectsCustom> {
  type: typeof UserDataActionType.USER_DATA_SET_EVENT;
  payload: UserDataEventMessage<UserCustom>;
}

export interface UserDataRemovedEventAction<UserCustom extends ObjectsCustom> {
  type: typeof UserDataActionType.USER_DATA_REMOVED_EVENT;
  payload: UserDataEventMessage<UserCustom>;
}

export type UserDataActions<
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> =
  | FetchingAllUserDataAction<Meta>
  | AllUserDataRetrievedAction<UserCustom, Meta>
  | ErrorFetchingAllUserDataAction<Meta>
  | FetchingUserDataAction<Meta>
  | UserDataRetrievedAction<UserCustom, Meta>
  | ErrorFetchingUserDataAction<Meta>
  | SettingUserDataAction<Meta>
  | UserDataSetAction<UserCustom, Meta>
  | ErrorSettingUserDataAction<Meta>
  | RemovingUserDataAction<Meta>
  | UserDataRemovedAction<Meta>
  | ErrorRemovingUserDataAction<Meta>;

export type UserDataListenerActions<UserCustom extends ObjectsCustom> =
  | UserDataSetEventAction<UserCustom>
  | UserDataRemovedEventAction<UserCustom>;
