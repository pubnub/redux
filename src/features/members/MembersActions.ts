import { MembersActionType } from './MembersActionType.enum';
import { PubNubApiStatus } from '../../foundations/PubNubApi';
import { ObjectsCustom, AnyCustom } from 'foundations/ObjectsCustom';

export interface Member<CustomMemberFields extends ObjectsCustom> {
  userId: string;
  custom?: CustomMemberFields;
}

export interface AnyMember extends Member<AnyCustom> {}

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
    userFields: boolean;
    customUserFields: boolean;
    totalCount: boolean;
  };
}
// end::RDX-000[]

// // tag::RDX-001[]
export interface FetchMembersRequest extends MembersFetchRequestOptions {
  spaceId: string;
}
// // end::RDX-001[]

// // tag::RDX-002[]
export interface FetchMembersResponse<CustomType> {
  status: string;
  data: MembersResponseItem<CustomType>[];
}
// // end::RDX-002[]

export interface FetchMembersSuccess<CustomType> {
  request: FetchMembersRequest;
  response: FetchMembersResponse<CustomType>;
  status: PubNubApiStatus;
}

export interface FetchMembersError {
  request: FetchMembersRequest;
  status: PubNubApiStatus;
}

export type MembersResponseItem<CustomMembersFields, CustomUserFields> = {
  id: string,
  user: UserAddedToSpaceEventAction,
  custom?: {};
  created: string,
  updated: string,
  eTag: string,
};

export type MembersRequest =  {
  spaceId: string;
  users: Member[]
};

export interface MembersResponse {
  status: string;
  data: MembersResponseItem[];
}

export interface MembersSuccess {
  request: MembersRequest;
  response: MembersResponse;
  status: PubNubApiStatus;
}

export interface MembersError<MembersType, CustomType> {
  request: MembersRequest<MembersType, CustomType>;
  status: PubNubApiStatus;
}

// tag::RDX-118[]
export interface FetchingMembersAction<MetaType> {
  type: typeof MembersActionType.FETCHING_MEMBERS;
  payload: FetchMembersRequest;
  meta?: MetaType;
}
// end::RDX-118[]

// tag::RDX-119[]
export interface MembersRetrievedAction<UserType, CustomType, MetaType> {
  type: typeof MembersActionType.MEMBERS_RETRIEVED;
  payload: FetchMembersSuccess<UserType, CustomType>;
  meta?: MetaType;
}
// end::RDX-119[]
  
  // tag::RDX-120[]
  export interface ErrorFetchingMembersAction<MetaType> {
    type: typeof MembersActionType.ERROR_FETCHING_MEMBERS;
    payload: FetchMembersError;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-120[]
  
  // tag::RDX-122[]
  export interface UpdatingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.UPDATING_MEMBERS;
    payload: MembersRequest<MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-122[]
  
  // tag::RDX-121[]
  export interface MembersUpdatedAction<UserType, MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_UPDATED;
    payload: MembersSuccess<UserType, MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-121[]
  
  // tag::RDX-123[]
  export interface ErrorUpdatingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_UPDATING_MEMBERS;
    payload: MembersError<MembersType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-123[]
  
  // tag::RDX-125[]
  export interface AddingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.ADDING_MEMBERS;
    payload: MembersRequest<MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-125[]
  
  // tag::RDX-124[]
  export interface MembersAddedAction<UserType, MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_ADDED;
    payload: MembersSuccess<UserType, MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-124[]
  
  // tag::RDX-126[]
  export interface ErrorAddingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_ADDING_MEMBERS;
    payload: MembersError<MembersType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-126[]
  
  // tag::RDX-128[]
  export interface RemovingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.REMOVING_MEMBERS;
    payload: MembersRequest<MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-128[]
  
  // tag::RDX-127[]
  export interface MembersRemovedAction<UserType, MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_REMOVED;
    payload: MembersSuccess<UserType, MembersType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-127[]
  
  // tag::RDX-129[]
  export interface ErrorRemovingMembersAction<MembersType, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_REMOVING_MEMBERS;
    payload: MembersError<MembersType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-129[]
  
export type MembersActions<ReceivedUser, CustomUserFields, MembersType, CustomMemberFields, MetaType> =
| FetchingMembersAction<MetaType>
| MembersRetrievedAction<ReceivedUser, CustomUserFields, CustomMemberFields, MetaType>
| ErrorFetchingMembersAction<MetaType>
| UpdatingMembersAction<MembersType, CustomMemberFields, MetaType>
| MembersUpdatedAction<ReceivedUser, CustomUserFields, MembersType, CustomMemberFields, MetaType>
| ErrorUpdatingMembersAction<MembersType, CustomMemberFields, MetaType>
| AddingMembersAction<MembersType, CustomMemberFields, MetaType>
| MembersAddedAction<ReceivedUser, MembersType, CustomMemberFields, MetaType>
| ErrorAddingMembersAction<MembersType, CustomMemberFields, MetaType>
| RemovingMembersAction<MembersType, CustomMemberFields, MetaType>
| MembersRemovedAction<ReceivedUser, MembersType, CustomMemberFields, MetaType>
| ErrorRemovingMembersAction<MembersType, CustomMemberFields, MetaType>;