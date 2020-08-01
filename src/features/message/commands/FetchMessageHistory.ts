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
import { PubnubThunkContext } from 'foundations/ThunkTypes';
import { ActionMeta } from 'foundations/ActionMeta';
import Pubnub from 'pubnub';

export const fetchingMessageHistory = <Meta extends ActionMeta>(
  payload: FetchMessageHistoryRequest,
  meta?: Meta
): FetchingMessageHistoryAction<Meta> => ({
  type: MessageActionType.FETCHING_MESSAGE_HISTORY,
  payload,
  meta,
});

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

export const errorFetchingMessageHistory = <Meta extends ActionMeta>(
  payload: FetchMessageHistoryError,
  meta?: Meta
): ErrorFetchingMessageHistoryAction<Meta> => ({
  type: MessageActionType.ERROR_FETCHING_MESSAGE_HISTORY,
  payload,
  meta,
});

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
    new Promise<MessageHistoryRetrievedAction<MessageContentType, Meta>>(
      (resolve, reject) => {
        dispatch(fetchingMessageHistory(request, meta));

        pubnub.api.history(
          {
            ...(request as Pubnub.HistoryParameters),
          },
          (status, response) => {
            if (status.error) {
              const payload = {
                request,
                status,
              };

              dispatch(errorFetchingMessageHistory<Meta>(payload, meta));
              reject(payload);
            } else {
              const payload = {
                request,
                response: response as FetchMessageHistoryResponse<
                  MessageContentType
                >,
                status,
              };

              const action = messageHistoryRetrieved<MessageContentType, Meta>(
                payload,
                meta
              );

              dispatch(action);
              resolve(action);
            }
          }
        );
      }
    );

  thunkFunction.type = MessageActionType.FETCH_MESSAGE_HISTORY_COMMAND;

  return thunkFunction;
};
