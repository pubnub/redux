export interface Members {
  userId: string;
  spaces: MembersList;
  custom?: object;
  include?: {
    customFields?: boolean;
  };
}

export interface MembersResult {
  id: string;
  spaces: MembersList;
}

export type MembersList = { id: string }[];
