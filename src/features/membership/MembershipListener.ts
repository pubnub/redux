import { Dispatch } from 'redux';
import { ObjectsActionPayload } from 'api/Objects';
import {
  UserMembershipUpdatedOnSpaceAction,
  UserAddedToSpaceAction,
  UserRemovedFromSpaceAction,
  MembershipListenerActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { PubNubObjectApiSuccess, ListenerEventData } from 'api/PubNubApi';

const userMembershipUpdatedOnSpace = <T extends ListenerEventData>(
  payload: PubNubObjectApiSuccess<T>
): UserMembershipUpdatedOnSpaceAction<T> => ({
  type: ActionType.USER_MEMBERSHIP_UPDATED_ON_SPACE,
  payload,
});

const userAddedToSpace = <T extends ListenerEventData>(
  payload: PubNubObjectApiSuccess<T>
): UserAddedToSpaceAction<T> => ({
  type: ActionType.USER_ADDED_TO_SPACE,
  payload,
});

const userRemovedFromSpace = <T extends ListenerEventData>(
  payload: PubNubObjectApiSuccess<T>
): UserRemovedFromSpaceAction<T> => ({
  type: ActionType.USER_REMOVED_FROM_SPACE,
  payload,
});

export const createMembershipListener = <T extends ListenerEventData>(
  dispatch: Dispatch<MembershipListenerActions<T>>
) => ({
  membership: (payload: ObjectsActionPayload<T>) => {
    let result = {
      id: payload.message.data.userId + '_' + payload.message.data.spaceId,
      data: payload.message.data,
    };
    switch (payload.message.event) {
      case 'create':
        dispatch(userAddedToSpace(result));
        break;
      case 'update':
        dispatch(userMembershipUpdatedOnSpace(result));
        break;
      case 'delete':
        dispatch(userRemovedFromSpace(result));
        break;
      default:
        break;
    }
  },
});
