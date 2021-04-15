import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  convertCategoriesSnapshotToMap,
  addCategoryToDb, 
  createUserCategoriesDocument
} from '../../firebase/firebase.utils';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './category.actions';

import CategoryActionTypes from './category.types';



export function* fetchCategoriesAsync() {
  yield console.log('I am fired looking for items');
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const userCategoriesRef = yield call(createUserCategoriesDocument, userAuth);
    const userCategoriesSnapshot = yield userCategoriesRef.where('userId', '==', userAuth.uid).get();
    const categoriesMap = yield call(convertCategoriesSnapshotToMap, userCategoriesSnapshot);
    yield put(fetchCategoriesSuccess(categoriesMap));
  } catch(err) {
    yield put(fetchCategoriesFailure(err.message));
  }
};

export function* fetchCategoriesStart() {
  yield takeLatest(
    CategoryActionTypes.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  )
};

export function* addNewCategory(action) {
  const userAuth = yield getCurrentUser();
  const { newItemId, title, description } = action.payload;
  const itemData = {
    userId: userAuth.uid,
    id: newItemId,
    title,
    description
  };
  yield call(addCategoryToDb, newItemId, itemData)
};

export function* addCategory() {
  yield takeLatest(
    CategoryActionTypes.ADD_CATEGORY,
    addNewCategory
  )
};


export function* categorySagas() {
  yield all([
    call(fetchCategoriesStart),
    call(addCategory),
  ]);
};