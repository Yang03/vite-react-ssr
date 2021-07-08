
import ReactDOMServer from 'react-dom/server'
import App from './shared/App'
import { StaticRouter } from "react-router-dom"


import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware, { END } from 'redux-saga'

// import { routerMiddleware } from 'react-router-redux'


import rootReducer from './shared/reducer'

const sagaMiddleware = createSagaMiddleware();

const reduxMiddlewares = [
    // routerMiddleware(createMemoryHistory()),
    sagaMiddleware,
];

export function render(url, store, context) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

export function configureStore(initialState) {
  const store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...reduxMiddlewares)),
  );

  store.runSaga = sagaMiddleware.run

  store.close = () => store.dispatch(END)

  return store
}