import {
  UpdatingMembersAction,
  MembersRequest,
  Members,
  MembersUpdatedAction,
  ErrorUpdatingMembersAction,
  MembersResponse,
  MembersError,
  MembersSuccess
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { Dispatch, PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from '../../../foundations/ObjectsCustom';
import { Space } from '../../space/SpaceActions';

export const updatingMembers = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembersRequest<MembersType>,
  meta?: Meta,
): UpdatingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.UPDATING_MEMBERS,
  payload,
  meta,
});

export const membersUpdated = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembersSuccess<MembersType>,
  meta?: Meta,
): MembersUpdatedAction<MembersType, Meta> => ({
  type: MembersActionType.MEMBERS_UPDATED,
  payload,
  meta,
});

export const errorUpdatingMembers = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta>(
  payload: MembersError<MembersType>,
  meta?: Meta,
): ErrorUpdatingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.ERROR_UPDATING_MEMBERS,
  payload,
  meta,
  error: true,
});

export const updateMembers = <MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>, Meta extends ActionMeta = never>(request: MembersRequest<MembersType>, meta?: Meta) => {
  const thunkFunction = (dispatch: Dispatch, _getState: any, { pubnub }: PubnubThunkContext) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingMembers(request, meta));

      pubnub.api.updateMembers(
        {
          ...request,
        },
        (status: PubNubApiStatus, response: MembersResponse<MembersType>) => {
          if (status.error) {
            let payload: MembersError<MembersType> = {
              request,
              status,
            };

            dispatch(errorUpdatingMembers<MembersType, Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: MembersSuccess<MembersType> = {
              request,
              response,
              status,
            };

            dispatch(membersUpdated<MembersType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.UPDATE_MEMBERS_COMMAND;

  return thunkFunction;
};
