import Pubnub from 'pubnub';
import { MembershipActionType } from './MembershipActionType.enum';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export type Membership<
  MembershipCustom extends ObjectsCustom = ObjectsCustom,
  ChannelCustom extends ObjectsCustom = ObjectsCustom
> = Pubnub.ChannelMembershipObject<MembershipCustom, ChannelCustom>;

export interface FetchMembershipsRequest
  extends Pubnub.GetMembershipsParametersv2 {
  uuid: string;
}

export interface SetMembershipsRequest<ChannelCustom extends ObjectsCustom>
  extends Pubnub.SetMembershipsParameters<ChannelCustom> {
  uuid: string;
}

export interface RemoveMembershipsRequest
  extends Pubnub.RemoveMembershipsParameters {
  uuid: string;
}

export type MembershipsResponse<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom
> = Pubnub.ManageMembershipsResponse<MembershipCustom, ChannelCustom>;

export interface FetchMembershipsSuccess<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom
> {
  request: FetchMembershipsRequest;
  response: MembershipsResponse<MembershipCustom, ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchMembershipsError {
  request: FetchMembershipsRequest;
  status: Pubnub.PubnubStatus;
}

export interface SetMembershipsSuccess<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom
> {
  request: SetMembershipsRequest<ChannelCustom>;
  response: MembershipsResponse<MembershipCustom, ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export type RemoveMembershipEventMessage = Pubnub.RemoveMembershipEvent['message'];
export type SetMembershipEventMessage<
  MembershipCustom extends ObjectsCustom
> = Pubnub.SetMembershipEvent<MembershipCustom>['message'];
export type MembershipEventMessage<MembershipCustom extends ObjectsCustom> =
  | RemoveMembershipEventMessage
  | SetMembershipEventMessage<MembershipCustom>;

export interface SetMembershipsError<ChannelCustom extends ObjectsCustom> {
  request: SetMembershipsRequest<ChannelCustom>;
  status: Pubnub.PubnubStatus;
}

export interface FetchingMembershipsAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.FETCHING_MEMBERSHIPS;
  payload: FetchMembershipsRequest;
  meta?: Meta;
}

export interface MembershipsRetrievedAction<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.MEMBERSHIPS_RETRIEVED;
  payload: FetchMembershipsSuccess<MembershipCustom, ChannelCustom>;
  meta?: Meta;
}

export interface ErrorFetchingMembershipsAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_FETCHING_MEMBERSHIPS;
  payload: FetchMembershipsError;
  meta?: Meta;
  error: true;
}

export interface SettingMembershipsAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.SETTING_MEMBERSHIPS;
  payload: SetMembershipsRequest<ChannelCustom>;
  meta?: Meta;
}

export interface MembershipsSetAction<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.MEMBERSHIPS_SET;
  payload: SetMembershipsSuccess<MembershipCustom, ChannelCustom>;
  meta?: Meta;
}

export interface ErrorSettingMembershipsAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.ERROR_SETTING_MEMBERSHIPS;
  payload: SetMembershipsError<ChannelCustom>;
  meta?: Meta;
  error: true;
}

export interface RemovingChannelsAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.REMOVING_MEMBERSHIPS;
  payload: SetMembershipsRequest<ChannelCustom>;
  meta?: Meta;
}

export interface MembershipsRemovedAction<
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.MEMBERSHIPS_REMOVED;
  payload: SetMembershipsSuccess<MembershipCustom, ChannelCustom>;
  meta?: Meta;
}

export interface ErrorRemovingMembershipsAction<
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.ERROR_REMOVING_MEMBERSHIPS;
  payload: SetMembershipsError<ChannelCustom>;
  meta?: Meta;
  error: true;
}

export interface MembershipSetEventAction<
  MembershipCustom extends ObjectsCustom
> {
  type: typeof MembershipActionType.MEMBERSHIP_SET_EVENT;
  payload: MembershipEventMessage<MembershipCustom>;
}

export interface MembershipRemovedEventAction<
  MembershipCustom extends ObjectsCustom
> {
  type: typeof MembershipActionType.MEMBERSHIP_REMOVED_EVENT;
  payload: MembershipEventMessage<MembershipCustom>;
}

export type MembershipActions<
  ChannelCustom extends ObjectsCustom,
  MembershipCustom extends ObjectsCustom,
  Meta extends ActionMeta
> =
  | FetchingMembershipsAction<Meta>
  | MembershipsRetrievedAction<MembershipCustom, ChannelCustom, Meta>
  | ErrorFetchingMembershipsAction<Meta>
  | SettingMembershipsAction<ChannelCustom, Meta>
  | MembershipsSetAction<MembershipCustom, ChannelCustom, Meta>
  | ErrorSettingMembershipsAction<ChannelCustom, Meta>
  | RemovingChannelsAction<ChannelCustom, Meta>
  | MembershipsRemovedAction<MembershipCustom, ChannelCustom, Meta>
  | ErrorRemovingMembershipsAction<ChannelCustom, Meta>;

export type MembershipListenerActions<MembershipCustom extends ObjectsCustom> =
  | MembershipSetEventAction<MembershipCustom>
  | MembershipRemovedEventAction<MembershipCustom>
  | MembershipSetEventAction<MembershipCustom>;
