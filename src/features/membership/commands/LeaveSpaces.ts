import { Dispatch } from 'redux';
import {
  LeavingSpacesAction,
  SpacesLeftAction,
  MembershipSuccess,
  ErrorLeavingSpacesAction,
  MembershipError,
  Membership,
  MembershipRequest,
  MembershipResponse,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';
import { Space } from 'features/space/SpaceActions';

// tag::RDX-function-spaces-leave[]
export const leavingSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipRequest<MembershipType>,
  meta?: Meta
): LeavingSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.LEAVING_SPACES,
  payload,
  meta,
});
// end::RDX-function-spaces-leave[]

// tag::RDX-function-spaces-leave-success[]
export const spacesLeft = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipSuccess<MembershipType>,
  meta?: Meta
): SpacesLeftAction<MembershipType, Meta> => ({
  type: MembershipActionType.SPACES_LEFT,
  payload,
  meta,
});
// end::RDX-function-spaces-leave-success[]

// tag::RDX-function-spaces-leave-error[]
export const errorLeavingSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipError<MembershipType>,
  meta?: Meta
): ErrorLeavingSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.ERROR_LEAVING_SPACES,
  payload,
  meta,
  error: true,
});
// end::RDX-function-spaces-leave-error[]

// tag::RDX-command-spaces-leave[]
export const leaveSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta = AnyMeta
>(
  request: MembershipRequest<MembershipType>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(leavingSpaces<MembershipType, Meta>(request, meta));

      pubnub.api.leaveSpaces(
        {
          ...request,
          spaces: request.spaces.map((space) => space.id),
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorLeavingSpaces(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as MembershipResponse<MembershipType>,
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
// end::RDX-command-spaces-leave[]
