
import { all, call, put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

export const fetchUrl = () => fetch('http://127.0.0.1:8000/api/playlist/hot', {
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

export function* fetchPlayList(): any {
  try {
    const playlist = yield call(fetchUrl)
    yield put({
      type: 'load_playlist', 
      payload: playlist?.body?.data?.dailySongs
    });
  } catch (error) {
    // toodo
    console.log(error)
  }
}

export function* fetchPlayListSaga() {
  yield takeEvery('fetch_playlist', fetchPlayList)
}

