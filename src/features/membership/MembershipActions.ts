import { Space, AnySpace } from '../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../foundations/PubNubApi';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';

export interface Membership<CustomMembershipFields extends ObjectsCustom, ReceivedSpace extends Space<ObjectsCustom>> {
  id: string;
  custom?: CustomMembershipFields;
  space?: ReceivedSpace;
  created?: string;
  updated?: string;
  eTag?: string;
}

export interface AnyMembership extends Membership<AnyCustom, AnySpace> {}

export interface MembershipPage {
  next?: string;
  prev?: string;
}

export interface MembershipFetchRequestOptions {
  limit?: number,
  page?: MembershipPage,
  include?: {
    customFields?: boolean;
    userFields: boolean;
    customUserFields: boolean;
    totalCount: boolean;
  };
}

export interface FetchMembershipResponse<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  status: string;
  data: ReceivedMembership[];
}

export interface FetchMembershipSuccess<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  request: FetchMembershipRequest;
  response: FetchMembershipResponse<ReceivedMembership>;
  status: PubNubApiStatus;
}

export interface FetchMembershipRequest extends MembershipFetchRequestOptions {
  userId: string;
}

export interface FetchMembershipError {
  request: FetchMembershipRequest;
  status: PubNubApiStatus;
}

export type MembershipRequest<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> = {
  userId: string;
  spaces: ReceivedMembership[]
};

export interface MembershipResponse<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  status: string;
  data: ReceivedMembership[];
}

export interface MembershipSuccess<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  request: MembershipRequest<ReceivedMembership>;
  response: MembershipResponse<ReceivedMembership>;
  status: PubNubApiStatus;
}

export interface MembershipError<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  request: MembershipRequest<ReceivedMembership>;
  status: PubNubApiStatus;
}

export interface MembershipEventItem<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  userId: string;
  spaceId: string;
  custom: ReceivedMembership['custom'];
}

export interface MembershipEventMessage<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  data: MembershipEventItem<ReceivedMembership>;
  event: string;
  type: string;
}

// tag::RDX-131[]
export interface FetchingMembershipAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.FETCHING_MEMBERSHIP;
  payload: FetchMembershipRequest;
  meta?: Meta;
}
// end::RDX-131[]

// tag::RDX-132[]
export interface MembershipRetrievedAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.MEMBERSHIP_RETRIEVED;
  payload: FetchMembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-132[]

// tag::RDX-133[]
export interface ErrorFetchingMembershipAction<Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_FETCHING_MEMBERSHIP;
  payload: FetchMembershipError;
  meta?: Meta;
  error: true;
}
// end::RDX-133[]

// tag::RDX-135[]
export interface UpdatingMembershipAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.UPDATING_MEMBERSHIP;
  payload: MembershipRequest<ReceivedMembership>
  meta?: Meta;
}
// end::RDX-135[]

// tag::RDX-134[]
export interface MembershipUpdatedAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.MEMBERSHIP_UPDATED;
  payload: MembershipSuccess<ReceivedMembership>;
  meta?: Meta;
}
// end::RDX-134[]

// tag::RDX-136[]
export interface ErrorUpdatingMembershipAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_UPDATING_MEMBERSHIP;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-136[]

// tag::RDX-138[]
export interface JoiningSpacesAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.JOINING_SPACES;
  payload: MembershipRequest<ReceivedMembership>
  meta?: Meta;
}
// end::RDX-138[]

// tag::RDX-137[]
export interface SpacesJoinedAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.SPACES_JOINED;
  payload: MembershipSuccess<ReceivedMembership>
  meta?: Meta;
}
// end::RDX-137[]

// tag::RDX-139[]
export interface ErrorJoiningSpacesAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_JOINING_SPACES;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-139[]

// tag::RDX-141[]
export interface LeavingSpacesAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.LEAVING_SPACES;
  payload: MembershipRequest<ReceivedMembership>
  meta?: Meta;
}
// end::RDX-141[]

// tag::RDX-140[]
export interface SpacesLeftAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.SPACES_LEFT;
  payload: MembershipSuccess<ReceivedMembership>
  meta?: Meta;
}
// end::RDX-140[]

// tag::RDX-142[]
export interface ErrorLeavingSpacesAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembershipActionType.ERROR_LEAVING_SPACES;
  payload: MembershipError<ReceivedMembership>;
  meta?: Meta;
  error: true;
}
// end::RDX-142[]

// tag::RDX-115[]
export interface UserAddedToSpaceEventAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  type: typeof MembershipActionType.USER_ADDED_TO_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-115[]

// tag::RDX-116[]
export interface UserRemovedFromSpaceEventAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  type: typeof MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-116[]

// tag::RDX-117[]
export interface UserMembershipUpdatedOnSpaceEventAction<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> {
  type: typeof MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT;
  payload: MembershipEventMessage<ReceivedMembership>;
}
// end::RDX-117[]

export type MembershipActions<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta> =
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

export type MembershipListenerActions<ReceivedMembership extends Membership<ObjectsCustom, Space<ObjectsCustom>>> =
  | UserAddedToSpaceEventAction<ReceivedMembership>
  | UserRemovedFromSpaceEventAction<ReceivedMembership>
  | UserMembershipUpdatedOnSpaceEventAction<ReceivedMembership>;
