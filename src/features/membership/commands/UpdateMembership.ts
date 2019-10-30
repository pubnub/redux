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
} from '../../../api/PubNubApi';
import { Membership } from '../../../api/Membership';

const updatingMemberships = (payload: string): UpdatingMembershipAction => ({
  type: ActionType.UPDATING_MEMBERSHIP,
  payload,
});

const membershipUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): MembershipUpdatedAction<T> => ({
  type: ActionType.MEMBERSHIP_UPDATED,
  payload,
});

const errorUpdatingMembership = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingMembershipAction<T> => ({
  type: ActionType.ERROR_UPDATING_MEMBERSHIP,
  payload,
});

export const updateMembership = (pubnub: any, membership: Membership) => (
  dispatch: Dispatch
) => {
  dispatch(updatingMemberships(membership.userId));

  pubnub.updateMembership(
    {
      ...membership,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: membership.userId, value: { ...membership } };

        dispatch(
          errorUpdatingMembership({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          membershipUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};
