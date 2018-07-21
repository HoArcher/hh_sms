import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Select, Input, InputNumber } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const formOptions = {
    onFieldsChange(props, fields) {
        if(props.dispatch){
            props.dispatch({
                type: 'bookManage/saveFormfields',
                payload: {...props.bookDetail,...fields},
            });
        }
    },
    mapPropsToFields: (props) => {
        if(props.bookDetail && JSON.stringify(props.bookDetail) !== '{}'){
            return {

                description: Form.createFormField({
                     ...props.bookDetail.description,
                    //value: props.bookDetail.description,
                }),
                bookType: Form.createFormField({
                    ...props.bookDetail.bookType,
                    //value: props.bookDetail.bookType.value,
                }),
                callNo: Form.createFormField({
                    ...props.bookDetail.callNo,
                    //value: props.bookDetail.callNo,
                }),
            }
        }else{
            return {};
        }

    }
};


@Form.create(formOptions)
export default class EditBook extends Component {
    static propTypes = {
        // prop: PropTypes
    }
    state = {
        visible: false,
    }
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { bookDetail } = this.props;
                const fieldsValue = bookDetail && JSON.stringify(bookDetail) !== '{}' ?
                    { key: bookDetail.key, ...values } : { ...values }
                if (this.props.handleOk) { this.props.handleOk(fieldsValue) }
            }
        });
        // this.setState({
        //     visible: false,
        // });
    }

    handleCancel = (e) => {
        if (this.props.handleModalVisible) { this.props.handleModalVisible() }
        // this.setState({
        //     visible: false,
        // });
    }


    render() {
        const { bookDetail, modalVisible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        return (

            <Modal
                title={bookDetail && bookDetail.key ? '修改' : '添加'}
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <FormItem
                        label="描述"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入你的描述!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="书籍类别"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('bookType', {
                            rules: [{ required: true, message: '请选择书籍类别!' }],
                        })(
                            <Select
                                placeholder="请选择书籍类别"
                                // onChange={this.handleSelectChange}
                            >
                                <Option value="儿童">儿童</Option>
                                <Option value="科幻">科幻</Option>
                                <Option value="IT技术">IT技术</Option>
                                <Option value="悬疑">悬疑</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="调用次数"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('callNo', {
                            rules: [{ required: true, message: '必填!' }],
                        })(
                            <InputNumber min={1} max={100} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
