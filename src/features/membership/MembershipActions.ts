import { Space } from '../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../foundations/PubNubApi';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';

// tag::RDX-type-membership[]
export interface Membership<
  CustomMembershipFields extends ObjectsCustom = AnyCustom,
  ReceivedSpace extends Space<ObjectsCustom> = Space
> {
  id: string;
  custom?: CustomMembershipFields;
  space?: ReceivedSpace;
  created?: string;
  updated?: string;
  eTag?: string;
}
// end::RDX-type-membership[]

// tag::RDX-type-membership-page[]
export interface MembershipPage {
  next?: string;
  prev?: string;
}
// end::RDX-type-membership-page[]

// tag::RDX-type-membership-fetch-option[]
export interface MembershipFetchRequestOptions {
  limit?: number;
  page?: MembershipPage;
  include?: {
    customFields?: boolean;
    spaceFields?: boolean;
    customSpaceFields?: boolean;
    totalCount?: boolean;
  };
}
// end::RDX-type-membership-fetch-option[]

// tag::RDX-type-membership-fetch-response[]
export interface FetchMembershipResponse<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  status: string;
  data: ReceivedMembership[];
}
// end::RDX-type-membership-fetch-response[]

// tag::RDX-type-membership-fetch-success[]
export interface FetchMembershipSuccess<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  request: FetchMembershipRequest;
  response: FetchMembershipResponse<ReceivedMembership>;
  status: PubNubApiStatus;
}
// end::RDX-type-membership-fetch-success[]

// tag::RDX-type-membership-fetch-request[]
export interface FetchMembershipRequest extends MembershipFetchRequestOptions {
  userId: string;
}
// end::RDX-type-membership-fetch-request[]

// tag::RDX-type-membership-fetch-error[]
export interface FetchMembershipError {
  request: FetchMembershipRequest;
  status: PubNubApiStatus;
}
// end::RDX-type-membership-fetch-error[]

// tag::RDX-type-membership-request[]
export type MembershipRequest<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> = {
  userId: string;
  spaces: ReceivedMembership[];
};
// end::RDX-type-membership-request[]

// tag::RDX-type-membership-response[]
export interface MembershipResponse<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  status: string;
  data: ReceivedMembership[];
}
// end::RDX-type-membership-response[]

// tag::RDX-type-membership-success[]
export interface MembershipSuccess<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  request: MembershipRequest<ReceivedMembership>;
  response: MembershipResponse<ReceivedMembership>;
  status: PubNubApiStatus;
}
// end::RDX-type-membership-success[]

// tag::RDX-type-membership-error[]
export interface MembershipError<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  request: MembershipRequest<ReceivedMembership>;
  status: PubNubApiStatus;
}
// end::RDX-type-membership-error[]

// tag::RDX-type-membership-event-item[]
export interface MembershipEventItem<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  userId: string;
  spaceId: string;
  custom: ReceivedMembership['custom'];
}
// end::RDX-type-membership-event-item[]

// tag::RDX-type-membership-event-message[]
export interface MembershipEventMessage<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  data: MembershipEventItem<ReceivedMembership>;
  event: string;
  type: string;
}
// end::RDX-type-membership-event-message[]

// tag::RDX-action-membership-fetch[]
export interface FetchingMembershipAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.FETCHING_MEMBERSHIP;
  payload: FetchMembershipRequest;
  meta?: Meta;
}
// end::RDX-action-membership-fetch[]

// tag::RDX-action-membership-fetch-success[]
export interface MembershipRetrievedAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.MEMBERSHIP_RETRIEVED;
  payload: FetchMembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-membership-fetch-success[]

// tag::RDX-action-membership-fetch-error[]
export interface ErrorFetchingMembershipAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_FETCHING_MEMBERSHIP;
  payload: FetchMembershipError;
  meta?: Meta;
  error: true;
}
// end::RDX-action-membership-fetch-error[]

// tag::RDX-action-membership-update[]
export interface UpdatingMembershipAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.UPDATING_MEMBERSHIP;
  payload: MembershipRequest<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-membership-update[]

// tag::RDX-action-membership-update-sucess[]
export interface MembershipUpdatedAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.MEMBERSHIP_UPDATED;
  payload: MembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-membership-update-sucess[]

// tag::RDX-action-membership-update-error[]
export interface ErrorUpdatingMembershipAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.ERROR_UPDATING_MEMBERSHIP;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-membership-update-error[]

// tag::RDX-action-spaces-join[]
export interface JoiningSpacesAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.JOINING_SPACES;
  payload: MembershipRequest<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-spaces-join[]

// tag::RDX-action-spaces-join-success[]
export interface SpacesJoinedAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.SPACES_JOINED;
  payload: MembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-spaces-join-success[]

// tag::RDX-action-spaces-join-error[]
export interface ErrorJoiningSpacesAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.ERROR_JOINING_SPACES;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-spaces-join-error[]

// tag::RDX-action-spaces-leave[]
export interface LeavingSpacesAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.LEAVING_SPACES;
  payload: MembershipRequest<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-spaces-leave[]

// tag::RDX-action-spaces-leave-success[]
export interface SpacesLeftAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.SPACES_LEFT;
  payload: MembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-action-spaces-leave-success[]

// tag::RDX-action-spaces-leave-error[]
export interface ErrorLeavingSpacesAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> {
  type: typeof MembershipActionType.ERROR_LEAVING_SPACES;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-action-spaces-leave-error[]

// tag::RDX-action-user-added[]
export interface UserAddedToSpaceEventAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  type: typeof MembershipActionType.USER_ADDED_TO_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-action-user-added[]

// tag::RDX-action-user-removed[]
export interface UserRemovedFromSpaceEventAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  type: typeof MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-action-user-removed[]

// tag::RDX-action-membership-updated[]
export interface UserMembershipUpdatedOnSpaceEventAction<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> {
  type: typeof MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-action-membership-updated[]

// tag::RDX-action-membership[]
export type MembershipActions<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
> =
  | FetchingMembershipAction<Meta>
  | MembershipRetrievedAction<ReceivedMembership, Meta>
  | ErrorFetchingMembershipAction<Meta>
  | UpdatingMembershipAction<ReceivedMembership, Meta>
  | MembershipUpdatedAction<ReceivedMembership, Meta>
  | ErrorUpdatingMembershipAction<ReceivedMembership, Meta>
  | JoiningSpacesAction<ReceivedMembership, Meta>
  | SpacesJoinedAction<ReceivedMembership, Meta>
  | ErrorJoiningSpacesAction<ReceivedMembership, Meta>
  | LeavingSpacesAction<ReceivedMembership, Meta>
  | SpacesLeftAction<ReceivedMembership, Meta>
  | ErrorLeavingSpacesAction<ReceivedMembership, Meta>;
// end::RDX-action-membership[]

// tag::RDX-action-membership-listener[]
export type MembershipListenerActions<
  ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>
> =
  | UserAddedToSpaceEventAction<ReceivedMembership>
  | UserRemovedFromSpaceEventAction<ReceivedMembership>
  | UserMembershipUpdatedOnSpaceEventAction<ReceivedMembership>;
// end::RDX-action-membership-listener[]
