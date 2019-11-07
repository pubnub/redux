import {
  MembersRetrievedAction,
  ErrorFetchingMembersAction,
  FetchingMembersAction,
  FetchMembersRequest,
  FetchMembersResponse,
  FetchMembersError,
  FetchMembersSuccess
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { User } from '../../../features/user/UserActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';

export const fetchingMembers = <MetaType>(
  payload: FetchMembersRequest,
  meta?: MetaType,
): FetchingMembersAction<MetaType> => ({
  type: MembersActionType.FETCHING_MEMBERS,
  payload,
  meta,
});

export const membersRetrieved = <UserType extends User, CustomType, MetaType>(
  payload: FetchMembersSuccess<UserType, CustomType>,
  meta?: MetaType,
): MembersRetrievedAction<UserType, CustomType, MetaType> => ({
  type: MembersActionType.MEMBERS_RETRIEVED,
  payload,
  meta,
});

export const errorFetchingMembers = <MetaType>(
  payload:FetchMembersError,
  meta?: MetaType,
): ErrorFetchingMembersAction<MetaType> => ({
  type: MembersActionType.ERROR_FETCHING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const fetchMembers = <UserType extends User, CustomType, MetaType>(
  request: FetchMembersRequest,
  meta?: MetaType,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMembers<MetaType>(request, meta));

      pubnub.api.getMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: FetchMembersResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: FetchMembersError = {
              request,
              status,
            };

            dispatch(errorFetchingMembers<MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMembersSuccess<UserType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membersRetrieved<UserType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.FETCH_MEMBERS_COMMAND;

  return thunkFunction;
};
