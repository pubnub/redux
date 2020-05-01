import Pubnub from 'pubnub';
import { MembersActionType } from './MembersActionType.enum';
import { ActionMeta } from '../../foundations/ActionMeta';
import { ObjectsCustom, AnyCustom } from 'foundations/ObjectsCustom';
import { Space } from 'features/space/SpaceActions';
import { User } from 'features/user/UserActions';

export type FetchMembersCallback<
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>
> = (
  status: Pubnub.PubnubStatus,
  response: FetchMembersResponse<MembersType>
) => void;

export type MembersCallback<
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>
> = (
  status: Pubnub.PubnubStatus,
  response: MembersResponse<MembersType>
) => void;

// tag::RDX-type-memberpage[]
export interface MemberPage {
  next?: string;
  prev?: string;
}
// end::RDX-type-memberpage[]

// tag::RDX-type-members[]
export interface Members<
  CustomMemberFields extends ObjectsCustom = AnyCustom,
  ReceivedUser extends User<ObjectsCustom> = User
> {
  id: string;
  custom?: CustomMemberFields;
  user?: ReceivedUser;
  created?: string;
  updated?: string;
  eTag?: string;
}
// end::RDX-type-members[]

// tag::RDX-type-member-request[]
export type MembersRequest<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> = {
  spaceId: string;
  users: ReceivedMembers[];
};
// end::RDX-type-member-request[]

// tag::RDX-type-member-response[]
export interface MembersResponse<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> {
  status: number;
  data: ReceivedMembers[];
}
// end::RDX-type-member-response[]

// tag::RDX-type-member-fetch-option[]
export interface MembersFetchRequestOptions {
  limit?: number;
  page?: MemberPage;
  include?: {
    customFields?: boolean;
    userFields?: boolean;
    customUserFields?: boolean;
    totalCount?: boolean;
  };
}
// end::RDX-type-member-fetch-option[]

// tag::RDX-type-member-fetch-option[]
export interface MembersFetchRequestOptions {
  limit?: number;
  page?: MemberPage;
  include?: {
    customFields?: boolean;
    userFields?: boolean;
    customUserFields?: boolean;
    totalCount?: boolean;
  };
}
// end::RDX-type-member-fetch-option[]

// tag::RDX-type-member-fetch[]
export interface FetchMembersRequest extends MembersFetchRequestOptions {
  spaceId: string;
}
// end::RDX-type-member-fetch[]

// tag::RDX-type-member-fetch-response[]
export interface FetchMembersResponse<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> {
  status: number;
  data: ReceivedMembers[];
}
// end::RDX-type-member-fetch-response[]

// tag::RDX-type-member-fetch-success[]
export interface FetchMembersSuccess<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> {
  request: FetchMembersRequest;
  response: FetchMembersResponse<ReceivedMembers>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-member-fetch-success[]

// tag::RDX-type-member-fetch-error[]
export interface FetchMembersError {
  request: FetchMembersRequest;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-member-fetch-error[]

// tag::RDX-type-member-success[]
export interface MembersSuccess<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> {
  request: MembersRequest<ReceivedMembers>;
  response: MembersResponse<ReceivedMembers>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-member-success[]

// tag::RDX-type-member-error[]
export interface MembersError<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>
> {
  request: MembersRequest<ReceivedMembers>;
  status: Pubnub.PubnubStatus;
}
// end::RDX-type-member-error[]

// tag::RDX-action-member-fetch[]
export interface FetchingMembersAction<Meta> {
  type: typeof MembersActionType.FETCHING_MEMBERS;
  payload: FetchMembersRequest;
  meta?: Meta;
}
// end::RDX-action-member-fetch[]

// tag::RDX-action-member-retrieved[]
export interface MembersRetrievedAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.MEMBERS_RETRIEVED;
  payload: FetchMembersSuccess<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-retrieved[]

// tag::RDX-action-member-fetch-error[]
export interface ErrorFetchingMembersAction<Meta> {
  type: typeof MembersActionType.ERROR_FETCHING_MEMBERS;
  payload: FetchMembersError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-member-fetch-error[]

// tag::RDX-action-member-update[]
export interface UpdatingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.UPDATING_MEMBERS;
  payload: MembersRequest<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-update[]

// tag::RDX-action-member-update-success[]
export interface MembersUpdatedAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.MEMBERS_UPDATED;
  payload: MembersSuccess<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-update-success[]

// tag::RDX-action-member-update-error[]
export interface ErrorUpdatingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.ERROR_UPDATING_MEMBERS;
  payload: MembersError<ReceivedMembers>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-member-update-error[]

// tag::RDX-action-member-add[]
export interface AddingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.ADDING_MEMBERS;
  payload: MembersRequest<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-add[]

// tag::RDX-action-member-add-success[]
export interface MembersAddedAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.MEMBERS_ADDED;
  payload: MembersSuccess<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-add-success[]

// tag::RDX-action-member-add-error[]
export interface ErrorAddingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.ERROR_ADDING_MEMBERS;
  payload: MembersError<ReceivedMembers>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-member-add-error[]

// tag::RDX-action-member-remove[]
export interface RemovingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.REMOVING_MEMBERS;
  payload: MembersRequest<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-remove[]

// tag::RDX-action-member-remove-success[]
export interface MembersRemovedAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.MEMBERS_REMOVED;
  payload: MembersSuccess<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-action-member-remove-success[]

// tag::RDX-action-member-remove-error[]
export interface ErrorRemovingMembersAction<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembersActionType.ERROR_REMOVING_MEMBERS;
  payload: MembersError<ReceivedMembers>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-member-remove-error[]

export type MembersActions<
  ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>,
  Meta extends ActionMeta
> =
  | FetchingMembersAction<Meta>
  | MembersRetrievedAction<ReceivedMembers, Meta>
  | ErrorFetchingMembersAction<Meta>
  | UpdatingMembersAction<ReceivedMembers, Meta>
  | MembersUpdatedAction<ReceivedMembers, Meta>
  | ErrorUpdatingMembersAction<ReceivedMembers, Meta>
  | AddingMembersAction<ReceivedMembers, Meta>
  | MembersAddedAction<ReceivedMembers, Meta>
  | ErrorAddingMembersAction<ReceivedMembers, Meta>
  | RemovingMembersAction<ReceivedMembers, Meta>
  | MembersRemovedAction<ReceivedMembers, Meta>
  | ErrorRemovingMembersAction<ReceivedMembers, Meta>;
