import { LeavingSpacesAction, MembershipRequest, SpacesLeftAction, MembershipSuccess, ErrorLeavingSpacesAction, MembershipError, MembershipResponse, Membership } from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';

export const leavingSpaces = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipRequest<MembershipType, CustomType>,
  meta?: MetaType,
): LeavingSpacesAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.LEAVING_SPACES,
  payload,
  meta,
});

export const spacesLeft = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>,
  meta?: MetaType,
): SpacesLeftAction<SpaceType, MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.SPACES_LEFT,
  payload,
  meta,
});

export const errorLeavingSpaces = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipError<MembershipType, CustomType>,
  meta?: MetaType,
): ErrorLeavingSpacesAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.ERROR_LEAVING_SPACES,
  payload,
  meta,
  error: true,
});

export const leaveSpaces = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  request: MembershipRequest<MembershipType, CustomType>,
  meta?: MetaType,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(leavingSpaces<MembershipType, CustomType, MetaType>(request, meta));

      pubnub.api.leaveSpaces(
        {
          ...request
        },
        (status: PubNubApiStatus, response: MembershipResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: MembershipError <MembershipType, CustomType> = {
              request,
              status,
            };

            dispatch(errorLeavingSpaces(payload, meta));
            reject(payload);
          } else {
            let payload: MembershipSuccess<SpaceType, MembershipType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(spacesLeft<SpaceType, MembershipType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.LEAVE_SPACES_COMMAND;

  return thunkFunction;
};
