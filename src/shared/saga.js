

import { all, } from 'redux-saga/effects'

import { fetchPlayListSaga } from './pages/playlist/saga'
import { fetchRecommendSaga } from './pages/recommend/saga'

export default function* rootSaga() {
  yield all([
    fetchPlayListSaga(),
    fetchRecommendSaga(),
  ]);
}