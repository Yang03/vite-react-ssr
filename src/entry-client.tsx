
import ReactDOM from 'react-dom'
import App from './shared/App'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
// import { createMemoryHistory } from 'history'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from './shared/reducer'

import sagas from './shared/saga'

// @ts-ignore
const preloadedState = window.__PRELOADED_STATE__

// const reducer = combineReducers({
//   playlist: playlistReducer,
//   recommend: recommendReducer,
// })

// const history = createMemoryHistory();
const sagaMiddleware = createSagaMiddleware()
// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

const store = createStore(
  rootReducer,
  preloadedState,
  compose(
      applyMiddleware(sagaMiddleware),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);


window.store = store

// then run the saga
sagaMiddleware.run(sagas)

const Root = () => {
  return (
    <Provider store={store}>
       { /* @ts-ignore */ }
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)