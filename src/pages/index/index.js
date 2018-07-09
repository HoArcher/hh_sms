import React, { Component } from 'react'
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { Button, Row, Checkbox, Form, Input, Radio, Spin ,message,Alert} from 'antd';
// import { config } from 'utils';
import icon from './imgs/timg.jpg';
import styles from './index.less';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

@connect(({ global, loading }) => ({
  global,
  logining: loading.effects['global/login'],
}))
@Form.create()
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  
  }

  handleOk() {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      if (!errors) {
        dispatch({
          type: 'global/login',
          payload: {
            ...values,
          },
          callback:(status,msg)=>status==='error'&&message.error(msg)
        });
      }
      // dispatch({ type: 'login/login', payload: values })
    })
  }

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" closable showIcon />;
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const {global,logining}=this.props;
    return (

      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={icon} />
          <span>用户管理系统</span>
        </div>
        {!global.login &&
              !logining &&
              global.message&&
              this.renderMessage(global.message)}

        {/* {(this.props.global.message&&!this.props.logining)&&<Alert style={{ marginBottom: 24 }} message={this.props.global.message} type="error" showIcon />} */}
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input onPressEnter={this.handleOk.bind(this)} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback style={{ marginBottom: 5 }}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="password" onPressEnter={this.handleOk.bind(this)} placeholder="Password" />)}
          </FormItem>
          <FormItem style={{ marginBottom: 5 }}
          >
            {getFieldDecorator('role', { initialValue: 'user' })(
              <RadioGroup>
                <Radio value="user">用户</Radio>
                <Radio value="admin">管理员</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <a className={styles.login_form_forgot} href="">忘了密码?</a>

          </FormItem>

          <Row>
            <Button type="primary" onClick={this.handleOk.bind(this)} loading={this.props.logining}>
              登录
        </Button>
          </Row>

        </form>
        {/* <Spin spinning={this.props.logining} /> */}
      </div>
    )
  }
}

export default withRouter(Login)
// Login.propTypes = {
//   form: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

