import { RemovingMembersAction, MembersRemovedAction, MembersRequest, Member, MembersResponse, ErrorRemovingMembersAction, MembersError, MembersSuccess } from '../MembersActions';
import { ActionMeta } from '../../../common/ActionMeta';
import { MembersActionType } from '../MembersActionType.enum';
import { User } from '../../../features/user/UserActions';
import { PubNubApiStatus } from 'common/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../common/ThunkTypes';

export const removingMembers = <MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersRequest<MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): RemovingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.REMOVING_MEMBERS,
  payload,
  meta,
});

export const membersRemoved = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersSuccess<UserType, MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): MembersRemovedAction<UserType, MemberType, CustomType, MetaType> => ({
  type: MembersActionType.MEMBERS_REMOVED,
  payload,
  meta,
});

export const errorRemovingMembers = <MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersError<MemberType, CustomType>,
  meta?: ActionMeta<MetaType>,
): ErrorRemovingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.ERROR_REMOVING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const removeMembers = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(
  request: MembersRequest<MemberType, CustomType>,
  meta?: MetaType,
) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(removingMembers<MemberType, CustomType, MetaType>(request, meta));

      pubnub.api.removeMembers(
        {
          ...request
        },
        (status: PubNubApiStatus, response: MembersResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: MembersError<MemberType, CustomType> = {
              request,
              status,
            };

            dispatch(errorRemovingMembers<MemberType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: MembersSuccess<UserType, MemberType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membersRemoved<UserType, MemberType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.REMOVE_MEMBERS_COMMAND;

  return thunkFunction;
};
