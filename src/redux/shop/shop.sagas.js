import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotTopMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import {
  fetchCollectionsSucces,
  fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired');
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotTopMap, snapshot);
    yield put(fetchCollectionsSucces(collectionsMap));
  } catch(err) {
    yield put(fetchCollectionsFailure(err.message));
  }
};

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
};

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ]);
};
