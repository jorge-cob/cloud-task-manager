import ItemActionTypes from './item.types'


const INITIAL_STATE = {};
const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.FETCH_ITEM_CATEGORIES_START:
      return {
        ...state,
        isFetching: true
      }
    case ItemActionTypes.FETCH_ITEM_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isFetching: false
      }
    case ItemActionTypes.FETCH_ITEM_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case ItemActionTypes.SET_ITEM:
      return {
        ...state,
       item: action.payload,
      }
    default:
      return state;
  }
};

export default itemReducer;
