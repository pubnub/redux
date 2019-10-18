import {
  PubNubObjectApiState,
  PubNubObjectApiError,
  Identifiable,
  PubNubObjectApiSuccess,
} from '../types/PubNubApi';
import { SpaceMap } from 'types/Space';

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

export const errorObjectById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiError<T>
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);
  let id = payload.data.id;

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // set error payload
  newState.errorById[id] = payload;

  return newState;
};

export const successObjectById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);
  let id = payload.data.id;

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // set response payload
  newState.byId[id] = { ...payload.data };

  return newState;
};

export const successObjectList = <T extends object>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<SpaceMap<T>>
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);

  newState.byId = {
    ...newState.byId,
    ...cloneObject<SpaceMap<T>>(payload.data),
  };

  return newState;
};

export const successDeleteObjectById = <T extends Identifiable>(
  state: PubNubObjectApiState<T>,
  payload: PubNubObjectApiSuccess<T>
): PubNubObjectApiState<T> => {
  let newState = clonePubNubObjectApiState<T>(state);
  let id = payload.data.id;

  // decrement loading count or set to 0
  newState.loadingById[id] =
    newState.loadingById[id] > 0 ? newState.loadingById[id] - 1 : 0;

  // delete the item
  delete newState.byId[id];

  return newState;
};

export const clonePubNubObjectApiState = <T extends object>(
  state: PubNubObjectApiState<T>
): PubNubObjectApiState<T> => {
  let newState: PubNubObjectApiState<T> = {
    byId: {},
    loadingById: { ...state.loadingById },
    errorById: {},
  };

  Object.keys(state.byId).forEach((id) => {
    newState.byId[id] = cloneObject<T>(state.byId[id]);
  });

  Object.keys(state.errorById).forEach((id) => {
    newState.errorById[id] = cloneObject<PubNubObjectApiError<T>>(
      state.errorById[id]
    );
  });

  return newState;
};

const cloneObject = <T extends object = object>(obj: T): T => {
  let newObj = { ...obj };

  for (let attr in obj) {
    if (obj.hasOwnProperty(attr)) {
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
