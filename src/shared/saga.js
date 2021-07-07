

import { all, } from 'redux-saga/effects'

import { fetchPlayListSaga } from './pages/playlist/saga'

export default function* rootSaga() {
  yield all([
    fetchPlayListSaga(),
  ]);
}