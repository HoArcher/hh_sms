import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Card, Row, Col, Alert, Popconfirm } from 'antd';
import Client from '@/components/Client';
import FileUpload from '@/components/FileUpload';
import ReportBottom from '@/components/ReportBottom';
import router from 'umi/router';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isProved: true,
    };
  }
  render() {
    const { isProved } = this.state;
    const { form, dispatch, data } = this.props;
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
    const onProve = () => {
      console.log('aaa');
    };
    const confirm = () => {
      router.push('/Incoming');
    }
    return (
      <Fragment>
        <div className={styles.warningBack}>
          <Alert message="该立项报告被退回!" description={`退回原因:1、`} type="warning" showIcon />
        </div>
        <Client onValidateForm={onValidateForm} />
        <Client companyType="供应商" companyNickHead="供货企业简称" dataHead="supply" />
        <div className={styles.upLoadFile}>
          <Card>
            <Row>
              <Col sm={8} xs={2}>
                <span style={{ marginRight: '10px' }}>补充资料上传:</span>
                <FileUpload />
                <p style={{ color: '#ccc', paddingLeft: '100px' }}>
                  支持扩展名：.rar .zip .doc .docx .pdf .jpg...
                </p>
              </Col>
            </Row>
          </Card>
        </div>
        <ReportBottom step={1} broad={3} />
      </Fragment>
    );
  }
}

export default Step1;

{
  /* <Form.Item  label="转账金额">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input 
              style={{ width: '79%' }}
            prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item> */
}
