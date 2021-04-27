import ItemActionTypes from './item.types';


export const setItem = item => ({
  type: ItemActionTypes.SET_ITEM,
  payload: item
});

export const fetchItemCategoriesStart = itemId => ({
  type: ItemActionTypes.FETCH_ITEM_CATEGORIES_START,
  payload: itemId
});

export const fetchItemCategoriesSuccess = categoriesMap => ({
  type: ItemActionTypes.FETCH_ITEM_CATEGORIES_SUCCESS,
  payload: categoriesMap
});

export const fetchItemCategoriesFailure = errorMessage => ({
  type: ItemActionTypes.FETCH_ITEM_CATEGORIES_FAILURE,
  payload: errorMessage
})
