
import ReactDOM from 'react-dom'
import App from './shared/App'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
// import { createMemoryHistory } from 'history'
import createSagaMiddleware, { END } from 'redux-saga'


import playlistReducer from './shared/pages/playlist/reducer'
import sagas from './shared/saga'

const preloadedState = window.__PRELOADED_STATE__

const reducer = combineReducers({
  playlist: playlistReducer,
})

// const history = createMemoryHistory();
const sagaMiddleware = createSagaMiddleware()
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  preloadedState,
  compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

// then run the saga
sagaMiddleware.run(sagas)

ReactDOM.render(
  // <React.StrictMode>
     <Provider store={store}>
       <BrowserRouter> <App /></BrowserRouter>
       </Provider>,
  // </React.StrictMode>,
  document.getElementById('app')
)