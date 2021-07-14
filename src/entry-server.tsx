
import ReactDOMServer from 'react-dom/server'
import App from './shared/App'
import { StaticRouterContext } from 'react-router';

import  { StaticRouter } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers, compose, Store } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware, { END,  } from 'redux-saga'
import { matchRoutes } from 'react-router-config'

import routes from './shared/routes'

// import { routerMiddleware } from 'react-router-redux'


import rootReducer from './shared/reducer'

const sagaMiddleware = createSagaMiddleware();

const reduxMiddlewares = [
    // routerMiddleware(createMemoryHistory()),
    sagaMiddleware,
];

async function loadData (store: Store, url: string) {
  const route = matchRoutes(routes, url.replace(/\?.*$/, ''))
  const promises = route.map(e => {
      return e.route.component.loadData
          ? e.route.component.loadData(store, e.match.params)
          : null
  })

  await Promise.all(promises)
}

export async function render(url: string, store: Store, context: any) {
  await loadData(store, url)
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      { /* @ts-ignore */ }
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  return appHtml
}

export function configureStore(initialState: any) {
  const store: any = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...reduxMiddlewares)),
  );

  store.runSaga = sagaMiddleware.run

  store.close = () => store.dispatch(END)

  return store
}