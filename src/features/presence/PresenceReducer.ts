import { AnyAction } from 'redux';
import { PresenceActionType } from './PresenceActionType.enum';
import {
  PresenceListenerActions,
  PresenceEventMessage,
  Presence,
  HereNowResponse,
  HereNowSuccess,
  HereNowRetrievedAction,
  PresenceStateRetrievedAction,
} from './PresenceActions';
import { PresenceState } from './PresenceState';

// tag::RDX-type-presence-byid[]
export interface PresencebyIdState<ReceivedPresence extends Presence> {
  byId: {
    [channelId: string]: {
      name: string;
      occupants: ReceivedPresence[];
      occupancy: number;
    };
  };
  totalOccupancy: number;
}
// end::RDX-type-presence-byid[]

const createInitialState = () => {
  return {
    byId: {},
    totalOccupancy: 0,
  };
};

const hereNow = <ReceivedPresence extends Presence<PresenceState>>(
  state: PresencebyIdState<ReceivedPresence>,
  payload: HereNowSuccess<ReceivedPresence>
) => {
  const newState = {
    byId: {
      ...state.byId,
      ...payload.response.channels,
    },
    totalOccupancy: payload.response.totalOccupancy,
  };

  return newState;
};

const getState = <ReceivedPresence extends Presence<PresenceState>>(
  state: PresencebyIdState<ReceivedPresence>,
  payload: HereNowResponse<ReceivedPresence>
) => {
  const newState = {
    byId: { ...state.byId },
    totalOccupancy: state.totalOccupancy,
  };

  Object.keys(payload.channels).forEach((channel) => {
    // update occupant state if exists
    if (newState.byId[channel]) {
      newState.byId[channel] = payload.channels[channel];
    }
  });

  return newState;
};

const userJoined = <ReceivedPresence extends Presence<PresenceState>>(
  state: PresencebyIdState<ReceivedPresence>,
  payload: PresenceEventMessage<ReceivedPresence>
) => {
  const newState = {
    byId: { ...state.byId },
    totalOccupancy: state.totalOccupancy,
  };

  let occupants: ReceivedPresence[] = [];

  // remove occupant if exists
  if (newState.byId[payload.channel]) {
    occupants = newState.byId[payload.channel].occupants;

    newState.byId[payload.channel].occupants = occupants.filter(
      (occupant) => occupant.uuid !== payload.uuid
    );

    newState.byId[payload.channel].occupancy =
      newState.byId[payload.channel].occupants.length;

    if (occupants.length === newState.byId[payload.channel].occupants.length) {
      newState.totalOccupancy++;
    }
  } else {
    newState.totalOccupancy++;
  }

  // add occupant and update occupancy
  newState.byId[payload.channel] = {
    name: payload.channel,
    occupants: [
      ...occupants,
      {
        uuid: payload.uuid,
        state: payload.state,
      } as ReceivedPresence,
    ],
    occupancy: payload.occupancy,
  };

  return newState;
};

const userLeft = <ReceivedPresence extends Presence<PresenceState>>(
  state: PresencebyIdState<ReceivedPresence>,
  payload: PresenceEventMessage<ReceivedPresence>
) => {
  const newState = {
    byId: { ...state.byId },
    totalOccupancy: state.totalOccupancy,
  };

  // remove occupant if exists
  if (newState.byId[payload.channel]) {
    const occupants = newState.byId[payload.channel].occupants;

    newState.byId[payload.channel].occupants = occupants.filter(
      (occupant) => occupant.uuid !== payload.uuid
    );

    if (occupants.length > newState.byId[payload.channel].occupants.length) {
      newState.byId[payload.channel].occupancy--;
      newState.totalOccupancy--;
    }
  }

  return newState;
};

const userStateChange = <ReceivedPresence extends Presence<PresenceState>>(
  state: PresencebyIdState<ReceivedPresence>,
  payload: PresenceEventMessage<ReceivedPresence>
) => {
  const newState = {
    byId: { ...state.byId },
    totalOccupancy: state.totalOccupancy,
  };

  // update occupant state if exists
  if (newState.byId[payload.channel]) {
    const occupants = newState.byId[payload.channel].occupants;

    occupants.forEach((occupant) => {
      if (occupant.uuid === payload.uuid) {
        occupant.state = payload.state;
      }
    });
  }

  return newState;
};

// tag::RDX-type-presence-action[]
export type PresenceActions<RetrievedPresence extends Presence> =
  | HereNowRetrievedAction<RetrievedPresence>
  | PresenceStateRetrievedAction<RetrievedPresence>
  | PresenceListenerActions;
// end::RDX-type-presence-action[]

// tag::RDX-type-presence[]
export type PresenceReducer<
  StoredPresence extends Presence,
  PresenceAction extends AnyAction
> = (
  state: PresencebyIdState<StoredPresence> | undefined,
  action: PresenceAction
) => PresencebyIdState<StoredPresence>;
// end::RDX-type-presence[]

// tag::RDX-method-reducer-presence[]
export const createPresenceReducer = <
  StoredPresence extends Presence<PresenceState> = Presence,
  PresenceAction extends AnyAction = PresenceActions<StoredPresence>
>(): PresenceReducer<StoredPresence, PresenceAction> => (
  state: PresencebyIdState<StoredPresence> = createInitialState(),
  action: PresenceAction
): PresencebyIdState<StoredPresence> => {
  switch (action.type) {
    case PresenceActionType.HERE_NOW_RETRIEVED:
      return hereNow<StoredPresence>(state, action.payload);
    case PresenceActionType.PRESENCE_STATE_RETRIEVED:
      return getState<StoredPresence>(state, action.payload);
    case PresenceActionType.JOIN_EVENT:
      return userJoined<StoredPresence>(state, action.payload);
    case PresenceActionType.LEAVE_EVENT:
    case PresenceActionType.TIMEOUT_EVENT:
      return userLeft<StoredPresence>(state, action.payload);
    case PresenceActionType.STATE_CHANGE_EVENT:
      return userStateChange<StoredPresence>(state, action.payload);
    default:
      return state;
  }
};
// end::RDX-method-reducer-presence[]
