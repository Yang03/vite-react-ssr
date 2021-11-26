import fs from 'fs'
import path from 'path'
import express from 'express'
import playlist from './src/api'
import serveStatic  from 'serve-static'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('client/index.html'), 'utf-8')
    : ''

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: any
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

    app.use(serveStatic('dist/client', { index: false }))
    // console.log('-----------------------------_>')
    // app.use(require('compression')())
    // app.use(
    //   require('serve-static')(resolve('dist/client'), {
    //     index: false
    //   })
    // )
  }

  app.use('/api/playlist/hot', playlist.hot)
  app.use('/api/playlist/recommend', playlist.recommend)
  

  app.use('*', async (req, res) => {
     console.log(',,,,,,')
    try {
      const url = req.originalUrl
      let template: string;
      let render: Function;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = indexProd
        render = require('./server/entry-server.js').render
      }

      const context = {}
      // if (context.url) {
      //   // Somewhere a `<Redirect>` was rendered
      //   return res.redirect(301, context.url)
      // }

      if (req.query.csr !== undefined) {
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      }
      let sagas;
      let configureStore;
      if (!isProd) {
        sagas = (await vite.ssrLoadModule('/src/shared/saga')).default
        configureStore = (await vite.ssrLoadModule('/src/entry-server.tsx')).configureStore
      } else {
        sagas = require(('./src/shared/saga')).default
        configureStore = require('./src/entry-server.js').configureStore
      }

      const store = configureStore()
      // const context = {}
      const aysncSaga = await store.runSaga(sagas)
      const appHtml = await render(url, store, context)
      aysncSaga.toPromise().then(async () => {
        
        const preloadedState = store.getState()
        const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--app-state-->`, `<script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>`)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }, () => {
        // todo
      })
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
  createServer().then(({ app }) => {
    

    app.listen(8000, () => {
      console.log('http://localhost:8000')
    })
  }
    
   
  )
}

// for test use
exports.createServer = createServer