import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import createImportPlugin from 'vite-plugin-import';

import vitePluginImp from 'vite-plugin-imp';

// import 'zarm/lib/style/index.css'; import 'normalize.css
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: true,
    }
  },
  esbuild: {
    jsxInject: `import React from 'react';`
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    // reactRefresh(),
  
    // createImportPlugin({
    //   onlyBuild: false, // if onlyBuild === true, this plugin takes effect only in vite build mode; onlyBuild's default value is true.
    //   babelImportPluginOptions: [{
    //     libraryName: 'antd',
    //     libraryDirectory: 'lib',
    //     style: true,
    //     // 'style': (name: string, file: Object) => {
    //     //   console.log(`${name}/style/index.css`)
    //     //   return `${name}/style/index.css`;
    //     // }   // or 'css'
    //   }]
    // }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/lib/${name}/style/index.less`,
    //       // style: (name) => [`antd/lib/style/index.less`, `antd/lib/${name}/style/index.less`],
    //     },
    //   ],
    // }),
    vitePluginImp({
      libList: [
        {
          libName: 'zarm',
          style: (name) => [`zarm/lib/${name}/style/index.css`, `zarm/lib/style/index.scss`],
          // style: (name) => [`antd/lib/style/index.less`, `antd/lib/${name}/style/index.less`],
        },
      ],
    }),
    reactRefresh(),
  ]
})
