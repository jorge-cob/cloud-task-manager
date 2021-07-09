import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  convertItemsSnapshotToMap,
  createUserItemsDocument,
  getItemCategories,
  removeItemFromDB,
  changeItemIndex,
  createItemsDocument,
} from '../../firebase/firebase.utils';
import { addItemFailure, addItemSuccess, fetchItemsFailure, fetchItemsSuccess } from './directory.actions';

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


export function* addItem(itemData) {

  try {
    const userAuth = yield getCurrentUser();
    const { id } = itemData.payload;
    const itemRef = yield call(createItemsDocument, userAuth, itemData);    
    const itemSnapshot = yield itemRef.get();
    yield put(
      addItemSuccess({...itemSnapshot.data(), id})
    );
  
  } catch(err) {
    yield put(addItemFailure(err));
  }
};

export function* onAddItemStart() {
  yield takeLatest(
    DirectoryActionTypes.ADD_ITEM_START,
    addItem
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
    call(onAddItemStart),
    call(removeItem),
    call(reindexItem),
  ]);
};