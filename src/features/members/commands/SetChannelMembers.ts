import { Dispatch } from 'redux';
import {
  SettingChannelMembersAction,
  ChannelMembersSetAction,
  ErrorSettingChannelMembersAction,
  SetChannelMembersError,
  SetChannelMembersSuccess,
  SetChannelMembersRequest,
} from '../ChannelMembersActions';
import { ChannelMembersActionType } from '../ChannelMembersActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const settingChannelMembers = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelMembersRequest<UserCustom>,
  meta?: Meta
): SettingChannelMembersAction<UserCustom, Meta> => ({
  type: ChannelMembersActionType.SETTING_CHANNEL_MEMBERS,
  payload,
  meta,
});

export const channelMembersSet = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelMembersSuccess<MembershipCustom, UserCustom>,
  meta?: Meta
): ChannelMembersSetAction<MembershipCustom, UserCustom, Meta> => ({
  type: ChannelMembersActionType.CHANNEL_MEMBERS_SET,
  payload,
  meta,
});

export const errorSettingChannelMembers = <
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetChannelMembersError<UserCustom>,
  meta?: Meta
): ErrorSettingChannelMembersAction<UserCustom, Meta> => ({
  type: ChannelMembersActionType.ERROR_SETTING_CHANNEL_MEMBERS,
  payload,
  meta,
  error: true,
});

export const setChannelMembers = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: SetChannelMembersRequest<MembershipCustom>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(settingChannelMembers(request, meta));

      pubnub.api.objects.setChannelMembers<MembershipCustom, UserCustom>(
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
              errorSettingChannelMembers<MembershipCustom, Meta>(payload, meta)
            );
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(
              channelMembersSet<MembershipCustom, UserCustom, Meta>(
                payload,
                meta
              )
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ChannelMembersActionType.SET_CHANNEL_MEMBERS_COMMAND;

  return thunkFunction;
};
