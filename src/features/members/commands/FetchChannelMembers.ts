import { Dispatch } from 'redux';
import {
  ChannelMembersRetrievedAction,
  ErrorFetchingChannelMembersAction,
  FetchingChannelMembersAction,
  FetchChannelMembersError,
  FetchChannelMembersSuccess,
  FetchChannelMembersRequest,
} from '../ChannelMembersActions';
import { ChannelMembersActionType } from '../ChannelMembersActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingChannelMembers = <Meta extends ActionMeta>(
  payload: FetchChannelMembersRequest,
  meta?: Meta
): FetchingChannelMembersAction<Meta> => ({
  type: ChannelMembersActionType.FETCHING_CHANNEL_MEMBERS,
  payload,
  meta,
});

export const channelMembersRetrieved = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchChannelMembersSuccess<MembershipCustom, UserCustom>,
  meta?: Meta
): ChannelMembersRetrievedAction<MembershipCustom, UserCustom, Meta> => ({
  type: ChannelMembersActionType.CHANNEL_MEMBERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingChannelMembers = <Meta extends ActionMeta>(
  payload: FetchChannelMembersError,
  meta?: Meta
): ErrorFetchingChannelMembersAction<Meta> => ({
  type: ChannelMembersActionType.ERROR_FETCHING_CHANNEL_MEMBERS,
  payload,
  meta,
  error: true,
});

export const fetchChannelMembers = <
  MembershipCustom extends ObjectsCustom,
  UserCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchChannelMembersRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingChannelMembers<Meta>(request, meta));

      pubnub.api.objects.getChannelMembers<MembershipCustom, UserCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingChannelMembers<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response,
              status,
            };

            dispatch(
              channelMembersRetrieved<MembershipCustom, UserCustom, Meta>(
                payload,
                meta
              )
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ChannelMembersActionType.FETCH_CHANNEL_MEMBERS_COMMAND;

  return thunkFunction;
};
