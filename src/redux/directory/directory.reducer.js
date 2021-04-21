import DirectoryActionTypes from './directory.types'
import { addItem, removeItem } from './directory.utils';


const INITIAL_STATE = {
  items: [],
  isFetching: false,
  errorMessage: undefined,
  filteredCategories: [],
  statusFilter: [],
  isTodoFilter: false,
};
const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.FETCH_ITEMS_START:
      return INITIAL_STATE
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
    case DirectoryActionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: removeItem(state.items, action.payload)
      }
    case DirectoryActionTypes.ADD_CATEGORY_FILTER:
      return {
        ...state,
        filteredCategories: [...state.filteredCategories, action.payload]
      }
    case DirectoryActionTypes.REMOVE_CATEGORY_FILTER:
      return {
        ...state,
        filteredCategories: state.filteredCategories.filter(status => status !== action.payload)
      }

    case DirectoryActionTypes.TOGGLE_TODO_FILTER:
      return {
        ...state,
        isTodoFilter: !state.isTodoFilter
      }
    case DirectoryActionTypes.ADD_STATUS_FILTER:
      return {
        ...state,
        statusFilter: [...state.statusFilter, action.payload]
      }
    case DirectoryActionTypes.REMOVE_STATUS_FILTER:
      return {
        ...state,
        statusFilter: state.statusFilter.filter(status => status !== action.payload)
      }

    default:
      return state;
  }
};

export default directoryReducer;
