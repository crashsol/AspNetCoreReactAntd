import React, { PureComponent, Component } from 'react';
import styles from './index.css';
import { Button, message, Icon, Col, Row, List, Form, Input } from 'antd';
import { INoticeModelState, INoticeItem } from '@/models/notice';
import { connect } from 'dva';
import Item from 'antd/lib/list/Item';
import { FormComponentProps } from 'antd/lib/form/Form';

/* 定义页面状态 继承自FormComponentProps，与Form.Create()效果一样 */
interface IIndexPageProps extends FormComponentProps {
  notice: INoticeModelState;
  dispatch: (args: any) => Promise<any>;
  submitting: boolean;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

//链接Model 和页面
@connect(({ notice, loading }) => ({
  notice,
  loading: loading.effects['notice/send'],
}))
class index extends Component<IIndexPageProps> {
  /* constructor(props: IIndexPageProps) {
    super(props);
  } */
  //加载时验证
  componentDidMount = () => {
    this.props.form.validateFields();
  };

  handleSubmit = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'notice/send',
          payload: {
            ...values,
          },
        }).then(() => {
          message.info('发送消息成功');
        });
      }
    });
    e.preventDefault();
  };
  render() {
    const { notice } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const messageError = isFieldTouched('message') && getFieldError('message');
    return (
      <React.Fragment>
        <Row className={styles.notice} gutter={24}>
          <Col span={12}>
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered={true}
              dataSource={notice.notices}
              // tslint:disable-next-line:jsx-no-lambda
              renderItem={(item: INoticeItem) => (
                <List.Item>
                  {item.userName}-{item.message}
                </List.Item>
              )}
            />
          </Col>

          <Col span={12}>
            <Form onSubmit={this.handleSubmit} {...formItemLayout}>
              <Form.Item
                label="用户名"
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名称' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名称"
                  />
                )}
              </Form.Item>
              <Form.Item
                label="消息"
                validateStatus={messageError ? 'error' : ''}
                help={messageError || ''}
              >
                {getFieldDecorator('message', {
                  rules: [{ required: true, message: '请输入你要发送的消息' }],
                })(<Input.TextArea rows={4} placeholder="输入发送消息" />)}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 5 },
                }}
              >
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  <Icon type="plus" /> 发送消息
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Form.create()(index);
