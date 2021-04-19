import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';
import categoryReducer from './category/category.reducer';
import itemReducer from './item/item.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['directory', 'categories']
}

const rootReducer = combineReducers({
  user: userReducer,
  directory: directoryReducer,
  categories: categoryReducer,
  item: itemReducer,
});

export default persistReducer(persistConfig, rootReducer);