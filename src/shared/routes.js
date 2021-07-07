// import loadable from 'loadable-components'

// export const Playlist = loadable(() => import('./pages/playlist'))
// export const Recommend = loadable(() => import('./pages/recommend'))

import Playlist from './pages/playlist'
import Recommend from './pages/recommend'

const routes = [
  {
    path: '/',
    component: Playlist,
    exact: true
  },
  {
    path: '/playlist',
    component: Playlist,
  },
  {
    path: '/recommend',
    component: Recommend,
  },
]

export default routes
