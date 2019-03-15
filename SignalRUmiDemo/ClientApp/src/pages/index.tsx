import React, { PureComponent } from 'react';
import styles from './index.css';
import { Button, message, Icon, Col, Row, List } from 'antd';
import { INoticeModelState, INoticeItem } from '@/models/notice';
import { connect } from 'dva';
import Item from 'antd/lib/list/Item';

/* 定义页面状态 */
interface IIndexProps {
  notice: INoticeModelState;
  dispatch: (args: any) => void;
  submitting: boolean;
}

//链接Model 和页面
@connect(({ notice, loading }) => ({
  notice,
  loading: loading.effects['notice/send'],
}))
class index extends PureComponent<IIndexProps> {
  onClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'notice/send',
      payload: {
        username: '123123',
        message: new Date().toUTCString(),
      },
    });
    message.info('Click');
  };
  render() {
    const { notice, submitting } = this.props;
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
                  {' '}
                  {item.username}-{item.message}{' '}
                </List.Item>
              )}
            />
          </Col>

          <Col span={6}>
            <Button type="primary" onClick={this.onClick}>
              <Icon type="plus" /> 发送消息
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default index;
