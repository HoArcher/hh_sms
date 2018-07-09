import { Component } from 'react';
import { Layout, Icon, message } from 'antd';
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';
import withRouter from 'umi/withRouter';
import logo from '../assets/logo.svg';
import GlobalHeader from "../components/GlobalHeader";
import { connect } from 'dva';
const { Content, Header, Footer } = Layout;

@connect(({ global, loading }) => ({
  global,
  logining: loading.effects['global/login'],
}))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  componentWillMount() {
    const { global: { login } } = this.props;
    if(!login){
      
    }
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location, global: { user } } = this.props;
    const { collapsed } = this.state;
    return this.props.location.pathname === '/' ? (<div>{this.props.children}</div>) :
      (<Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: user.name,
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
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
