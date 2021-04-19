import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getCurrentUser, 
  fetchItemCategories
} from '../../firebase/firebase.utils';
import { fetchItemCategoriesFailure, fetchItemCategoriesSuccess } from './item.actions';

import ItemActionTypes from './item.types';



export function* fetchItemCategoriesAsync(itemId) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const cats = yield fetchItemCategories(itemId);
    yield put(fetchItemCategoriesSuccess(cats));
  } catch(err) {
    yield put(fetchItemCategoriesFailure(err.message));
  }
};

export function* fetchItemCategoriesStart() {
  yield takeLatest(
    ItemActionTypes.FETCH_ITEM_CATEGORIES_START,
    fetchItemCategoriesAsync
  )
};

export function* itemSagas() {
  yield all([
    call(fetchItemCategoriesStart),
  ]);
};