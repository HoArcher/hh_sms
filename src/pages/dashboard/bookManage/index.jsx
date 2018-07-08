import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style/TableList.less';

import EditBook from './components/editBook'

const FormItem = Form.Item;



@connect(({ bookManage, loading }) => ({
  bookManage,
  loading: loading.models.bookManage,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {

    selectedRows: [],
    formValues: {},

    editmodalVisible: false,
    addmodalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookManage/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,

    };
    dispatch({
      type: 'bookManage/fetch',
      payload: params,
    });
  };




  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'bookManage/remove',
          payload: {
            number: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { number, date } = fieldsValue;
      const values = {
        number: number ? number : null,
        date: date ? moment(fieldsValue.date).format('l') : null,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'bookManage/fetch',
        payload: values,
      });
    });
  };





  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('number')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>

            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  //---------------------------修改
  handleUpdateOk = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookManage/modifyBook',
      payload: { ...fields },
      callback: (status, error) => {
        status === 'ok' ? message.success('修改书籍成功') : message.error(error);
      },
    });
    this.setState({
      editmodalVisible: false,
    });
  }
  handleEditModalVisiable = (flag, key) => {
    const editmodalVisible = !!flag;
    if (editmodalVisible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'bookManage/fetchBookDetail',
        payload: { key },
        callback: (status, error) => {
          if (status === 'error') {
            message.error(error)
          }
        },
      });
    }
    this.setState({
      editmodalVisible,
    });
  }
  //-----------------------------添加
  handleAddOk = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookManage/addBook',
      payload: { ...fields },
      callback: (status, error) => {
        status === 'ok' ? message.success('添加书籍成功') : message.error(error);
      },
    });
    this.setState({
      addmodalVisible: false,
    });
  }
  handleAddModalVisiable = (flag, key) => {
    const addmodalVisible = !!flag;
    this.setState({
      addmodalVisible,
    });
  }

  render() {
    const {
      bookManage: { data, bookDetail },
      loading,
    } = this.props;
    const { selectedRows, editmodalVisible, addmodalVisible } = this.state;

    const columns = [
      {
        title: '规则编号',
        dataIndex: 'number',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '服务调用次数',
        dataIndex: 'callNo',
        align: 'right',
        render: val => `${val} 万`,
      },

      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment><a onClick={() => this.handleEditModalVisiable(true, record.key)}>修改</a></Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );



    const modifyMenthod = {
      handleOk: this.handleUpdateOk,
      handleModalVisible: this.handleEditModalVisiable,
      modalVisible: editmodalVisible,
      bookDetail,
    }
    const addMenthod = {
      handleOk: this.handleAddOk,
      handleModalVisible: this.handleAddModalVisiable,
      modalVisible: addmodalVisible
    }

    return (
      <PageHeaderLayout title="书籍列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModalVisiable(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      批量操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <EditBook   {...modifyMenthod} />
        <EditBook   {...addMenthod} />
      </PageHeaderLayout>
    );
  }
}
