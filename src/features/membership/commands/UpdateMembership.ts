import { Dispatch } from 'redux';
import { ObjectsResponsePayload } from '../../../api/Objects';
import {
  UpdatingMembershipAction,
  ErrorUpdatingMembershipAction,
  MembershipUpdatedAction,
} from '../../../actions/Actions';
import { ActionType } from '../../../actions/ActionType.enum';
import {
  PubNubObjectApiError,
  PubNubApiStatus,
  PubNubObjectApiSuccess,
  Meta,
} from '../../../api/PubNubApi';
import { Membership } from '../../../api/Membership';

export const updatingMemberships = (
  payload: string,
  meta?: Meta
): UpdatingMembershipAction => ({
  type: ActionType.UPDATING_MEMBERSHIP,
  payload,
  meta,
});

export const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>,
  meta?: Meta
): MembershipUpdatedAction<T> => ({
  type: ActionType.MEMBERSHIP_UPDATED,
  payload,
  meta,
});

export const errorUpdatingMembership = <T>(
  payload: PubNubObjectApiError<T>,
  meta?: Meta
): ErrorUpdatingMembershipAction<T> => ({
  type: ActionType.ERROR_UPDATING_MEMBERSHIP,
  payload,
  meta,
});

export const updateMembership = (
  pubnub: any,
  membership: Membership,
  meta?: Meta
) => {
  const thunkFunction = (dispatch: Dispatch) =>
    new Promise<void>((resolve, reject) => {
      dispatch(updatingMemberships(membership.userId, meta));

      pubnub.updateMembership(
        {
          ...membership,
        },
        (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
          if (status.error) {
            let errorData = { id: membership.userId, value: { ...membership } };
            let payload = {
              code: status.category,
              message: status.errorData,
              data: errorData,
            };

            dispatch(errorUpdatingMembership(payload, meta));
            reject(payload);
          } else {
            dispatch(membershipUpdated({ data: response.data }, meta));
            resolve();
          }
        }
      );
    });

  thunkFunction.type = ActionType.COMMAND;

  return thunkFunction;
};
