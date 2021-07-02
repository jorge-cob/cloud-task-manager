import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  convertItemsSnapshotToMap,
  addItemToDB, 
  createUserItemsDocument,
  getItemCategories,
  removeItemFromDB,
  changeItemIndex,
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
  const { categories, id, title, description, isTodo, status, color, index, dateTime } = action.payload;
  const userItemsRef = yield call(createUserItemsDocument, userAuth);
  const userItemsSnapshot = yield userItemsRef.where('userId', '==', userAuth.uid).orderBy('index', 'desc').get();
  const itemsMap = yield call(convertItemsSnapshotToMap, userItemsSnapshot);
  const itemsWithCategoriesMap = yield call(getItemCategories, itemsMap);
  let computedIndex = index;
  if (!index && itemsWithCategoriesMap.length === 0) {
    computedIndex = 1000000000;
  } else if (!index) {
    computedIndex = itemsWithCategoriesMap[0].index + 100000000;
  }

  const itemData = {
    userId: userAuth.uid,
    title,
    isTodo,
    status,
    description,
    color: color,
    index: computedIndex,
    categories,
    dateTime,
    id
  };
  yield call(addItemToDB, itemData);
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

export function* reorderIndex(action) {
  const { itemToChangeIndex, newIndex } = action.payload;
  yield call(changeItemIndex, itemToChangeIndex, newIndex)
}

export function* reindexItem() {
  yield takeLatest(
    DirectoryActionTypes.SET_ITEMS,
    reorderIndex
  )
}


export function* directorySagas() {
  yield all([
    call(fetchItemsStart),
    call(addItem),
    call(removeItem),
    call(reindexItem)
  ]);
};