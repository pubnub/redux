import { Space, SpaceResponseItem } from 'features/space/SpaceActions';
import { PubNubApiStatus } from 'common/PubNubApi';
import { ActionMeta } from 'common/ActionMeta';
import { MembershipActionType } from './MembershipActionType.enum';

export interface Membership<CustomType> {
  spaceId: string;
  custom?: CustomType;
}

export interface MembershipPage {
  next?: string;
  prev?: string;
}

export interface MembershipFetchRequestOptions {
  limit: number,
  page: MembershipPage,
  include?: {
    customFields?: boolean;
    userFields: boolean;
    customUserFields: boolean;
    totalCount: boolean;
  };
}

export interface FetchMembershipResponse<SpaceType extends Space, CustomType> {
  status: string;
  data: SpaceResponseItem<SpaceType, CustomType>[];
}

export interface FetchMembershipSuccess<SpaceType extends Space, CustomType> {
  request: FetchMembershipRequest;
  response: FetchMembershipResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export interface FetchMembershipRequest extends MembershipFetchRequestOptions {
  userId: string;
}

export interface FetchMembershipError {
  request: FetchMembershipRequest;
  status: PubNubApiStatus;
}

export type MembershipRequestOptions<MembershipType extends Membership<CustomType>, CustomType> = {
  userId: string;
  spaces: MembershipType[]
};

export type MembershipRequest<MembershipType extends Membership<CustomType>, CustomType> =  MembershipRequestOptions<MembershipType, CustomType>;

export type MembershipResponseItem<SpaceType extends Space, CustomType> = SpaceResponseItem<SpaceType, CustomType>;

export interface MembershipResponse<SpaceType extends Space, CustomType> {
  status: string;
  data: MembershipResponseItem<SpaceType, CustomType>[];
}

export interface MembershipSuccess<SpaceType extends Space, MemberType extends Membership<CustomType>, CustomType> {
  request: MembershipRequest<MemberType, CustomType>;
  response: MembershipResponse<SpaceType, CustomType>;
  status: PubNubApiStatus;
}

export interface MembershipError<MembershipType extends Membership<CustomType>, CustomType> {
  request: MembershipRequest<MembershipType, CustomType>;
  status: PubNubApiStatus;
}

export interface MembershipEventItem<CustomType> {
  userId: string;
  spaceId: string;
  custom: CustomType;
}

export interface MembershipEventMessage<CustomType> {
  data: MembershipEventItem<CustomType>;
  event: string;
  type: string;
}

// tag::RDX-131[]
export interface FetchingMembershipsAction<MetaType> {
  type: typeof MembershipActionType.FETCHING_MEMBERSHIP;
  payload: FetchMembershipRequest;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-131[]

// tag::RDX-132[]
export interface MembershipsRetrievedAction<SpaceType extends Space, CustomType, MetaType> {
  type: typeof MembershipActionType.MEMBERSHIP_RETRIEVED;
  payload: FetchMembershipSuccess<SpaceType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-132[]

// tag::RDX-133[]
export interface ErrorFetchingMembershipsAction<MetaType> {
  type: typeof MembershipActionType.ERROR_FETCHING_MEMBERSHIP;
  payload: FetchMembershipError;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-133[]

// tag::RDX-135[]
export interface UpdatingMembershipAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.UPDATING_MEMBERSHIP;
  payload: MembershipRequest<MembershipType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-135[]

// tag::RDX-134[]
export interface MembershipUpdatedAction<SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.MEMBERSHIP_UPDATED;
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>;
  meta?: ActionMeta<MetaType>;
}
// end::RDX-134[]

// tag::RDX-136[]
export interface ErrorUpdatingMembershipAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.ERROR_UPDATING_MEMBERSHIP;
  payload: MembershipError<MembershipType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-136[]

// tag::RDX-138[]
export interface JoiningSpacesAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.JOINING_SPACES;
  payload: MembershipRequest<MembershipType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-138[]

// tag::RDX-137[]
export interface SpacesJoinedAction<SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.SPACES_JOINED;
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-137[]

// tag::RDX-139[]
export interface ErrorJoiningSpacesAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.ERROR_JOINING_SPACES;
  payload: MembershipError<MembershipType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-139[]

// tag::RDX-141[]
export interface LeavingSpacesAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.LEAVING_SPACES;
  payload: MembershipRequest<MembershipType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-141[]

// tag::RDX-140[]
export interface SpacesLeftAction<SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.SPACES_LEFT;
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>
  meta?: ActionMeta<MetaType>;
}
// end::RDX-140[]

// tag::RDX-142[]
export interface ErrorLeavingSpacesAction<MembershipType extends Membership<CustomType>, CustomType, MetaType> {
  type: typeof MembershipActionType.ERROR_LEAVING_SPACES;
  payload: MembershipError<MembershipType, CustomType>;
  meta?: ActionMeta<MetaType>;
  error: true;
}
// end::RDX-142[]

// tag::RDX-115[]
export interface UserAddedToSpaceEventAction<CustomType> {
  type: typeof MembershipActionType.USER_ADDED_TO_SPACE_EVENT;
  payload: MembershipEventMessage<CustomType>;
}
// end::RDX-115[]

// tag::RDX-116[]
export interface UserRemovedFromSpaceEventAction<CustomType> {
  type: typeof MembershipActionType.USER_REMOVED_FROM_SPACE_EVENT;
  payload: MembershipEventMessage<CustomType>;
}
// end::RDX-116[]

// tag::RDX-117[]
export interface UserMembershipUpdatedOnSpaceEventAction<CustomType> {
  type: typeof MembershipActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE_EVENT;
  payload: MembershipEventMessage<CustomType>;
}
// end::RDX-117[]

export type MembershipActions<SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType> =
| FetchingMembershipsAction<MetaType>
| MembershipsRetrievedAction<SpaceType, CustomType, MetaType>
| ErrorFetchingMembershipsAction<MetaType>
| UpdatingMembershipAction<MembershipType, CustomType, MetaType>
| MembershipUpdatedAction<SpaceType, MembershipType, CustomType, MetaType>
| ErrorUpdatingMembershipAction<MembershipType, CustomType, MetaType>
| JoiningSpacesAction<MembershipType, CustomType, MetaType>
| SpacesJoinedAction<SpaceType, MembershipType, CustomType, MetaType>
| ErrorJoiningSpacesAction<MembershipType, CustomType, MetaType>
| LeavingSpacesAction<MembershipType, CustomType, MetaType>
| SpacesLeftAction<SpaceType, MembershipType, CustomType, MetaType>
| ErrorLeavingSpacesAction<MembershipType, CustomType, MetaType>;

export type MembershipListenerActions<CustomType> =
  | UserAddedToSpaceEventAction<CustomType>
  | UserRemovedFromSpaceEventAction<CustomType>
  | UserMembershipUpdatedOnSpaceEventAction<CustomType>;
