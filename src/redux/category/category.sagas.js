import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  addCategoryToDb, 
  fetchCategories
} from '../../firebase/firebase.utils';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './category.actions';

import CategoryActionTypes from './category.types';



export function* fetchCategoriesAsync() {
  yield console.log('I am fired looking for items');
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const cats = yield fetchCategories(userAuth);
    yield put(fetchCategoriesSuccess(cats));
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
  const { newItemId, title, description, color, textColor } = action.payload;
  const userId = userAuth.uid;
  const itemData = {
    id: newItemId,
    title,
    description,
    color,
    textColor
  };
  yield call(addCategoryToDb, userId, newItemId, itemData)
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