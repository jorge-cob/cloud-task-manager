import DirectoryActionTypes from './directory.types';

import { firestore } from '../../firebase/firebase.utils';


export const addNewItem = (categoryId = '', newItemId, title, description, status = '') => ({
  type: DirectoryActionTypes.ADD_ITEM,
  payload: {
    categoryId,
    newItemId,
    title,
    description,
    status
  }
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
})

export const fetchItemsStartAsync = () => {
  return dispatch => {
    const itemsRef = firestore.collection('items');
    dispatch(fetchItemsStart());
    itemsRef.get().then(snapshot => {
      dispatch(fetchItemsSuccess(snapshot));
    }).catch(err => dispatch(fetchItemsFailure(err.message)));
  }
};

