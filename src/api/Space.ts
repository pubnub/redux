
// tag::RDX-025[]
export interface Space {
  id: string;
  name: string;
  description?: string;
  email?: string;
  externalId?: string;
  custom?: object;
}
// end::RDX-025[]

// tag::RDX-149[]
export interface SpaceInput {
  include?: {
    customFields?: boolean;
  };
}
// end::RDX-149[]

// tag::RDX-150[]
export interface SpaceOutput extends Space {}
// end::RDX-150[]

// tag::RDX-148[]
export interface SpaceState {
  byId: {
    [spaceId: string]: Space
  }
};
// end::RDX-148[]
