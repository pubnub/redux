import { User } from './User';

// tag::RDX-000[]
export interface MembersOptions {
  include?: {
    customFields?: boolean;
    userFields: boolean;
    customUserFields: boolean;
    totalCount: boolean;
  };
}
// end::RDX-000[]

// tag::RDX-001[]
export interface Members {
  spaceId: string;
  users: MembersList;
  custom?: object;
}
// end::RDX-001[]

// tag::RDX-002[]
export interface MembersResult {
  id: string;
  users: MembersList;
}
// end::RDX-002[]

// tag::RDX-003[]
export type MembersList = { id: string; user?: User }[];
// end::RDX-003[]
