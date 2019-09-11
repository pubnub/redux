import { AppActions } from 'redux/types/actions';
import { Status } from 'redux/types/Status';
import { Dispatch } from 'Redux';

export const Network_Up = (payload: Status): AppActions => ({
    type: 'NETWORK_UP',
    payload
})

export const Network_Down = (payload: Status): AppActions => ({
    type: 'NETWORK_DOWN',
    payload
})

export const Network_Issues = (payload: Status): AppActions => ({
    type: 'NETWORK_ISSUES',
    payload
})

export const Reconnected = (payload: Status): AppActions => ({
    type: 'RECONNECTED',
    payload
})

export const Connected = (payload: Status): AppActions => ({
    type: 'CONNECTED',
    payload
})

export const Access_Denied = (payload: Status): AppActions => ({
    type: 'ACCESS_DENIED',
    payload
})

export const Malformed_Response = (payload: Status): AppActions => ({
    type: 'MALFORMED_RESPONSE',
    payload
})

export const Bad_Request = (payload: Status): AppActions => ({
    type: 'BAD_REQUEST',
    payload
})

export const Decryption_Error = (payload: Status): AppActions => ({
    type: 'DECRYPTION_ERROR',
    payload
})

export const Timeout_Connection = (payload: Status): AppActions => ({
    type: 'TIMEOUT_CONNECTION',
    payload
})

export const Request_Message_Count_Exceed = (payload: Status): AppActions => ({
    type: 'REQUEST_MESSAGE_COUNT_EXCEED',
    payload
})

export const Unknown = (payload: Status): AppActions => ({
    type: 'UNKNOWN',
    payload
})

export const createStatusActions = ( payload: Status) => (
    (dispatch: Dispatch<AppActions>) => {
        dispatch (Network_Up (payload));
        dispatch (Network_Down (payload));
        dispatch (Network_Issues (payload));
        dispatch (Reconnected (payload));
        dispatch (Connected (payload));
        dispatch (Access_Denied (payload));
        dispatch (Malformed_Response (payload));
        dispatch (Bad_Request (payload));
        dispatch (Decryption_Error (payload));
        dispatch (Timeout_Connection (payload));
        dispatch (Request_Message_Count_Exceed (payload));
        dispatch (Unknown (payload));
    }
)