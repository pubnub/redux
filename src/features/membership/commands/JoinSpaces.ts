import { ActionMeta } from 'common/ActionMeta';
import { JoiningSpacesAction, MembershipRequest, Membership, SpacesJoinedAction, MembershipSuccess, ErrorJoiningSpacesAction, MembershipError, MembershipResponse } from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { Space } from 'features/space/SpaceActions';
import { PubNubApiStatus } from 'common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const joiningSpaces = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipRequest<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): JoiningSpacesAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.JOINING_SPACES,
  payload,
  meta,
});

export const spacesJoined = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipSuccess<SpaceType, MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): SpacesJoinedAction<SpaceType, MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.SPACES_JOINED,
  payload,
  meta,
});

export const errorJoiningSpaces = <MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  payload: MembershipError<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
): ErrorJoiningSpacesAction<MembershipType, CustomType, MetaType> => ({
  type: MembershipActionType.ERROR_JOINING_SPACES,
  payload,
  meta,
  error: true,
});

export const joinSpaces = <SpaceType extends Space, MembershipType extends Membership<CustomType>, CustomType, MetaType>(
  request: MembershipRequest<MembershipType, CustomType>,
  meta?: ActionMeta<MetaType>,
) => {
  const thunkFunction = (dispatch: Dispatch, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(joiningSpaces<MembershipType, CustomType, MetaType>(request, meta));

      pubnub.api.joinSpaces(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembershipResponse<SpaceType, CustomType>) => {
          if (status.error) {
            let payload: MembershipError<MembershipType, CustomType> = {
              request,
              status,
            };

            dispatch(errorJoiningSpaces<MembershipType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: MembershipSuccess<SpaceType, MembershipType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(spacesJoined<SpaceType, MembershipType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.JOIN_SPACES_COMMAND;

  return thunkFunction;
};
