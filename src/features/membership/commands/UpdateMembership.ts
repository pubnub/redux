import { UpdatingMembershipAction, MembershipRequest, MembershipUpdatedAction, MembershipSuccess, ErrorUpdatingMembershipAction, MembershipError, MembershipResponse, Membership } from '../MembershipActions';
import { ActionMeta } from '../../../common/ActionMeta';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const updatingMemberships = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipRequest<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): UpdatingMembershipAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.UPDATING_MEMBERSHIP,
  payload,
  meta,
});

export const membershipUpdated = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): MembershipUpdatedAction<SpaceType, MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.MEMBERSHIP_UPDATED,
  payload,
  meta,
});

export const errorUpdatingMembership = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipError<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): ErrorUpdatingMembershipAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.ERROR_UPDATING_MEMBERSHIP,
  payload,
  meta,
  error: true,
});

export const updateMembership = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  request: MembershipRequest<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingMemberships<MembershipType, CustomType, MetaType>(request, meta));

      pubnub.api.updateMembership(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembershipResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: MembershipError<MembershipType, CustomType> = {
              request,
              status,
            };

            dispatch(errorUpdatingMembership<MembershipType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: MembershipSuccess<SpaceType, MembershipType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membershipUpdated<SpaceType, MembershipType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.UPDATE_MEMBERSHIP_COMMAND;

  return thunkFunction;
};
