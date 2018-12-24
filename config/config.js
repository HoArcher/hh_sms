const path = require('path');
import os from 'os';
import pageRoutes from './allRoutes';

export default {
  plugins: [
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      // dynamicImport: true,
      ...(!process.env.TEST && os.platform() === 'darwin'
        ? {
          dll: {
            include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            exclude: ['@babel/runtime'],
          },
          hardSource: true,
        }
        : {}),
      fastClick: true,
    }],
  ],
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    layouts: path.resolve(__dirname, 'src/layouts/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    services: path.resolve(__dirname, 'src/services/'),
  },
  routes: pageRoutes
  ,
  proxy: {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  disableCSSModules: false

};
