import {
  PubNubObjectApiState,
  PubNubObjectApiError,
  ItemMap,
  PubNubObjectApiSuccess,
} from '../api/PubNubApi';

export const beginObjectById = <T extends object>(
  state: PubNubObjectApiState<T>,
  id: string
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  // increment loading count or set to 1
  newState.loadingById[id] =
    newState.loadingById[id] !== undefined ? newState.loadingById[id] + 1 : 1;

  // clear error
  delete newState.errorById[id];

  return newState;
};

export const errorObjectById = <T>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>,
  id: string
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // set error payload
  newState.errorById[id] = payload;

  return newState;
};

export const successObjectById = <T>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>,
  id: string
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // set response payload
  if (Object.prototype.toString.call(payload.data) === '[object Array]') {
    newState.byId[id] = (cloneArray(
      (payload.data as unknown) as any[]
    ) as unknown) as T;
  } else if (typeof payload.data === 'object') {
    newState.byId[id] = cloneObject(payload.data);
  }

  return newState;
};

export const successObjectList = <T>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  newState.byId = {
    ...newState.byId,
    ...cloneObject<ItemMap<T>>(payload.data),
  };

  return newState;
};

export const successDeleteObjectById = <T>(
  state: PubNubObjectApiState<T>,
  id: string
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // delete the item
  delete newState.byId[id];

  return newState;
};

export const clonePubNubObjectApiState = <T>(
  state: PubNubObjectApiState<T>
): PubNubObjectApiState<T> => {
  let newState: PubNubObjectApiState<T> = {
    byId: {},
    loadingById: { ...state.loadingById },
    errorById: {},
  };

  Object.keys(state.byId).forEach((id) => {
    if (Object.prototype.toString.call(state.byId[id]) === '[object Array]') {
      newState.byId[id] = (cloneArray((state.byId[
        id
      ] as unknown) as any[]) as unknown) as T;
    } else if (typeof state.byId[id] === 'object') {
      newState.byId[id] = (cloneObject((state.byId[
        id
      ] as unknown) as object) as unknown) as T;
    }
  });

  Object.keys(state.errorById).forEach((id) => {
    newState.errorById[id] = cloneObject<PubNubObjectApiError<T>>(
      state.errorById[id]
    );
  });

  return newState;
};

const cloneObject = <T>(obj: T): T => {
  let newObj = { ...obj };

  for (let attr in obj) {
    if (((obj as unknown) as object).hasOwnProperty(attr)) {
      if (Object.prototype.toString.call(obj[attr]) === '[object Array]') {
        // TODO: find a better way to make types happy with unknown attribute types
        newObj[attr] = (cloneArray((obj[
          attr
        ] as unknown) as any[]) as unknown) as T[Extract<keyof T, string>];
      } else if (typeof obj[attr] === 'object') {
        // TODO: find a better way to make types happy with unknown attribute types
        newObj[attr] = (cloneObject((obj[
          attr
        ] as unknown) as object) as unknown) as T[Extract<keyof T, string>];
      }
    }
  }

  return newObj;
};

const cloneArray = (arr: any[]): any[] => {
  let newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    let currentItem = newArr[i];
    if (Object.prototype.toString.call(currentItem) === '[object Array]') {
      newArr[i] = cloneArray(currentItem);
    } else if (typeof newArr[i] === 'object') {
      newArr[i] = cloneObject(currentItem);
    }
  }

  return newArr;
};
