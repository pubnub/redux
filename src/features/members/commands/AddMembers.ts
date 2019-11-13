import { Dispatch } from 'redux';
import {
  AddingMembersAction,
  MembersRequest,
  Members,
  MembersAddedAction,
  MembersResponse,
  ErrorAddingMembersAction,
  MembersError,
  MembersSuccess,
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { ActionMeta } from '../../../foundations/ActionMeta';
import { Space } from '../../space/SpaceActions';

export const addingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersRequest<MembersType>,
  meta?: Meta
): AddingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.ADDING_MEMBERS,
  payload,
  meta,
});

export const membersAdded = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersSuccess<MembersType>,
  meta?: Meta
): MembersAddedAction<MembersType, Meta> => ({
  type: MembersActionType.MEMBERS_ADDED,
  payload,
  meta,
});

export const errorAddingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersError<MembersType>,
  meta?: Meta
): ErrorAddingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.ERROR_ADDING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const addMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta = never
>(
  request: MembersRequest<MembersType>,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(addingMembers<MembersType, Meta>(request, meta));

      pubnub.api.addMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembersResponse<MembersType>) => {
          if (status.error) {
            let payload: MembersError<MembersType> = {
              request,
              status,
            };

            dispatch(errorAddingMembers<MembersType, Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: MembersSuccess<MembersType> = {
              request,
              response,
              status,
            };

            dispatch(membersAdded<MembersType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.ADD_MEMBERS_COMMAND;

  return thunkFunction;
};
