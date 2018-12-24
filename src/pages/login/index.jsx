import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'react-router';

@connect(({ global }) => ({
  global
}))
@withRouter
export default class Index extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  componentDidMount() {
    //获取用户信息

    if (configs.getUrlParam('userCode') && configs.getUrlParam('userCode') !== 'null' &&
      configs.getUrlParam('sysToken') && configs.getUrlParam('sysToken') !== 'null' &&
      configs.getUrlParam('company') && configs.getUrlParam('company') !== 'null'
    ) {//平台跳转过来的
      const userCode = configs.getUrlParam('userCode');
      const userPassword = configs.getUrlParam('sysToken');
      const company = decodeURI(decodeURI(configs.getUrlParam('company')));
      sessionStorage.setItem('sys_id', 'BEE_USER_001');
      sessionStorage.setItem('sys_authentication', '123456');
      this.props.dispatch({
        type: 'global/login',
        payload: { userCode, userPassword, company },
        callback: (code) => {
          if (code !== 0) {
            sessionStorage.clear();
            message.info('登录信息验证失败，请先登录！');
            setTimeout(() => {
              window.location.href = `${beesrvUrls.domain}/perLogin`
            }, 2000)
          }
        }
      })
    } else if (sessionStorage.tradeToken) {//session登录
      sessionStorage.setItem('sys_id', 'BEE_USER_001');
      sessionStorage.setItem('sys_authentication', '123456');
      this.props.dispatch({
        type: 'global/getUserInfo',
        payload: { tradeToken: sessionStorage.tradeToken },
        callback: (code) => {
          if (code !== 0) {
            sessionStorage.clear();
            message.info('登录信息验证失败，请先登录！');
            setTimeout(() => {
              window.location.href = `${beesrvUrls.domain}/perLogin`
            }, 2000)
          }
        }
      })
    }
    else {
      sessionStorage.clear();
      message.info('登录信息验证失败，请先登录！');
      setTimeout(() => {
        window.location.href = `${beesrvUrls.domain}/perLogin`
      }, 2000)
    }

    //模拟数据
    // const params = {
    //   sys_authentication: 123456,
    //   sys_id: 'BEE_USER_001',
    //   tradeToken: 'beetrade-5c95ead5-b680-48d8-9afe-2af5d6706abb'
    // }

    if (this.props.global.login)
      this.authHandler(this.props.location.pathname, this.props.global)
  }



  render() {
    return (
      <div>
        企业切换
      </div>
    )
  }
}
