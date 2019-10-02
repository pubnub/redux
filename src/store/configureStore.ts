import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createNetworkStatusReducer } from '../reducers/createNetworkStatusReducer';
import { AppActions } from '../types/actions';

export const rootReducer = combineReducers({
  networkStatus: createNetworkStatusReducer(true),
});

const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
