export interface User {
  id: string;
  name: string;
  externalId?: string;
  profileUrl?: string;
  email?: string;
  custom?: object;
  include?: {
    customFields?: boolean;
  };
}
