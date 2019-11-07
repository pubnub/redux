import {
  FetchingMembershipAction,
  FetchMembershipRequest,
  MembershipRetrievedAction,
  FetchMembershipSuccess,
  ErrorFetchingMembershipAction,
  FetchMembershipError,
  FetchMembershipResponse,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const fetchingMembership = <MetaType>(
  payload: FetchMembershipRequest,
  meta?: MetaType,
): FetchingMembershipAction<MetaType> => ({
  type: MembershipActionType.FETCHING_MEMBERSHIP,
  payload,
  meta,
});

export const membershipRetrieved = <SpaceType extends Space, CustomType, MetaType>(
  payload: FetchMembershipSuccess<SpaceType, CustomType>,
  meta?: MetaType,
): MembershipRetrievedAction<SpaceType, CustomType, MetaType> => ({
  type: MembershipActionType.MEMBERSHIP_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMembership = <MetaType>(
  payload: FetchMembershipError,
  meta?: MetaType,
): ErrorFetchingMembershipAction<MetaType> => ({
  type: MembershipActionType.ERROR_FETCHING_MEMBERSHIP,
  payload,
  meta,
  error: true,
});

export const fetchMemberships = <SpaceType extends Space, CustomType, MetaType>(
  request: FetchMembershipRequest,
  meta?: MetaType,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMembership<MetaType>(request, meta));

      pubnub.api.getMemberships(
        {
          ...request
        },
        (status: PubNubApiStatus, response: FetchMembershipResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: FetchMembershipError = {
              request,
              status,
            };

            dispatch(errorFetchingMembership<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMembershipSuccess<SpaceType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membershipRetrieved<SpaceType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.FETCH_MEMBERSHIP_COMMAND;

  return thunkFunction;
};
