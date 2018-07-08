import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/dashboard/analysis",
        "exact": true,
        "component": require('../dashboard/analysis/index.js').default
      },
      {
        "path": "/dashboard/bookManage",
        "exact": true,
        "component": require('../dashboard/bookManage/index.jsx').default
      },
      {
        "path": "/list/bookList",
        "exact": true,
        "component": require('../list/bookList/index.jsx').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login/index.jsx').default
      },
      {
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src\\\\layouts\\\\index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/dashboard/analysis","exact":true,"component":"./src/pages/dashboard/analysis/index.js"},{"path":"/dashboard/bookManage/components/editBook","exact":true,"component":"./src/pages/dashboard/bookManage/components/editBook.jsx"},{"path":"/dashboard/bookManage","exact":true,"component":"./src/pages/dashboard/bookManage/index.jsx"},{"path":"/dashboard/bookManage/models","exact":true,"component":"./src/pages/dashboard/bookManage/models/index.js"},{"path":"/dashboard/bookManage/services","exact":true,"component":"./src/pages/dashboard/bookManage/services/index.js"},{"path":"/list/bookList","exact":true,"component":"./src/pages/list/bookList/index.jsx"},{"path":"/list/bookList/models","exact":true,"component":"./src/pages/list/bookList/models/index.js"},{"path":"/list/bookList/services","exact":true,"component":"./src/pages/list/bookList/services/index.js"},{"path":"/login","exact":true,"component":"./src/pages/login/index.jsx"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
