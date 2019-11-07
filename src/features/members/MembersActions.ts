import { MembersActionType } from './MembersActionType.enum';
import { User, UserResponseItem } from '../../features/user/UserActions';
import { PubNubApiStatus } from '../../common/PubNubApi';

export interface Member<CustomType> {
  userId: string;
  custom?: CustomType;
}

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
export interface FetchMembersResponse<UserType extends User, CustomType> {
  status: string;
  data: MembersResponseItem<UserType, CustomType>[];
}
// // end::RDX-002[]

export interface FetchMembersSuccess<UserType extends User, CustomType> {
  request: FetchMembersRequest;
  response: FetchMembersResponse<UserType, CustomType>;
  status: PubNubApiStatus;
}

export interface FetchMembersError {
  request: FetchMembersRequest;
  status: PubNubApiStatus;
}

export type MembersResponseItem<UserType extends User, CustomType> = {
  id: string,
  user: UserResponseItem<UserType, CustomType>,
  custom?: CustomType;
  created: string,
  updated: string,
  eTag: string,
};

export type MembersRequest<MemberType extends Member<CustomType>, CustomType> =  {
  spaceId: string;
  users: MemberType[]
};

export interface MembersResponse<UserType extends User, CustomType> {
  status: string;
  data: MembersResponseItem<UserType, CustomType>[];
}

export interface MembersSuccess<UserType extends User, MemberType extends Member<CustomType>, CustomType> {
  request: MembersRequest<MemberType, CustomType>;
  response: MembersResponse<UserType, CustomType>;
  status: PubNubApiStatus;
}

export interface MembersError<MemberType extends Member<CustomType>, CustomType> {
  request: MembersRequest<MemberType, CustomType>;
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
export interface MembersRetrievedAction<UserType extends User, CustomType, MetaType> {
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
  export interface UpdatingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.UPDATING_MEMBERS;
    payload: MembersRequest<MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-122[]
  
  // tag::RDX-121[]
  export interface MembersUpdatedAction<UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_UPDATED;
    payload: MembersSuccess<UserType, MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-121[]
  
  // tag::RDX-123[]
  export interface ErrorUpdatingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_UPDATING_MEMBERS;
    payload: MembersError<MemberType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-123[]
  
  // tag::RDX-125[]
  export interface AddingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.ADDING_MEMBERS;
    payload: MembersRequest<MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-125[]
  
  // tag::RDX-124[]
  export interface MembersAddedAction<UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_ADDED;
    payload: MembersSuccess<UserType, MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-124[]
  
  // tag::RDX-126[]
  export interface ErrorAddingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_ADDING_MEMBERS;
    payload: MembersError<MemberType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-126[]
  
  // tag::RDX-128[]
  export interface RemovingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.REMOVING_MEMBERS;
    payload: MembersRequest<MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-128[]
  
  // tag::RDX-127[]
  export interface MembersRemovedAction<UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.MEMBERS_REMOVED;
    payload: MembersSuccess<UserType, MemberType, CustomType>;
    meta?: MetaType;
  }
  // end::RDX-127[]
  
  // tag::RDX-129[]
  export interface ErrorRemovingMembersAction<MemberType extends Member<CustomType>, CustomType, MetaType> {
    type: typeof MembersActionType.ERROR_REMOVING_MEMBERS;
    payload: MembersError<MemberType, CustomType>;
    meta?: MetaType;
    error: true;
  }
  // end::RDX-129[]
  
export type MembersActions<UserType extends User, MembersType extends Member<CustomType>, CustomType, MetaType> =
| FetchingMembersAction<MetaType>
| MembersRetrievedAction<UserType, CustomType, MetaType>
| ErrorFetchingMembersAction<MetaType>
| UpdatingMembersAction<MembersType, CustomType, MetaType>
| MembersUpdatedAction<UserType, MembersType, CustomType, MetaType>
| ErrorUpdatingMembersAction<MembersType, CustomType, MetaType>
| AddingMembersAction<MembersType, CustomType, MetaType>
| MembersAddedAction<UserType, MembersType, CustomType, MetaType>
| ErrorAddingMembersAction<MembersType, CustomType, MetaType>
| RemovingMembersAction<MembersType, CustomType, MetaType>
| MembersRemovedAction<UserType, MembersType, CustomType, MetaType>
| ErrorRemovingMembersAction<MembersType, CustomType, MetaType>;