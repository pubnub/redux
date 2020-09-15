import Pubnub from 'pubnub';
import { Dispatch } from 'redux';
import {
  MembershipListenerActions,
  MembershipSetEventAction,
  MembershipRemovedEventAction,
  SetMembershipEventMessage,
  RemoveMembershipEventMessage,
} from './MembershipActions';
import { MembershipActionType } from './MembershipActionType.enum';
import { ObjectsCustom } from 'foundations/ObjectsCustom';

const membershipSetEventRecieved = <MembershipCustom extends ObjectsCustom>(
  payload: SetMembershipEventMessage<MembershipCustom>
): MembershipSetEventAction<MembershipCustom> => ({
  type: MembershipActionType.MEMBERSHIP_SET_EVENT,
  payload,
});

const membershipRemovedEventRecieved = (
  payload: RemoveMembershipEventMessage
): MembershipRemovedEventAction => ({
  type: MembershipActionType.MEMBERSHIP_REMOVED_EVENT,
  payload,
});

export const createMembershipListener = <
  MembershipCustom extends ObjectsCustom
>(
  dispatch: Dispatch<MembershipListenerActions<MembershipCustom>>
): Pubnub.ListenerParameters => ({
  objects: (payload) => {
    if (payload.message.type === 'membership') {
      switch (payload.message.event) {
        case 'set':
          dispatch(
            membershipSetEventRecieved<MembershipCustom>(
              (payload as Pubnub.SetMembershipEvent<MembershipCustom>).message
            )
          );
          break;
        case 'delete':
          dispatch(membershipRemovedEventRecieved(payload.message));
          break;
        default:
          break;
      }
    }
  },
});
