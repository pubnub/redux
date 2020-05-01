import { Dispatch } from 'redux';
import {
  RemovingMembersAction,
  MembersRemovedAction,
  ErrorRemovingMembersAction,
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

// tag::RDX-function-members-remove[]
export const removingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersRequest<MembersType>,
  meta?: Meta
): RemovingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.REMOVING_MEMBERS,
  payload,
  meta,
});
// end::RDX-function-members-remove[]

// tag::RDX-function-members-remove-success[]
export const membersRemoved = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersSuccess<MembersType>,
  meta?: Meta
): MembersRemovedAction<MembersType, Meta> => ({
  type: MembersActionType.MEMBERS_REMOVED,
  payload,
  meta,
});
// end::RDX-function-members-remove-success[]

// tag::RDX-function-members-remove-error[]
export const errorRemovingMembers = <
  MembersType extends Members<ObjectsCustom, Space<ObjectsCustom>>,
  Meta extends ActionMeta
>(
  payload: MembersError<MembersType>,
  meta?: Meta
): ErrorRemovingMembersAction<MembersType, Meta> => ({
  type: MembersActionType.ERROR_REMOVING_MEMBERS,
  payload,
  meta,
  error: true,
});
// end::RDX-function-members-remove-error[]

// tag::RDX-command-members-remove[]
export const removeMembers = <
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
      dispatch(removingMembers<MembersType, Meta>(request, meta));

      pubnub.api.removeMembers(
        {
          ...request,
          users: request.users.map((user) => user.id),
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorRemovingMembers<MembersType, Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as MembersResponse<MembersType>,
              status,
            };

            dispatch(membersRemoved<MembersType, Meta>(payload, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MembersActionType.REMOVE_MEMBERS_COMMAND;

  return thunkFunction;
};
// end::RDX-command-members-remove[]
