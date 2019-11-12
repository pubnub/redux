import { Dispatch } from 'redux';
import {
  JoiningSpacesAction,
  MembershipRequest,
  Membership,
  SpacesJoinedAction,
  MembershipSuccess,
  ErrorJoiningSpacesAction,
  MembershipError,
  MembershipResponse,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from '../../../features/space/SpaceActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';

export const joiningSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipRequest<MembershipType>,
  meta?: Meta
): JoiningSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.JOINING_SPACES,
  payload,
  meta,
});

export const spacesJoined = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipSuccess<MembershipType>,
  meta?: Meta
): SpacesJoinedAction<MembershipType, Meta> => ({
  type: MembershipActionType.SPACES_JOINED,
  payload,
  meta,
});

export const errorJoiningSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembershipError<MembershipType>,
  meta?: Meta
): ErrorJoiningSpacesAction<MembershipType, Meta> => ({
  type: MembershipActionType.ERROR_JOINING_SPACES,
  payload,
  meta,
  error: true,
});

export const joinSpaces = <
  MembershipType extends Membership<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta = never
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
      dispatch(joiningSpaces<MembershipType, Meta>(request, meta));

      pubnub.api.joinSpaces(
        {
          ...request,
        },
        (
          status: PubNubApiStatus,
          response: MembershipResponse<MembershipType>
        ) => {
          if (status.error) {
            let payload: MembershipError<MembershipType> = {
              request,
              status,
            };

            dispatch(errorJoiningSpaces<MembershipType, Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: MembershipSuccess<MembershipType> = {
              request,
              response,
              status,
            };

            dispatch(spacesJoined<MembershipType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.JOIN_SPACES_COMMAND;

  return thunkFunction;
};
