import { Dispatch } from 'redux';
import {
  FetchingMembershipsAction,
  MembershipsRetrievedAction,
  FetchMembershipsSuccess,
  ErrorFetchingMembershipsAction,
  FetchMembershipsError,
  FetchMembershipsRequest,
} from '../MembershipActions';
import { MembershipActionType } from '../MembershipActionType.enum';
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

export const fetchingMemberships = <Meta extends ActionMeta>(
  payload: FetchMembershipsRequest,
  meta?: Meta
): FetchingMembershipsAction<Meta> => ({
  type: MembershipActionType.FETCHING_MEMBERSHIPS,
  payload,
  meta,
});

export const membershipsRetrieved = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta
>(
  payload: FetchMembershipsSuccess<MembershipCustom, ChannelCustom>,
  meta?: Meta
): MembershipsRetrievedAction<MembershipCustom, ChannelCustom, Meta> => ({
  type: MembershipActionType.MEMBERSHIPS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMemberships = <Meta extends ActionMeta>(
  payload: FetchMembershipsError,
  meta?: Meta
): ErrorFetchingMembershipsAction<Meta> => ({
  type: MembershipActionType.ERROR_FETCHING_MEMBERSHIPS,
  payload,
  meta,
  error: true,
});

export const fetchMemberships = <
  MembershipCustom extends ObjectsCustom,
  ChannelCustom extends ObjectsCustom,
  Meta extends ActionMeta = AnyMeta
>(
  request: FetchMembershipsRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<
      MembershipsRetrievedAction<MembershipCustom, ChannelCustom, Meta>
    >((resolve, reject) => {
      dispatch(fetchingMemberships<Meta>(request, meta));

      pubnub.api.objects.getMemberships<MembershipCustom, ChannelCustom>(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorFetchingMemberships<Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response,
              status,
            };

            const action = membershipsRetrieved<
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

  thunkFunction.type = MembershipActionType.FETCH_MEMBERSHIPS_COMMAND;

  return thunkFunction;
};
