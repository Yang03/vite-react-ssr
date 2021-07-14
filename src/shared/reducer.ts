
import { combineReducers } from 'redux'

import playlistReducer from './pages/playlist/reducer'
import recommendReducer from './pages/recommend/reducer'


const reducer = combineReducers({
  playlist: playlistReducer,
  recommend: recommendReducer,
})

export default reducer