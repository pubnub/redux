import { Presence } from 'redux/types/Presence';
import { AppActions } from 'redux/types/actions';
import { Dispatch } from 'Redux';

export const UserJoin = (payload: Presence): AppActions => ({
    type: 'JOIN',
    payload
});

export const UserLeave = (payload: Presence): AppActions => ({
    type: 'LEAVE',
    payload
});

export const UserTimeout = (payload: Presence): AppActions => ({
    type: 'TIMEOUT',
    payload
});

export const UserStateChange = (payload: Presence): AppActions => ({
    type: 'STATE_CHANGE',
    payload
});

export const createPresenceActions = (payload: Presence) => (
    (dispatch: Dispatch<AppActions>) => {
        dispatch (UserJoin (payload));
        dispatch (UserLeave (payload));
        dispatch (UserTimeout (payload));
        dispatch (UserStateChange (payload));
    }
)