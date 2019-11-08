import {
  MembersRetrievedAction,
  ErrorFetchingMembersAction,
  FetchingMembersAction,
  FetchMembersRequest,
  FetchMembersResponse,
  FetchMembersError,
  FetchMembersSuccess,
  Members
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';
import { Space } from '../../space/SpaceActions';

export const fetchingMembers = <Meta extends ActionMeta>(
  payload: FetchMembersRequest,
  meta?: Meta,
): FetchingMembersAction<Meta> => ({
  type: MembersActionType.FETCHING_MEMBERS,
  payload,
  meta,
});

export const membersRetrieved = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: FetchMembersSuccess<MembersType>,
  meta?: Meta,
): MembersRetrievedAction<MembersType, Meta> => ({
  type: MembersActionType.MEMBERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMembers = <Meta extends ActionMeta>(
  payload:FetchMembersError,
  meta?: Meta,
): ErrorFetchingMembersAction<Meta> => ({
  type: MembersActionType.ERROR_FETCHING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const fetchMembers = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta = never>(
  request: FetchMembersRequest,
  meta?: Meta,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMembers<Meta>(request, meta));

      pubnub.api.getMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: FetchMembersResponse<MembersType>) => {
          if (status.error) {
            let payload: FetchMembersError = {
              request,
              status,
            };

            dispatch(errorFetchingMembers<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMembersSuccess<MembersType> = {
              request,
              response,
              status,
            };

            dispatch(membersRetrieved<MembersType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.FETCH_MEMBERS_COMMAND;

  return thunkFunction;
};
