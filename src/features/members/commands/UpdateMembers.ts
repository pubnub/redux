import {
  UpdatingMembersAction,
  MembersRequest,
  Member,
  MembersUpdatedAction,
  ErrorUpdatingMembersAction,
  MembersResponse,
  MembersError,
  MembersSuccess
} from '../MembersActions';
import { ActionMeta } from 'common/ActionMeta';
import { MembersActionType } from '../MembersActionType.enum';
import { User } from 'features/user/UserActions';
import { PubNubApiStatus } from 'common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const updatingMembers = <MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersRequest<MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): UpdatingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.UPDATING_MEMBERS,
  payload,
  meta,
});

export const membersUpdated = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersSuccess<UserType, MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): MembersUpdatedAction<UserType, MemberType, CustomType, MetaType> => ({
  type: MembersActionType.MEMBERS_UPDATED,
  payload,
  meta,
});

export const errorUpdatingMembers = <MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersError<MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): ErrorUpdatingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.ERROR_UPDATING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const updateMembers = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(request: MembersRequest<MemberType, CustomType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingMembers<MemberType, CustomType, MetaType>(request, meta));

      pubnub.api.updateMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembersResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: MembersError<MemberType, CustomType> = {
              request,
              status,
            };

            dispatch(errorUpdatingMembers<MemberType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: MembersSuccess<UserType, MemberType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membersUpdated<UserType, MemberType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.UPDATE_MEMBERS_COMMAND;

  return thunkFunction;
};
