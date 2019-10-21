import { User } from './User';

export interface MembersOptions {
  include?: {
    customFields?: boolean;
    userFields: boolean;
    customUserFields: boolean;
    totalCount: boolean;
  };
}

export interface Members {
  spaceId: string;
  users: MembersList;
  custom?: object;
}

export interface MembersResult {
  id: string;
  users: MembersList;
}

export type MembersList = { id: string; user?: User }[];
