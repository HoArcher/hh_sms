import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Button, Card, Row, Col, Popconfirm, Icon } from 'antd';

import router from 'umi/router';
import styles from './index.less';

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class ReportBottom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: true,
    };
  }
  render() {
    const { isSaved } = this.state;
    const { form, dispatch, data, step,broad } = this.props;
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
    const cancelConfirm = () => {
      router.push('/Incoming');
    };
    const confirmReportData = ()=>{
        console.log('aaa')
    }
    const backTo = ()=>{
        if(step === 2){
            router.push('/Incoming/purchase/info');
        } else if (step === 3){
            router.push('/Incoming/purchase/confirm');
        } else if (step === 4){
            router.push('/Incoming/purchase/result');
        }
    }
    return (
      <div className={styles.bottomCard}>
        <Card>
          <Row>
            <Col sm={8} xs={2}>
              <span style={{ marginRight: '10px' }}>
                <span
                  style={
                    isSaved
                      ? { color: 'green', marginRight: '10px' }
                      : { color: '#f00', marginRight: '10px' }
                  }
                >
                  {isSaved ? (
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                  ) : (
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#f00" />
                  )}
                </span>
                已保存草稿
                <span>17分钟前</span>
              </span>
            </Col>
            <Col sm={Number(16-broad)} xs={2} />
            <Col sm={Number(broad)} xs={2}>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                }}
                label=""
              >
                <Popconfirm
                  placement="bottomRight"
                  title="取消后当前页面未保存内容将丢失！"
                  onConfirm={cancelConfirm}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type="button" style={{ marginLeft: '25px' }}>
                    取消
                  </Button>
                </Popconfirm>
                {
                    step === 2 || step ===3
                    ?
                    <Button type="button" style={{ marginLeft: '25px' }} onClick={backTo}>
                    上一步
                  </Button>
                  :
                  null
                }
                {
                    step === 4
                    ?
                    <Button type="primary" style={{ marginLeft: '25px' }} onClick={confirmReportData}>
                  提交
                </Button>
                    :
                    <Button type="primary" style={{ marginLeft: '25px' }} onClick={onValidateForm}>
                  下一步
                </Button>
                }
                
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default ReportBottom;
