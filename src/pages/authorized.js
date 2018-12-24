import { Route } from 'react-router-dom';
import { connect } from 'dva';
import Exception from '../components/exception';
import React from 'react'
import menuData from '../../config/allRoutes';
import { getRoutes } from '../utils/utils.js'
const defaultRoutes = ['/'];

export default connect(({ global }) => ({ global }))((args) => {

  debugger
  const { render, global: { routers }, ...rest } = args;

  //项目中所有路由
  let allRouters = getRoutes(menuData);
  allRouters = new Array().concat(defaultRoutes, allRouters);
  let status = '200';

  //所有有权限访问的路由
  const accessRoutes = new Array().concat(defaultRoutes, routers);
  if (accessRoutes.indexOf(args.location.pathname) == -1) {
    if (allRouters.indexOf(args.location.pathname) == -1) {
      status = '404'
    } else {
      status = '403'
    }
  }

  if (status === '200') {
    return <div>
      <div>PrivateRoute (routes/PrivateRoute.js)</div>
      {args.children}
    </div>
  }
  else {
    return <Route
      {...rest}
      render={() => <Exception type={status} />
      }
    />
  }

})