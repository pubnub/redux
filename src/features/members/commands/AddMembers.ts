import { Dispatch } from 'redux';
import {
  AddingMembersAction,
  MembersAddedAction,
  ErrorAddingMembersAction,
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

// tag::RDX-function-member-add[]
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
// end::RDX-function-member-add[]

// tag::RDX-function-member-add-success[]
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
// end::RDX-function-member-add-success[]

// tag::RDX-function-member-add-error[]
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
// end::RDX-function-member-add-error[]

// tag::RDX-command-member-add[]
export const addMembers = <
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
      dispatch(addingMembers<MembersType, Meta>(request, meta));

      pubnub.api.addMembers(
        {
          ...request,
        },
        (status, response) => {
          if (status.error) {
            const payload = {
              request,
              status,
            };

            dispatch(errorAddingMembers<MembersType, Meta>(payload, meta));
            reject(payload);
          } else {
            const payload = {
              request,
              response: response as MembersResponse<MembersType>,
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
// end::RDX-command-member-add[]
