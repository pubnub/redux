import { Dispatch } from 'redux';
import {
  SettingMembershipsAction,
  MembershipsSetAction,
  SetMembershipsSuccess,
  ErrorSettingMembershipsAction,
  SetMembershipsError,
  SetMembershipsRequest,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const settingMemberships = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsRequest<ChannelCustom>,
  meta?: Meta
): SettingMembershipsAction<ChannelCustom, Meta> => ({
  type: MembershipActionType.SETTING_MEMBERSHIPS,
  payload,
  meta,
});

export const membershipsSet = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsSuccess<MembershipCustom, ChannelCustom>,
  meta?: Meta
): MembershipsSetAction<MembershipCustom, ChannelCustom, Meta> => ({
  type: MembershipActionType.MEMBERSHIPS_SET,
  payload,
  meta,
});

export const errorSettingMemberships = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsError<ChannelCustom>,
  meta?: Meta
): ErrorSettingMembershipsAction<ChannelCustom, Meta> => ({
  type: MembershipActionType.ERROR_SETTING_MEMBERSHIPS,
  payload,
  meta,
  error: true,
});

export const setMemberships = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: SetMembershipsRequest<ChannelCustom>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(settingMemberships<ChannelCustom, Meta>(request, meta));

      pubnub.api.objects.setMemberships<MembershipCustom, ChannelCustom>(
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
              errorSettingMemberships<ChannelCustom, Meta>(payload, meta)
            );
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            dispatch(
              membershipsSet<MembershipCustom, ChannelCustom, Meta>(
                payload,
                meta
              )
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.SET_MEMBERSHIPS_COMMAND;

  return thunkFunction;
};
