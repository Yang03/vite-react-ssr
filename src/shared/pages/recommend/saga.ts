
import { all, call, put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

export const fetchUrl = () => fetch('http://127.0.0.1:8000/api/playlist/recommend', {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then((response) => {
  if (!response.ok) {
    throw new Error()
  }
  return response.json()
})

export function* fetchRecommend(): any {
  try {
    const recommend: any = yield call(fetchUrl)
    yield put({
      type: 'load_recommend',
      payload: recommend?.body?.allData
    });
  } catch (error) {
    // toodo
    console.log(error)
  }
}

export function* fetchRecommendSaga() {
  yield takeEvery('fetch_recommend', fetchRecommend)
}

