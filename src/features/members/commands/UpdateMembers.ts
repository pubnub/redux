import { Dispatch } from 'redux';
import {
  UpdatingMembersAction,
  MembersUpdatedAction,
  ErrorUpdatingMembersAction,
  MembersError,
  MembersSuccess,
  Members,
  MembersRequest,
  MembersResponse,
} from '../MembersActions';
import { MembersActionType } from '../MembersActionType.enum';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta, AnyMeta } from '../../../foundations/ActionMeta';
import { ObjectsCustom } from 'foundations/ObjectsCustom';
import { Space } from 'features/space/SpaceActions';

// tag::RDX-function-members-update[]
export const updatingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersRequest<MembersType>,
  meta?: Meta
): UpdatingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.UPDATING_MEMBERS,
  payload,
  meta,
});
// end::RDX-function-members-update[]

// tag::RDX-function-members-update-success[]
export const membersUpdated = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersSuccess<MembersType>,
  meta?: Meta
): MembersUpdatedAction<MembersType, Meta> => ({
  type: MembersActionType.MEMBERS_UPDATED,
  payload,
  meta,
});
// end::RDX-function-members-update-success[]

// tag::RDX-function-members-update-error[]
export const errorUpdatingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersError<MembersType>,
  meta?: Meta
): ErrorUpdatingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.ERROR_UPDATING_MEMBERS,
  payload,
  meta,
  error: true,
});
// end::RDX-function-members-update-error[]

// tag::RDX-command-members-update[]
export const updateMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta = AnyMeta
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
      dispatch(updatingMembers(request, meta));

      pubnub.api.updateMembers(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorUpdatingMembers<MembersType, Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as MembersResponse<MembersType>,
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
// end::RDX-command-members-update[]
