import { LeavingSpacesAction, MembershipRequest, SpacesLeftAction, MembershipSuccess, ErrorLeavingSpacesAction, MembershipError, MembershipResponse, Membership } from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const leavingSpaces = <MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembershipRequest<MembershipType>,
  meta?: Meta,
): LeavingSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.LEAVING_SPACES,
  payload,
  meta,
});

export const spacesLeft = <MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembershipSuccess<MembershipType>,
  meta?: Meta,
): SpacesLeftAction<MembershipType, Meta> => ({
  type: MembershipActionType.SPACES_LEFT,
  payload,
  meta,
});

export const errorLeavingSpaces = <MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembershipError<MembershipType>,
  meta?: Meta,
): ErrorLeavingSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.ERROR_LEAVING_SPACES,
  payload,
  meta,
  error: true,
});

export const leaveSpaces = <MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta = never>(
  request: MembershipRequest<MembershipType>,
  meta?: Meta,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(leavingSpaces<MembershipType, Meta>(request, meta));

      pubnub.api.leaveSpaces(
        {
          ...request
        },
        (status: PubNubApiStatus, response: MembershipResponse<MembershipType>) => {
          if (status.error) {
            let payload: MembershipError<MembershipType> = {
              request,
              status,
            };

            dispatch(errorLeavingSpaces(payload, meta));
            reject(payload);
          } else {
            let payload: MembershipSuccess<MembershipType> = {
              request,
              response,
              status,
            };

            dispatch(spacesLeft<MembershipType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.LEAVE_SPACES_COMMAND;

  return thunkFunction;
};
