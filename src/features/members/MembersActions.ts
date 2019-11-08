import { MembersActionType } from './MembersActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';
import { ObjectsCustom, AnyCustom } from '../../foundations/ObjectsCustom';
import { ActionMeta } from '../../foundations/ActionMeta';
import { User, AnyUser } from '../user/UserActions';

export interface Members<CustomMemberFields extends ObjectsCustom  = AnyCustom, ReceivedUser extends User<ObjectsCustom> = AnyUser> {
  id: string;
  custom?: CustomMemberFields;
  user?: ReceivedUser,
  created?: string,
  updated?: string,
  eTag?: string,
}

export interface AnyMembers extends Members<AnyCustom, User<ObjectsCustom>> {}

export interface MemberPage {
  next?: string;
  prev?: string;
}

// tag::RDX-000[]
export interface MembersFetchRequestOptions {
  limit?: number,
  page?: MemberPage,
  include?: {
    customFields?: boolean;
    userFields?: boolean;
    customUserFields?: boolean;
    totalCount?: boolean;
  };
}
// end::RDX-000[]

// // tag::RDX-001[]
export interface FetchMembersRequest extends MembersFetchRequestOptions {
  spaceId: string;
}
// // end::RDX-001[]

// // tag::RDX-002[]
export interface FetchMembersResponse<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> {
  status: string;
  data: ReceivedMembers[];
}
// // end::RDX-002[]

export interface FetchMembersSuccess<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> {
  request: FetchMembersRequest;
  response: FetchMembersResponse<ReceivedMembers>;
  status: PubNubApiStatus;
}

export interface FetchMembersError {
  request: FetchMembersRequest;
  status: PubNubApiStatus;
}

export type MembersRequest<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> =  {
  spaceId: string,
  users: ReceivedMembers[],
};

export interface MembersResponse<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> {
  status: string;
  data: ReceivedMembers[];
}

export interface MembersSuccess<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> {
  request: MembersRequest<ReceivedMembers>;
  response: MembersResponse<ReceivedMembers>;
  status: PubNubApiStatus;
}

export interface MembersError<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>> {
  request: MembersRequest<ReceivedMembers>;
  status: PubNubApiStatus;
}

// tag::RDX-118[]
export interface FetchingMembersAction<Meta> {
  type: typeof MembersActionType.FETCHING_MEMBERS;
  payload: FetchMembersRequest;
  meta?: Meta;
}
// end::RDX-118[]

// tag::RDX-119[]
export interface MembersRetrievedAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
  type: typeof MembersActionType.MEMBERS_RETRIEVED;
  payload: FetchMembersSuccess<ReceivedMembers>;
  meta?: Meta;
}
// end::RDX-119[]
  
  // tag::RDX-120[]
  export interface ErrorFetchingMembersAction<Meta> {
    type: typeof MembersActionType.ERROR_FETCHING_MEMBERS;
    payload: FetchMembersError;
    meta?: Meta;
    error: true;
  }
  // end::RDX-120[]
  
  // tag::RDX-122[]
  export interface UpdatingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.UPDATING_MEMBERS;
    payload: MembersRequest<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-122[]
  
  // tag::RDX-121[]
  export interface MembersUpdatedAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.MEMBERS_UPDATED;
    payload: MembersSuccess<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-121[]
  
  // tag::RDX-123[]
  export interface ErrorUpdatingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.ERROR_UPDATING_MEMBERS;
    payload: MembersError<ReceivedMembers>;
    meta?: Meta;
    error: true;
  }
  // end::RDX-123[]
  
  // tag::RDX-125[]
  export interface AddingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.ADDING_MEMBERS;
    payload: MembersRequest<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-125[]
  
  // tag::RDX-124[]
  export interface MembersAddedAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.MEMBERS_ADDED;
    payload: MembersSuccess<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-124[]
  
  // tag::RDX-126[]
  export interface ErrorAddingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.ERROR_ADDING_MEMBERS;
    payload: MembersError<ReceivedMembers>;
    meta?: Meta;
    error: true;
  }
  // end::RDX-126[]
  
  // tag::RDX-128[]
  export interface RemovingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.REMOVING_MEMBERS;
    payload: MembersRequest<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-128[]
  
  // tag::RDX-127[]
  export interface MembersRemovedAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.MEMBERS_REMOVED;
    payload: MembersSuccess<ReceivedMembers>;
    meta?: Meta;
  }
  // end::RDX-127[]
  
  // tag::RDX-129[]
  export interface ErrorRemovingMembersAction<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> {
    type: typeof MembersActionType.ERROR_REMOVING_MEMBERS;
    payload: MembersError<ReceivedMembers>;
    meta?: Meta;
    error: true;
  }
  // end::RDX-129[]
  
export type MembersActions<ReceivedMembers extends Members<ObjectsCustom, User<ObjectsCustom>>, Meta extends ActionMeta> =
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