import { Dispatch } from 'redux';
import {
  FetchMessageHistoryRequest,
  FetchMessageHistoryResponse,
  FetchMessageHistoryError,
  FetchingMessageHistoryAction,
  ErrorFetchingMessageHistoryAction,
  MessageHistoryRetrievedAction,
  FetchMessageHistorySuccess,
} from '../../message/MessageActions';
import { MessageActionType } from '../../message/MessageActionType.enum';
import { PubNubApiStatus } from '../../../foundations/PubNubApi';
import { PubnubThunkContext } from '../../../foundations/ThunkTypes';
import { ActionMeta } from '../../../foundations/ActionMeta';

// tag::RDX-function-presence-messagehistory[]
export const fetchingMessageHistory = <Meta extends ActionMeta>(
  payload: FetchMessageHistoryRequest,
  meta?: Meta
): FetchingMessageHistoryAction<Meta> => ({
  type: MessageActionType.FETCHING_MESSAGE_HISTORY,
  payload,
  meta,
});
// end::RDX-function-presence-messagehistory[]

// tag::RDX-function-presence-messagehistory-success[]
export const messageHistoryRetrieved = <
  MessageContentType,
  Meta extends ActionMeta
>(
  payload: FetchMessageHistorySuccess<MessageContentType>,
  meta?: Meta
): MessageHistoryRetrievedAction<MessageContentType, Meta> => ({
  type: MessageActionType.MESSAGE_HISTORY_RETRIEVED,
  payload,
  meta,
});
// end::RDX-function-presence-messagehistory-success[]

// tag::RDX-function-presence-messagehistory-error[]
export const errorFetchingMessageHistory = <Meta extends ActionMeta>(
  payload: FetchMessageHistoryError,
  meta?: Meta
): ErrorFetchingMessageHistoryAction<Meta> => ({
  type: MessageActionType.ERROR_FETCHING_MESSAGE_HISTORY,
  payload,
  meta,
});
// end::RDX-function-presence-messagehistory-error[]

// tag::RDX-command-presence-messagehistory[]
export const fetchMessageHistory = <
  MessageContentType,
  Meta extends ActionMeta
>(
  request: FetchMessageHistoryRequest,
  meta?: Meta
) => {
  const thunkFunction = (
    dispatch: Dispatch,
    _getState: any,
    { pubnub }: PubnubThunkContext
  ) =>
    new Promise<void>((resolve, reject) => {
      dispatch(fetchingMessageHistory(request, meta));

      pubnub.api.history(
        {
          ...request,
        },
        (
          status: PubNubApiStatus,
          response: FetchMessageHistoryResponse<MessageContentType>
        ) => {
          if (status.error) {
            let payload: FetchMessageHistoryError = {
              request,
              status,
            };

            dispatch(errorFetchingMessageHistory<Meta>(payload, meta));
            reject(payload);
          } else {
            let payload: FetchMessageHistorySuccess<MessageContentType> = {
              request,
              response,
              status,
            };

            dispatch(
              messageHistoryRetrieved<MessageContentType, Meta>(payload, meta)
            );
            resolve();
          }
        }
      );
    });

  thunkFunction.type = MessageActionType.FETCH_MESSAGE_HISTORY_COMMAND;

  return thunkFunction;
};
// end::RDX-command-presence-messagehistory[]
