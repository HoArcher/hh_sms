import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Card, Row, Col,Icon } from 'antd';
import router from 'umi/router';
import styles from './index.less';

@connect(({ form }) => ({
    data: form.step,
  }))
@Form.create()
class Client extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isProved: true,
    };
  }
  render() {
    const { isProved } = this.state;
    const { form, dispatch, data,companyType,companyNickHead,dataHead } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/Incoming/purchase/confirm');
        }
      });
    };
    return (
        <div className={styles.ClientBox}>
      <Fragment>
        <Card>
          <Form layout="vertical" className={styles.stepForm}>
            <Row>
              <Col sm={8} xs={10}>
                <Form.Item label={companyType?companyType:"委托方"} layout="inline">
                  {getFieldDecorator(`${dataHead}+clientName`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请输入正确的委托方，最长不超过20字符',max:20 }],
                  })(<Input style={{ width: '79%' }} placeholder="请输入委托方" />)}
                </Form.Item>
              </Col>
              <Col sm={13} xs={10} />
              <Col sm={3} xs={10}>
                <span style={{ marginRight: '10px' }}>
                  <span
                    style={
                      isProved
                        ? { color: 'green', marginRight: '10px' }
                        : { color: '#f00', marginRight: '10px' }
                    }
                  >
                    {
                        isProved
                        ?
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                        :
                        <Icon type="close-circle" theme="twoTone" twoToneColor="#f00" />
                    }
                  </span>
                  {
                        isProved
                        ?
                        <span>验证通过</span>    
                        :
                        <span>验证失败</span>
                    }
                </span>
                <Button type="primary" onClick={this.onProve}>
                  验证企业
                </Button>
              </Col>
            </Row>
            <Divider style={{ margin: '0 0 24px 0' }} />
            <Row>
              <Col sm={8} xs={10}>
                <Form.Item layout="vertical" label="成立时间">
                  {getFieldDecorator(`${dataHead}+time`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请验证企业！' }],
                  })(<Input style={{ width: '79%' }} readOnly placeholder="请验证企业！" />)}
                </Form.Item>
              </Col>
              <Col sm={8} xs={10}>
                <Form.Item layout="vertical" label="法人">
                  {getFieldDecorator(`${dataHead}+corporation`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请验证企业！' }],
                  })(<Input style={{ width: '79%' }} readOnly placeholder="请验证企业！" />)}
                </Form.Item>
              </Col>
              <Col sm={8} xs={10}>
                <Form.Item layout="vertical" label="注册资本">
                  {getFieldDecorator(`${dataHead}+capital`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请验证企业！' }],
                  })(<Input style={{ width: '79%' }} readOnly placeholder="请验证企业！" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={8} xs={10}>
                <Form.Item layout="vertical" label="地址">
                  {getFieldDecorator(`${dataHead}+address`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请验证企业！' }],
                  })(<Input style={{ width: '79%' }} readOnly placeholder="请验证企业！" />)}
                </Form.Item>
              </Col>
              <Col sm={8} xs={10}>
                <Form.Item layout="vertical" label={companyNickHead?companyNickHead:"委托企业简称"}>
                  {getFieldDecorator(`${dataHead}+nickName`, {
                    initialValue:'',
                    rules: [{ required: true, message: '请输入正确的企业简称，最长不超过20字符！',max:20 }],
                  })(<Input style={{ width: '79%' }} placeholder="由业务员填写" />)}
                </Form.Item>
              </Col>
              <Col sm={8} xs={10} />
            </Row>
          </Form>
        </Card>
      </Fragment>
      </div> 
    );
  }
}

export default Client;
