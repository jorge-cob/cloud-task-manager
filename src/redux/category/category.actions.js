import CategoryActionTypes from './category.types';

import { firestore } from '../../firebase/firebase.utils';


export const addNewCategory = categoryData => ({
  type: CategoryActionTypes.ADD_CATEGORY,
  payload: categoryData
});

export const removeCategory = categoryId => ({
  type: CategoryActionTypes.REMOVE_CATEGORY,
  payload: categoryId
});

export const fetchCategoriesStart = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = categoriesMap => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categoriesMap
});

export const fetchCategoriesFailure = errorMessage => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
  payload: errorMessage
})

export const fetchCategoriesStartAsync = () => {
  return dispatch => {
    const categoriesRef = firestore.collection('categories');
    dispatch(fetchCategoriesStart());
    categoriesRef.get().then(snapshot => {
      dispatch(fetchCategoriesSuccess(snapshot));
    }).catch(err => dispatch(fetchCategoriesFailure(err.message)));
  }
};

