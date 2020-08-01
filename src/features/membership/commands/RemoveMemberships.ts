import { Dispatch } from 'redux';
import {
  RemovingChannelsAction,
  MembershipsRemovedAction,
  SetMembershipsSuccess,
  ErrorRemovingMembershipsAction,
  SetMembershipsError,
  SetMembershipsRequest,
  RemoveMembershipsRequest,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';
import { ObjectCustom } from 'pubnub';

export const removingMemberships = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsRequest<ChannelCustom>,
  meta?: Meta
): RemovingChannelsAction<ChannelCustom, Meta> => ({
  type: MembershipActionType.REMOVING_MEMBERSHIPS,
  payload,
  meta,
});

export const membershipsRemoved = <
  MembershipCustom extends ObjectCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsSuccess<MembershipCustom, ChannelCustom>,
  meta?: Meta
): MembershipsRemovedAction<MembershipCustom, ChannelCustom, Meta> => ({
  type: MembershipActionType.MEMBERSHIPS_REMOVED,
  payload,
  meta,
});

export const errorRemovingMemberships = <
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: SetMembershipsError<ChannelCustom>,
  meta?: Meta
): ErrorRemovingMembershipsAction<ChannelCustom, Meta> => ({
  type: MembershipActionType.ERROR_REMOVING_MEMBERSHIPS,
  payload,
  meta,
  error: true,
});

export const removeMemberships = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: RemoveMembershipsRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<
      MembershipsRemovedAction<MembershipCustom, ChannelCustom, Meta>
    >((resolve, reject) => {
      dispatch(removingMemberships<ChannelCustom, Meta>(request, meta));

      pubnub.api.objects.removeMemberships<MembershipCustom, ChannelCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorRemovingMemberships(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            const action = membershipsRemoved<
              MembershipCustom,
              ChannelCustom,
              Meta
            >(payload, meta);

            dispatch(action);
            resolve(action);
          }
        }
      );
    });

  thunkFunction.type = MembershipActionType.REMOVE_MEMBERSHIPS_COMMAND;

  return thunkFunction;
};
