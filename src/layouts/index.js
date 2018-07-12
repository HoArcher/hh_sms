import { Component } from 'react';
import { Layout, Icon, message, Spin } from 'antd';
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';
import withRouter from 'umi/withRouter';
import logo from '../assets/logo.svg';
import GlobalHeader from "../components/GlobalHeader";
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { formatter } from '../utils/utils'
import { connect } from 'dva';
import { logout } from '../services';
import router from 'umi/router';
const { Content, Header, Footer } = Layout;

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
@connect(({ global, loading }) => ({
  global,
  logining: loading.effects['global/checkLogin'],
}))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isMobile,
    };
  }
  componentWillMount() {
    const { global: { login }, dispatch, location } = this.props;
    if (!login && (localStorage.sms_uuid || sessionStorage.sms_uuid) && location.pathname !== '/') {
      dispatch({
        type: 'global/checkLogin',
        payload: {
          uuid: (localStorage.sms_uuid || sessionStorage.sms_uuid)
        },
        callback: (status, msg) => status === 'error' && message.error(msg)
      });
    } else if (!(localStorage.sms_uuid || sessionStorage.sms_uuid)) {
      router.push({
        pathname: '/',
      });
    }
  }
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onMenuClick(e, a) {
    const { dispatch } = this.props;
    switch (e.key) {
      case 'logout':
        dispatch({
          type: 'global/logout',
          payload: {
            uuid: localStorage.sms_uuid || sessionStorage.sms_uuid
          },
          callback: (status, msg) => status === 'error' && message.error(msg)
        });
        break;

      default:
        break;
    }
  }

  render() {
    const { children, location, global: { user, menus } } = this.props;
    const { collapsed, isMobile: mb } = this.state;
    if (this.props.logining) {
      return <Layout style={{ paddingTop: '18rem' }}>
        <Spin tip="登录验证中..." />
      </Layout>
    }
    else
      return this.props.location.pathname === '/' ? (<div>{this.props.children}</div>) :
        (<Layout>
          <SiderMenu
            logo={logo}
            collapsed={collapsed}
            menuData={formatter(menus)}
            location={location}
            onCollapse={this.handleMenuCollapse}
            isMobile={mb}
          />
          <Layout>
            <Header style={{ padding: 0 }}>
              <GlobalHeader
                logo={logo}
                collapsed={collapsed}
                isMobile={mb}
                currentUser={{
                  name: user.name,
                  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                  userid: '00000001',
                  notifyCount: 12,
                }}
                onMenuClick={this.onMenuClick.bind(this)}
                onCollapse={this.handleMenuCollapse}
              />
            </Header>
            <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              {children}
            </Content>
          </Layout>
        </Layout>)

  }
}

export default withRouter(BasicLayout);
