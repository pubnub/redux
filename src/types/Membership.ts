import { UsersListInput } from './User';

export interface MembershipState {
  user: object;
  error: string;
  data: object[];
}

export interface MembershipListInput extends UsersListInput {}

export interface MemberList {
  id: string;
  custom?: object;
}
