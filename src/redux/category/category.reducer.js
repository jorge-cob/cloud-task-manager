import CategoryActionTypes from './category.types'
import { addCategory } from './category.utils';


const INITIAL_STATE = {
  items: [],
  isFetching: false,
  errorMessage: undefined
};
const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: true
      }
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false
      }
    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case CategoryActionTypes.ADD_CATEGORY:
      return {
        ...state,
        items: addCategory(state.items, action.payload)
      }
    default:
      return state;
  }
};

export default categoryReducer;