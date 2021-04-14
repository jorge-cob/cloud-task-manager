import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { directorySagas } from './directory/directory.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(directorySagas)
  ]);
};
