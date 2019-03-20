import { IBookModelState } from './models/book';
import React, { Component, Fragment, PureComponent } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import { Divider, Table, Card, PageHeader, Row, Modal, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

//#region Create页面

/**
 * 定义Create页面Props
 *
 * @interface ICreateFormProps
 * @extends {FormComponentProps}
 */
interface ICreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fields: any) => void;
  handleModalVisible: (flag?: boolean) => void;
}
const CreateFormFunc: React.SFC<ICreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose={true}
      title="新增数据"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="书籍名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少5个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入书籍名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="书籍类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请选择类型" />)}
      </FormItem>
    </Modal>
  );
};

//定义CreateForm
const CreateForm = Form.create()(CreateFormFunc);
//#endregion

//#region Update页面

/**
 * Update Props
 * @interface IUpdateFormProps
 * @extends {FormComponentProps}
 */
interface IUpdateFormProps extends FormComponentProps {
  handleUpdate: (e?: any) => void;
  handleUpdateModalVisible: (flag?: boolean, record?: any) => void;
  updateModalVisible: boolean;
  values: {};
}

/**
 *  Update State
 * @interface IUpdateFormState
 */
interface IUpdateFormState {
  formVals: {};
}

class UpateFormClass extends PureComponent<IUpdateFormProps, IUpdateFormState> {
  //页面布局
  formLayout: object;
  constructor(props) {
    super(props);
    this.state = {
      formVals: {},
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }
}
const UpdateForm = Form.create()(UpateFormClass);

//#endregion

//#region Index页面

/**
 * Index Props 定义
 * @interface IIndexProps
 * @extends {FormComponentProps}
 */
interface IIndexProps extends FormComponentProps {
  book: IBookModelState;
  dispatch: (args: any) => Promise<any>;
  loading: boolean;
}

/**
 * Index State定义
 * @interface IIndexState
 */
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
      payload: {
        sorting: '',
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }
  render() {
    const { items } = this.props.book;
    return (
      <PageHeader title="查询表格">
        <Row />
        <Card title="表格数据">
          <Table columns={this.columns} dataSource={items} rowKey="id" />
        </Card>
      </PageHeader>
    );
  }
}
export default Form.create()(index);
//#endregion
