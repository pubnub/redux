export interface UsersListInput {
  limit?: number;
  page?: {
    next?: string;
    prev?: string;
  };
  include?: {
    totalCount?: boolean;
    customFields?: boolean;
  };
}

export interface UserInitialState {
  data: object[];
  error: string;
  user: object;
}

export interface createUserInput {
  externalId?: string;
  profileUrl?: string;
  email?: string;
  custom?: object;
  include?: object;
}
