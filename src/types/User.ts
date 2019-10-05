export interface User {
  id: string;
  name: string;
  externalId?: string;
  profileUrl?: string;
  email?: string;
  custom?: object;
}

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

export interface CreateUserInput extends User {
  include?: object;
}

export interface UserActionPayload {
  data: User;
  event: string;
  type: string;
}
