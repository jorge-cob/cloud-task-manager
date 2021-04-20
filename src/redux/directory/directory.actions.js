import DirectoryActionTypes from './directory.types';

export const addNewItem = (categoryId = '', newItemId, title, description, isTodo, status = '') => ({
  type: DirectoryActionTypes.ADD_ITEM,
  payload: {
    categoryId,
    newItemId,
    title,
    description,
    isTodo,
    status
  }
});

export const removeItem = itemId => ({
  type: DirectoryActionTypes.REMOVE_ITEM,
  payload: itemId
});

export const fetchItemsStart = () => ({
  type: DirectoryActionTypes.FETCH_ITEMS_START
});

export const fetchItemsSuccess = itemsMap => ({
  type: DirectoryActionTypes.FETCH_ITEMS_SUCCESS,
  payload: itemsMap
});

export const fetchItemsFailure = errorMessage => ({
  type: DirectoryActionTypes.FETCH_ITEMS_FAILURE,
  payload: errorMessage
});

export const addNewCategoryToFilter = categoryId => ({
  type: DirectoryActionTypes.ADD_CATEGORY_FILTER,
  payload: categoryId
});

export const removeCategoryFromFilter = categoryId => ({
  type: DirectoryActionTypes.REMOVE_CATEGORY_FILTER,
  payload: categoryId
});

