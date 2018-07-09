import { Route } from 'react-router-dom';
import { connect } from 'dva';
import Exception from '../src/components/exception';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { getMenuData } from '../src/common/menu.js';
const defaultRoutes = ['/'];


export default connect(({ global }) => ({ global }))((args) => {
  const { render, global, ...rest } = args;

  const allRoute = getMenuData();
  console.log(allRoute)
  debugger;
  //所有有权限访问的路由
  const accessRoutes = new Array().concat(defaultRoutes, global.menus.map(item => item.path));


  if (accessRoutes.indexOf(args.location.pathname) != -1) {
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
      render={props =>
        <Exception type='403' />
      }
    />
  }

})