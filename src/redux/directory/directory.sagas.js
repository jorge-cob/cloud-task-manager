import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  convertItemsSnapshotToMap,
  addItemToDB, 
  createUserItemsDocument,
  getItemCategories,
  removeItemFromDB,
} from '../../firebase/firebase.utils';
import { fetchItemsFailure, fetchItemsSuccess } from './directory.actions';

import DirectoryActionTypes from './directory.types';


export function* fetchItemsAsync() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const userItemsRef = yield call(createUserItemsDocument, userAuth);
    const userItemsSnapshot = yield userItemsRef.where('userId', '==', userAuth.uid).orderBy('index', 'desc').get();
    const itemsMap = yield call(convertItemsSnapshotToMap, userItemsSnapshot);
    const itemsWithCategoriesMap = yield call(getItemCategories, itemsMap);
    yield put(fetchItemsSuccess(itemsWithCategoriesMap));
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
  const { categoryId, newItemId, title, description, isTodo, status, index } = action.payload;
  const userItemsRef = yield call(createUserItemsDocument, userAuth);
  const userItemsSnapshot = yield userItemsRef.where('userId', '==', userAuth.uid).orderBy('index', 'desc').get();
  const itemsMap = yield call(convertItemsSnapshotToMap, userItemsSnapshot);
  const itemsWithCategoriesMap = yield call(getItemCategories, itemsMap);
  let computedIndex = index;
  if (!index && itemsWithCategoriesMap.length === 0) {
    computedIndex = 1000;
  } else if (!index) {
    computedIndex = itemsWithCategoriesMap[0].index + 1000;
  }

  const itemData = {
    userId: userAuth.uid,
    title,
    isTodo,
    status,
    description,
    index: computedIndex
  };
  yield call(addItemToDB, categoryId, newItemId, itemData);
};

export function* addItem() {
  yield takeLatest(
    DirectoryActionTypes.ADD_ITEM,
    addNewItem
  )
};

export function* removeItemFromDirectory(action) {
  yield call(removeItemFromDB, action.payload)
};

export function* removeItem() {
  yield takeLatest(
    DirectoryActionTypes.REMOVE_ITEM,
    removeItemFromDirectory
  )
}


export function* directorySagas() {
  yield all([
    call(fetchItemsStart),
    call(addItem),
    call(removeItem)
  ]);
};