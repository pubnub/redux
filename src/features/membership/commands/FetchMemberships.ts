import {
  FetchingMembershipsAction,
  FetchMembershipRequest,
  MembershipsRetrievedAction,
  FetchMembershipSuccess,
  ErrorFetchingMembershipsAction,
  FetchMembershipError,
  FetchMembershipResponse,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { ActionMeta } from '../../../common/ActionMeta';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const fetchingMemberships = <MetaType>(
  payload: FetchMembershipRequest,
  meta?: ActionMeta<MetaType>,
): FetchingMembershipsAction<MetaType> => ({
  type: MembershipActionType.FETCHING_MEMBERSHIP,
  payload,
  meta,
});

export const membershipsRetrieved = <SpaceType extends Space, CustomType, MetaType>(
  payload: FetchMembershipSuccess<SpaceType, CustomType>,
  meta?: ActionMeta<MetaType>,
): MembershipsRetrievedAction<SpaceType, CustomType, MetaType> => ({
  type: MembershipActionType.MEMBERSHIP_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMemberships = <MetaType>(
  payload: FetchMembershipError,
  meta?: ActionMeta<MetaType>,
): ErrorFetchingMembershipsAction<MetaType> => ({
  type: MembershipActionType.ERROR_FETCHING_MEMBERSHIP,
  payload,
  meta,
  error: true,
});

export const fetchMemberships = <SpaceType extends Space, CustomType, MetaType>(
  request: FetchMembershipRequest,
  meta?: ActionMeta<MetaType>,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMemberships<MetaType>(request, meta));

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

            dispatch(errorFetchingMemberships<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMembershipSuccess<SpaceType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membershipsRetrieved<SpaceType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.FETCH_MEMBERSHIP_COMMAND;

  return thunkFunction;
};
