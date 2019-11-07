import {
  AddingMembersAction,
  MembersRequest,
  Member,
  MembersAddedAction,
  MembersResponse,
  ErrorAddingMembersAction,
  MembersError,
  MembersSuccess,
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { User } from '../../../features/user/UserActions';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';

export const addingMembers = (
  payload: MembersRequest,
  meta?: MetaType,
): AddingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.ADDING_MEMBERS,
  payload,
  meta,
});

export const membersAdded = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersSuccess<UserType, MemberType, CustomType>,
  meta?: MetaType,
): MembersAddedAction<UserType, MemberType, CustomType, MetaType> => ({
  type: MembersActionType.MEMBERS_ADDED,
  payload,
  meta,
});

export const errorAddingMembers = <MemberType extends Member<CustomType>, CustomType, MetaType>(
  payload: MembersError<MemberType, CustomType>,
  meta?: MetaType,
): ErrorAddingMembersAction<MemberType, CustomType, MetaType> => ({
  type: MembersActionType.ERROR_ADDING_MEMBERS,
  payload,
  meta,
  error: true
});

export const addMembers = <UserType extends User, MemberType extends Member<CustomType>, CustomType, MetaType>(request: MembersRequest<MemberType, CustomType>, meta?: MetaType) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(addingMembers<MemberType, CustomType, MetaType>(request, meta));

      pubnub.api.addMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembersResponse<UserType, CustomType>) => {
          if (status.error) {
            let payload: MembersError<MemberType, CustomType> = {
              request,
              status,
            };

            dispatch(errorAddingMembers<MemberType, CustomType, MetaType>(payload, meta));
            reject(payload);
          } else {
            let payload: MembersSuccess<UserType, MemberType, CustomType> = {
              request,
              response,
              status,
            };

            dispatch(membersAdded<UserType, MemberType, CustomType, MetaType>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.ADD_MEMBERS_COMMAND;

  return thunkFunction;
};
