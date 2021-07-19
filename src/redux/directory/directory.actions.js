import DirectoryActionTypes from './directory.types';

export const addItemStart = itemData => ({
  type: DirectoryActionTypes.ADD_ITEM_START,
  payload: itemData
});

export const addItemSuccess = itemData => ({
  type: DirectoryActionTypes.ADD_ITEM_SUCCESS,
  payload: itemData
});

export const addItemFailure = error => ({
  type: DirectoryActionTypes.ADD_ITEM_FAILURE,
  payload: error
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

export const addStatusFilter = statusId => ({
  type: DirectoryActionTypes.ADD_STATUS_FILTER,
  payload: statusId
});

export const removeStatusFilter = statusId => ({
  type: DirectoryActionTypes.REMOVE_STATUS_FILTER,
  payload: statusId
});

export const setItemsIndex = itemData => ({
  type: DirectoryActionTypes.SET_ITEMS,
  payload: itemData
});

export const setFilterType = type => ({
  type: DirectoryActionTypes.CHANGE_FILTER_TYPE,
  payload: type
})
