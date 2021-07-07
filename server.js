const fs = require('fs')
const path = require('path')
const express = require('express')
const { playlist }  = require('./src/server/api')
const {matchRoutes} = require('react-router-config')


const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const app = express()

  app.get('/api/playlist/hot', playlist.hot)

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
     
      const routes = (await vite.ssrLoadModule('/src/shared/routes')).default
      const branch = matchRoutes(routes, req.path);

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const sagas = (await vite.ssrLoadModule(('/src/shared/saga'))).default
    
      configureStore = (await vite.ssrLoadModule('/src/entry-server.jsx')).configureStore

      const store = configureStore()
      const context = {}
      await store.runSaga(sagas)
      store.runSaga(sagas).toPromise().then(() => {
        const preloadedState = store.getState();
        const appHtml = render(url, store, context)
        const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--app-state-->`, `<script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>`)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }, () => {
        // todo
      })

      branch.forEach(({ route }) => {
        route.component.loadData && route.component.loadData(store)
      });
      store.close()
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  
  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(8000, () => {
      console.log('http://localhost:8000')
    })
  )
}

// for test use
exports.createServer = createServer