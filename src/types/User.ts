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

export interface UserStatusPayload {
  category: string;
  error: boolean;
  errorData: {
    status: number;
    error: {
      message: string;
      source: string;
    };
  };
  operation: string;
  statusCode: number;
  message: string;
  type: string;
}

export interface UserResponsePayload {
  status: number;
  data: User;
}
