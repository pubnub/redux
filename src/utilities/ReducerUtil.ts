import {
  PubNubObjectApiState,
  ItemMap,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';

export const successObjectById = <T>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>,
  id: string
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

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

  // delete the item
  delete newState.byId[id];

  return newState;
};

export const clonePubNubObjectApiState = <T>(
  state: PubNubObjectApiState<T>
): PubNubObjectApiState<T> => {
  let newState: PubNubObjectApiState<T> = {
    byId: {},
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
