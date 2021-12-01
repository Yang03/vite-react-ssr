import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactJsx from 'vite-react-jsx'
import reactRefresh from '@vitejs/plugin-react-refresh'
import commonjs from '@rollup/plugin-commonjs'
// import cjs from 'rollup-plugin-cjs';
// import createImportPlugin from 'vite-plugin-import';

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
  // optimizeDeps:{
  //   // esbuildOptions:{
  //   //   plugins:[
  //   //     esbuildCommonjs(['zarm']) 
  //   //   ]
  //   // }
  //   include: ['@zarm-design/icons'],
  // },
  build: {
    sourcemap: true,
    target: 'es2015',
    minify: false,
    // rollupOptions: {
    //   plugins: [commonjs()],
    // },
    // commonjsOptions: {
    //  include: [/node_modules/],
    // },
    // rollupOptions:  {
    //   output: {
    //     exports:'default',
    //   }
    // },
    // commonjsOptions: {
    //   include: [/node_modules/],
    // }
  },
  plugins: [
    // reactJsx(),
    // viteCommonjs(),
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
          libDirectory: 'lib',
          style: (name) => [`zarm/lib/${name}/style/index.css`, `zarm/lib/style/index.scss`],
          // style: (name) => [`antd/lib/style/index.less`, `antd/lib/${name}/style/index.less`],
        },
      ],
    }),
    reactRefresh(),
  ]
})
