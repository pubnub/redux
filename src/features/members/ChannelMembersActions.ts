import Pubnub from 'pubnub';
import { ChannelMembersActionType } from './ChannelMembersActionType.enum';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type SetChannelMembersRequest<
  MembershipCustom extends ObjectsCustom
> = Pubnub.SetChannelMembersParameters<MembershipCustom>;

export type RemoveChannelMembersRequest = Pubnub.RemoveChannelMembersParameters;

export type ChannelMembersResponse<
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  UserCustom extends ObjectsCustom = ObjectsCustom
> = Pubnub.ManageChannelMembersResponse<MembershipCustom, UserCustom>;

export type FetchChannelMembersRequest = Pubnub.GetChannelMembersParameters;

export interface FetchChannelMembersSuccess<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom
> {
  request: FetchChannelMembersRequest;
  response: ChannelMembersResponse<MembershipCustom, UserCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchChannelMembersError {
  request: FetchChannelMembersRequest;
  status: Pubnub.PubnubStatus;
}

export interface SetChannelMembersSuccess<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom
> {
  request: SetChannelMembersRequest<MembershipCustom>;
  response: ChannelMembersResponse<MembershipCustom, UserCustom>;
  status: Pubnub.PubnubStatus;
}

export interface SetChannelMembersError<
  MembershipCustom extends ObjectsCustom
> {
  request: SetChannelMembersRequest<MembershipCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchingChannelMembersAction<Meta> {
  type: typeof ChannelMembersActionType.FETCHING_CHANNEL_MEMBERS;
  payload: FetchChannelMembersRequest;
  meta?: Meta;
}

export interface ChannelMembersRetrievedAction<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED;
  payload: FetchChannelMembersSuccess<MembershipCustom, UserCustom>;
  meta?: Meta;
}

export interface ErrorFetchingChannelMembersAction<Meta> {
  type: typeof ChannelMembersActionType.ERROR_FETCHING_CHANNEL_MEMBERS;
  payload: FetchChannelMembersError;
  meta?: Meta;
  error: true;
}

export interface SettingChannelMembersAction<
  MembershipCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.SETTING_CHANNEL_MEMBERS;
  payload: SetChannelMembersRequest<MembershipCustom>;
  meta?: Meta;
}

export interface ChannelMembersSetAction<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.CHANNEL_MEMBERS_SET;
  payload: SetChannelMembersSuccess<MembershipCustom, UserCustom>;
  meta?: Meta;
}

export interface ErrorSettingChannelMembersAction<
  MembershipCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.ERROR_SETTING_CHANNEL_MEMBERS;
  payload: SetChannelMembersError<MembershipCustom>;
  meta?: Meta;
  error: true;
}

export interface RemovingChannelMembersAction<Meta extends ActionMeta> {
  type: typeof ChannelMembersActionType.REMOVING_CHANNEL_MEMBERS;
  payload: RemoveChannelMembersRequest;
  meta?: Meta;
}

export interface ChannelMembersRemovedAction<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED;
  payload: SetChannelMembersSuccess<MembershipCustom, UserCustom>;
  meta?: Meta;
}

export interface ErrorRemovingChannelMembersAction<
  MembershipCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof ChannelMembersActionType.ERROR_REMOVING_CHANNEL_MEMBERS;
  payload: SetChannelMembersError<MembershipCustom>;
  meta?: Meta;
  error: true;
}

export type ChannelMembersActions<
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
> =
  | FetchingChannelMembersAction<Meta>
  | ChannelMembersRetrievedAction<MembershipCustom, UserCustom, Meta>
  | ErrorFetchingChannelMembersAction<Meta>
  | SettingChannelMembersAction<MembershipCustom, Meta>
  | ChannelMembersSetAction<MembershipCustom, UserCustom, Meta>
  | ErrorSettingChannelMembersAction<MembershipCustom, Meta>
  | RemovingChannelMembersAction<Meta>
  | ChannelMembersRemovedAction<MembershipCustom, UserCustom, Meta>
  | ErrorRemovingChannelMembersAction<MembershipCustom, Meta>;
