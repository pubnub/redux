export interface Membership {
  userId: string;
  spaces: MembershipList;
  custom?: object;
  include?: {
    customFields?: boolean;
  };
}

export interface MembershipResult {
  id: string;
  spaces: MembershipList;
}

export type MembershipList = { id: string }[];
