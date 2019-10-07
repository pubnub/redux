export interface SpaceListInput {
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

export interface SpaceState {
  data: object[];
  error: string;
  space: object;
}

export interface CreateSpaceInput {
  description?: string;
  custom?: object;
  include?: object;
}
