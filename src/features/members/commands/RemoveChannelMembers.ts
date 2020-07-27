import { Dispatch } from 'redux';
import {
  RemovingChannelMembersAction,
  ChannelMembersRemovedAction,
  ErrorRemovingChannelMembersAction,
  SetChannelMembersError,
  SetChannelMembersSuccess,
  RemoveChannelMembersRequest,
} from '../ChannelMembersActions';
import { ChannelMembersActionType } from '../ChannelMembersActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const removingChannelMembers = <Meta extends ActionMeta>(
  payload: RemoveChannelMembersRequest,
  meta?: Meta
): RemovingChannelMembersAction<Meta> => ({
  type: ChannelMembersActionType.REMOVING_CHANNEL_MEMBERS,
  payload,
  meta,
});

export const channelMembersRemoved = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelMembersSuccess<MembershipCustom, UserCustom>,
  meta?: Meta
): ChannelMembersRemovedAction<MembershipCustom, UserCustom, Meta> => ({
  type: ChannelMembersActionType.CHANNEL_MEMBERS_REMOVED,
  payload,
  meta,
});

export const errorRemovingChannelMembers = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelMembersError<UserCustom>,
  meta?: Meta
): ErrorRemovingChannelMembersAction<UserCustom, Meta> => ({
  type: ChannelMembersActionType.ERROR_REMOVING_CHANNEL_MEMBERS,
  payload,
  meta,
  error: true,
});

export const removeChannelMembers = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: RemoveChannelMembersRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(removingChannelMembers<Meta>(request, meta));

      pubnub.api.objects.removeChannelMembers<MembershipCustom, UserCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(
              errorRemovingChannelMembers<MembershipCustom, Meta>(payload, meta)
            );
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(
              channelMembersRemoved<MembershipCustom, UserCustom, Meta>(
                payload,
                meta
              )
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ChannelMembersActionType.REMOVE_CHANNEL_MEMBERS_COMMAND;

  return thunkFunction;
};
