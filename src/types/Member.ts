export interface Members {
  spaceId: string;
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
