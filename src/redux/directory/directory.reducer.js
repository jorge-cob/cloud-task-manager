import DirectoryActionTypes from './directory.types'
import { addItem } from './directory.utils';


const INITIAL_STATE = {
  items: [],
  isFetching: false,
  errorMessage: undefined
};
const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true
      }
    case DirectoryActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false
      }
    case DirectoryActionTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case DirectoryActionTypes.ADD_ITEM:
      return {
        ...state,
        items: addItem(state.items, action.payload)
      }
    default:
      return state;
  }
};

export default directoryReducer;
