import { Route } from 'react-router-dom';
import { connect } from 'dva';
import Exception from '../src/components/exception';
import React from 'react'
import { getRoutes } from '../src/utils/utils.js'
const defaultRoutes = ['/'];

export default connect(({ global }) => ({ global }))((args) => {
  const { render, global: { allowedRouters, allRouters }, ...rest } = args;

  //项目中所有路由
  const allRouters1 = new Array().concat(defaultRoutes, allRouters);
  let status = '200';

  //所有有权限访问的路由
  const allowedRouters1 = new Array().concat(defaultRoutes, allowedRouters);
  if (allowedRouters1.indexOf(args.location.pathname) == -1) {
    if (allRouters1.indexOf(args.location.pathname) == -1) {
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