import { UsersListInput } from './User';

export interface MembershipListInput extends UsersListInput {}

export interface MemberList {
  id: string;
  custom?: object;
}
