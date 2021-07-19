import DirectoryActionTypes from './directory.types'
import { addItem, removeItem } from './directory.utils';


const INITIAL_STATE = {
  items: [],
  isFetching: false,
  errorMessage: undefined,
  filteredCategories: [],
  statusFilter: ['pending', 'done'],
  filterType: 'all'
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
    case DirectoryActionTypes.ADD_ITEM_FAILURE:
    case DirectoryActionTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case DirectoryActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        errorMessage: null,
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
    case DirectoryActionTypes.CHANGE_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload
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
    case DirectoryActionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload.newItemArray
      }
    case DirectoryActionTypes.SIGN_OUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default directoryReducer;
