import { Route } from 'react-router-dom';
import { connect } from 'dva';
import Exception from '../src/components/exception';
import React from 'react'
import { getAllRoutes } from '../src/common/menu.js';
const defaultRoutes = ['/'];

export default connect(({ global }) => ({ global }))((args) => {
  const { render, global: { routers }, ...rest } = args;

  //项目中所有路由
  let allRouters = getAllRoutes();
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
    return <Route
      {...rest}
      render={props =>
        <div>
          {
            render(props)
          }
        </div>
      }
    />;
  }
  else {
    return <Route
      {...rest}
      render={() => <Exception type={status} />
      }
    />
  }

})