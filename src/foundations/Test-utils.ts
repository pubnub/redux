import Pubnub from 'pubnub';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

function createMockStore(pubnub: Pubnub, initialState: any) {
  const middlewares = [
    thunk.withExtraArgument({
      pubnub: {
        api: pubnub,
      },
    }),
  ];

  return configureMockStore(middlewares)(initialState);
}

export { createMockStore };
