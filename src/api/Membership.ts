import { Space } from 'api/Space';

// tag::RDX-004[]
export interface MembershipOptions {
  include?: {
    customFields?: boolean;
    spaceFields?: boolean;
    customSpaceFields?: boolean;
    totalCount?: boolean;
  };
}
// end::RDX-004[]

// tag::RDX-005[]
export interface Membership {
  userId: string;
  spaces: MembershipList;
  custom?: object;
}
// end::RDX-005[]

// tag::RDX-006[]
export interface MembershipResult {
  id: string;
  spaces: MembershipList;
}
// end::RDX-006[]

// tag::RDX-007[]
export type MembershipList = { id: string; space?: Space }[];
// end::RDX-007[]
