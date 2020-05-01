import { Dispatch } from 'redux';
import {
  FetchingMembershipAction,
  MembershipRetrievedAction,
  FetchMembershipSuccess,
  ErrorFetchingMembershipAction,
  FetchMembershipError,
  FetchMembershipRequest,
  Membership,
  MembershipResponse,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';
import { Space } from 'features/space/SpaceActions';

// tag::RDX-function-memberships-fetch[]
export const fetchingMembership = <Meta extends ActionMeta>(
  payload: FetchMembershipRequest,
  meta?: Meta
): FetchingMembershipAction<Meta> => ({
  type: MembershipActionType.FETCHING_MEMBERSHIP,
  payload,
  meta,
});
// end::RDX-function-memberships-fetch[]

// tag::RDX-function-memberships-fetch-success[]
export const membershipRetrieved = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: FetchMembershipSuccess<MembershipType>,
  meta?: Meta
): MembershipRetrievedAction<MembershipType, Meta> => ({
  type: MembershipActionType.MEMBERSHIP_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-memberships-fetch-success[]

// tag::RDX-function-memberships-fetch-error[]
export const errorFetchingMembership = <Meta extends ActionMeta>(
  payload: FetchMembershipError,
  meta?: Meta
): ErrorFetchingMembershipAction<Meta> => ({
  type: MembershipActionType.ERROR_FETCHING_MEMBERSHIP,
  payload,
  meta,
  error: true,
});
// end::RDX-function-memberships-fetch-error[]

// tag::RDX-command-memberships-fetch[]
export const fetchMemberships = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchMembershipRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMembership<Meta>(request, meta));

      pubnub.api.getMemberships(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingMembership<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as MembershipResponse<MembershipType>,
              status,
            };

            dispatch(membershipRetrieved<MembershipType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.FETCH_MEMBERSHIP_COMMAND;

  return thunkFunction;
};
// end::RDX-command-memberships-fetch[]
