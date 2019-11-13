import { Dispatch } from 'redux';
import {
  FetchingMembershipAction,
  FetchMembershipRequest,
  MembershipRetrievedAction,
  FetchMembershipSuccess,
  ErrorFetchingMembershipAction,
  FetchMembershipError,
  FetchMembershipResponse,
  Membership,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';

export const fetchingMembership = <Meta extends ActionMeta>(
  payload: FetchMembershipRequest,
  meta?: Meta
): FetchingMembershipAction<Meta> => ({
  type: MembershipActionType.FETCHING_MEMBERSHIP,
  payload,
  meta,
});

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

export const errorFetchingMembership = <Meta extends ActionMeta>(
  payload: FetchMembershipError,
  meta?: Meta
): ErrorFetchingMembershipAction<Meta> => ({
  type: MembershipActionType.ERROR_FETCHING_MEMBERSHIP,
  payload,
  meta,
  error: true,
});

export const fetchMemberships = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
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
        (
          status: PubNubApiStatus,
          response: FetchMembershipResponse<MembershipType>
        ) => {
          if (status.error) {
            let payload: FetchMembershipError = {
              request,
              status,
            };

            dispatch(errorFetchingMembership<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMembershipSuccess<MembershipType> = {
              request,
              response,
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
