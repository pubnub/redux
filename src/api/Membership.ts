import { Space } from 'api/Space';

export interface MembershipOptions {
  include?: {
    customFields?: boolean;
    spaceFields?: boolean;
    customSpaceFields?: boolean;
    totalCount?: boolean;
  };
}

export interface Membership {
  userId: string;
  spaces: MembershipList;
  custom?: object;
}

export interface MembershipResult {
  id: string;
  spaces: MembershipList;
}

export type MembershipList = { id: string; space?: Space }[];
