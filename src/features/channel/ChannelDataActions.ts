import Pubnub from 'pubnub';
import { ChannelDataActionType } from './ChannelDataActionType.enum';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type Channel<
  ChannelCustom extends ObjectsCustom = ObjectsCustom
> = Pubnub.ChannelMetadataObject<ChannelCustom>;

export type FetchAllChannelDataRequest = Pubnub.GetAllMetadataParameters;

export type FetchAllChannelDataResponse<
  ChannelCustom extends ObjectsCustom
> = Pubnub.GetAllChannelMetadataResponse<ChannelCustom>;

export type SetChannelDataRequest<
  ChannelCustom extends ObjectsCustom
> = Pubnub.SetChannelMetadataParameters<ChannelCustom>;

export type SetChannelDataResponse<
  ChannelCustom extends ObjectsCustom
> = Pubnub.SetChannelMetadataResponse<ChannelCustom>;

export type FetchChannelDataResponse<
  ChannelCustom extends ObjectsCustom
> = Pubnub.GetChannelMetadataResponse<ChannelCustom>;

export type SetChannelDataEventMessage<
  ChannelCustom extends ObjectsCustom
> = Pubnub.SetChannelMetadataEvent<ChannelCustom>['message'];
export type RemoveChannelDataEventMessage = Pubnub.RemoveChannelMetadataEvent['message'];

export type ChannelDataEventMessage<ChannelCustom extends ObjectsCustom> =
  | SetChannelDataEventMessage<ChannelCustom>
  | RemoveChannelDataEventMessage;

export type FetchChannelDataRequest = Pubnub.GetChannelMetadataParameters;

export interface FetchAllChannelDataError {
  request: FetchAllChannelDataRequest;
  status: Pubnub.PubnubStatus;
}

export interface FetchAllChannelDataSuccess<
  ChannelCustom extends ObjectsCustom
> {
  request: FetchAllChannelDataRequest;
  response: FetchAllChannelDataResponse<ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface SetChannelDataSuccess<ChannelCustom extends ObjectsCustom> {
  request: SetChannelDataRequest<ChannelCustom>;
  response: SetChannelDataResponse<ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface SetChannelDataError<ChannelCustom extends ObjectsCustom> {
  request: SetChannelDataRequest<ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchChannelDataSuccess<ChannelCustom extends ObjectsCustom> {
  request: FetchChannelDataRequest;
  response: FetchChannelDataResponse<ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchChannelDataError {
  request: FetchChannelDataRequest;
  status: Pubnub.PubnubStatus;
}

export type RemoveChannelRequest = Pubnub.RemoveChannelMetadataParameters;

export interface RemoveChannelSuccess {
  request: RemoveChannelRequest;
  status: Pubnub.PubnubStatus;
}

export interface RemoveChannelError {
  request: RemoveChannelRequest;
  status: Pubnub.PubnubStatus;
}

export interface FetchingAllChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.FETCHING_ALL_CHANNEL_DATA;
  payload: FetchAllChannelDataRequest;
  meta?: Meta;
}

export interface AllChannelDataRetrievedAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelDataActionType.ALL_CHANNEL_DATA_RETRIEVED;
  payload: FetchAllChannelDataSuccess<ChannelCustom>;
  meta?: Meta;
}

export interface ErrorFetchingAllChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.ERROR_FETCHING_ALL_CHANNEL_DATA;
  payload: FetchAllChannelDataError;
  meta?: Meta;
  error: true;
}

export interface FetchingChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.FETCHING_CHANNEL_DATA;
  payload: FetchChannelDataRequest;
  meta?: Meta;
}

export interface ChannelDataRetrievedAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelDataActionType.CHANNEL_DATA_RETRIEVED;
  payload: FetchChannelDataSuccess<ChannelCustom>;
  meta?: Meta;
}

export interface ErrorFetchingChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.ERROR_FETCHING_CHANNEL_DATA;
  payload: FetchChannelDataError;
  meta?: Meta;
  error: true;
}

export interface SettingChannelDataAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelDataActionType.SETTING_CHANNEL_DATA;
  payload: SetChannelDataRequest<ChannelCustom>;
  meta?: Meta;
}

export interface ChannelDataSetAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelDataActionType.CHANNEL_DATA_SET;
  payload: SetChannelDataSuccess<ChannelCustom>;
  meta?: Meta;
}

export interface ErrorSettingChannelDataAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelDataActionType.ERROR_SETTING_CHANNEL_DATA;
  payload: SetChannelDataError<ChannelCustom>;
  meta?: Meta;
  error: true;
}

export interface RemovingChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.REMOVING_CHANNEL_DATA;
  payload: RemoveChannelRequest;
  meta?: Meta;
}

export interface ChannelDataRemovedAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.CHANNEL_DATA_REMOVED;
  payload: RemoveChannelSuccess;
  meta?: Meta;
}

export interface ErrorRemovingChannelDataAction<Meta extends ActionMeta> {
  type: typeof ChannelDataActionType.ERROR_REMOVING_CHANNEL_DATA;
  payload: RemoveChannelError;
  meta?: Meta;
  error: true;
}

export interface ChannelDataSetEventAction<
  ChannelCustom extends ObjectsCustom
> {
  type: typeof ChannelDataActionType.CHANNEL_DATA_SET_EVENT;
  payload: ChannelDataEventMessage<ChannelCustom>;
}

export interface ChannelDataRemovedEventAction<
  ChannelCustom extends ObjectsCustom
> {
  type: typeof ChannelDataActionType.CHANNEL_DATA_REMOVED_EVENT;
  payload: ChannelDataEventMessage<ChannelCustom>;
}

export type ChannelDataActions<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> =
  | FetchingAllChannelDataAction<Meta>
  | AllChannelDataRetrievedAction<ChannelCustom, Meta>
  | ErrorFetchingAllChannelDataAction<Meta>
  | FetchingChannelDataAction<Meta>
  | ChannelDataRetrievedAction<ChannelCustom, Meta>
  | ErrorFetchingChannelDataAction<Meta>
  | SettingChannelDataAction<ChannelCustom, Meta>
  | ChannelDataSetAction<ChannelCustom, Meta>
  | ErrorSettingChannelDataAction<ChannelCustom, Meta>
  | RemovingChannelDataAction<Meta>
  | ChannelDataRemovedAction<Meta>
  | ErrorRemovingChannelDataAction<Meta>;

export type ChannelDataListenerActions<ChannelCustom extends ObjectsCustom> =
  | ChannelDataSetEventAction<ChannelCustom>
  | ChannelDataRemovedEventAction<ChannelCustom>;
