import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { directorySagas } from './directory/directory.sagas';
import { categorySagas } from './category/category.sagas';
import { itemSagas } from './item/item.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(directorySagas),
    call(categorySagas),
    call(itemSagas)
  ]);
};
