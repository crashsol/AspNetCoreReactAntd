import { PageHeaderWrapper } from '@/components/PageHeaderWrapper';
import { BookDto, BookDtoType } from './../../utils/HttpClient';
import { IBookModelState } from 'modules/book';
import React, { Component, Fragment } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import { Badge, Divider, Table, Card } from 'antd';
import moment = require('moment');

//定义Index传入的Props
interface IIndexProps extends FormComponentProps {
  book: IBookModelState;
  dispatch: (args: any) => Promise<any>;
  loading: boolean;
}

interface IIndexState {
  createModelVisiable: boolean;
  updateModelVisiable: boolean;
  expandForm: boolean;
  selectedRows: any[];
  formValues: object;
}
@connect(({ book, loading }) => ({
  book,
  loading: loading.models.book,
}))
class index extends Component<IIndexProps, IIndexState> {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      createModelVisiable: false,
      updateModelVisiable: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
    };
  }

  columns = [
    {
      title: '书籍名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a>修改</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'book/fetch',
    });
  }
  render() {
    const { items } = this.props.book;
    return (
      <PageHeaderWrapper title="查询表格">
        <Card title="表格数据">
          <Table columns={this.columns} dataSource={items} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(index);
