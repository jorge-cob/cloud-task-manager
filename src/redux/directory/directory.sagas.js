import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  convertItemsSnapshotToMap,
  addItemToDB, 
  createUserItemsDocument
} from '../../firebase/firebase.utils';
import { fetchItemsFailure, fetchItemsSuccess } from './directory.actions';

import DirectoryActionTypes from './directory.types';



export function* fetchItemsAsync() {
  yield console.log('I am fired looking for items');
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const userItemsRef = yield call(createUserItemsDocument, userAuth);
    const userItemsSnapshot = yield userItemsRef.where('userId', '==', userAuth.uid).get();
    const itemsMap = yield call(convertItemsSnapshotToMap, userItemsSnapshot);
    yield put(fetchItemsSuccess(itemsMap));
  } catch(err) {
    yield put(fetchItemsFailure(err.message));
  }
};

export function* fetchItemsStart() {
  yield takeLatest(
    DirectoryActionTypes.FETCH_ITEMS_START,
    fetchItemsAsync
  )
};

export function* addNewItem(action) {
  const userAuth = yield getCurrentUser();
  const { categoryId, newItemId, title, description, status = '' } = action.payload;
  const itemData = {
    userId: userAuth.uid,
    category: [categoryId],
    title,
    status,
    description
  };
  yield call(addItemToDB, categoryId, newItemId, itemData)
};

export function* addItem() {
  yield takeLatest(
    DirectoryActionTypes.ADD_ITEM,
    addNewItem
  )
};


export function* directorySagas() {
  yield all([
    call(fetchItemsStart),
    call(addItem),
  ]);
};