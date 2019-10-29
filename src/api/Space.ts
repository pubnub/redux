// tag::RDX-025[]
export interface Space {
  id: string;
  name: string;
  description?: string;
  email?: string;
  externalId?: string;
  custom?: object;
  include?: {
    customFields?: boolean;
  };
}
// end::RDX-025[]
