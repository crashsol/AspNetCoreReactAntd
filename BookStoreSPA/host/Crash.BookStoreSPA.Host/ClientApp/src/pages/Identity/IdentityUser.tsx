import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import { IdentityUserCreateDto, IdentityUserUpdateDto } from '@/utils/HttpClient';
import { Badge, Button, Card, Col, DatePicker, Divider, Dropdown, Icon, Input, InputNumber, Menu, message, Modal, Popconfirm, Row, Select } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { connect } from 'dva';
import moment from 'moment';
import React, { Component, Fragment, PureComponent } from 'react';
import styles from './Index.less';
import { IIdentityUserModelState } from './models/identityUser';
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
  const formLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  /* userName: string;
  name: string | undefined;
  surname: string | undefined;
  email: string;
  phoneNumber: string | undefined;
  twoFactorEnabled: boolean;
  lockoutEnabled: boolean;
  roleNames: string[] | undefined;*/
  return (
    <Modal width={640} destroyOnClose={true} title="创建用户" visible={modalVisible} onOk={okHandle} onCancel={() => handleModalVisible()}>
      <Form>
        <FormItem {...formLayout} label="账号名称">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: '必须输入账号名称' }],
          })(<Input placeholder="请输入账号名称" />)}
        </FormItem>
        <FormItem {...formLayout} label="电子邮箱">
          {form.getFieldDecorator('email', {
            rules: [{ type: 'email', message: '不是有效的邮箱地址' }, { required: true, message: '必须输入电子邮箱' }],
          })(<Input type="email" placeholder="请输入电子邮箱" />)}
        </FormItem>
        <FormItem {...formLayout} label="登录密码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '必须输入登录密码' }],
          })(<Input type="password" placeholder="请输入登录密码" />)}
        </FormItem>
        <FormItem {...formLayout} label="用户昵称">
          {form.getFieldDecorator('name', {})(<Input placeholder="请输入用户名称" />)}
        </FormItem>
        <FormItem {...formLayout} label="联系电话">
          {form.getFieldDecorator('phoneNumber', {})(<Input placeholder="请输入联系电话" />)}
        </FormItem>
        {/* 添加创建表单项 */}
      </Form>
    </Modal>
  );
};

// 定义CreateForm
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
  values: IdentityUserCreateDto;
}

/**
 *  Update State
 * @interface IUpdateFormState
 */
interface IUpdateFormState {
  updateModel: IdentityUserUpdateDto;
}

class UpateFormClass extends PureComponent<IUpdateFormProps, IUpdateFormState> {
  // 页面布局
  public formLayout: object;
  constructor(props) {
    super(props);
    this.state = {
      updateModel: props.values,
    };
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  }

  public handleUpdateFunc = () => {
    const { form, handleUpdate } = this.props;
    const { updateModel: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const formVals = { ...oldValue, ...fieldsValue };
      handleUpdate(formVals);
    });
  };

  public render() {
    const { form, updateModalVisible, handleUpdateModalVisible } = this.props;
    const { updateModel } = this.state;
    return (
      <Modal width={640} title="更新用户" visible={updateModalVisible} onCancel={() => handleUpdateModalVisible(false)} onOk={this.handleUpdateFunc}>
        <Form>
          <FormItem {...this.formLayout} label="账号名称">
            {form.getFieldDecorator('userName', {
              rules: [{ required: true, message: '必须输入账号名称' }],
              initialValue: updateModel.userName,
            })(<Input placeholder="请输入账号名称" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="用户昵称">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '必须输入用户昵称' }],
              initialValue: updateModel.name,
            })(<Input placeholder="请输入用户昵称" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="电子邮箱">
            {form.getFieldDecorator('email', {
              rules: [{ type: 'email', message: '不是有效的邮箱地址' }, { required: true, message: '必须输入电子邮箱' }],
              initialValue: updateModel.email,
            })(<Input placeholder="请输入电子邮箱" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="联系电话">
            {form.getFieldDecorator('phoneNumber', {
              initialValue: updateModel.phoneNumber,
            })(<Input placeholder="请输入联系电话" />)}
          </FormItem>
          {/* 更新表单项构建 */}
        </Form>
      </Modal>
    );
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
  identityUser: IIdentityUserModelState;
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
  expandForm: boolean; // 是否展开查询Form
  selectedRows: any[]; // 已经选中的行
  searchForm: object; // 查询对象的值
  updateModel: object; // 页面要更新的对象
}
// tslint:disable-next-line:max-classes-per-file
@connect(({ identityUser, loading }) => ({
  identityUser,
  loading: loading.models.identityUser,
}))
class IdentityUser extends Component<IIndexProps, IIndexState> {
  /* 创建 table columns 的列定义*/
  public columns = [
    {
      title: '账号名称',
      dataIndex: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'name',
    },
    {
      title: '联系电话',
      dataIndex: 'phoneNumber',
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record.id)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      createModelVisiable: false,
      updateModelVisiable: false,
      expandForm: false,
      selectedRows: [],
      updateModel: {},
      searchForm: {},
    };
  }

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'identityUser/fetch',
      payload: {},
    });
  }

  //#region 查询表单
  /**
   * from查询
   * @memberof index
   */
  public handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValues) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValues,
      };
      this.setState({
        searchForm: values,
      });
      // 进行查询
      dispatch({
        type: 'identityUser/fetch',
        payload: values,
      });
    });
  };

  /**
   * 重置查询表单
   * @memberof index
   */
  public handleFormReset = () => {
    const { form, dispatch } = this.props;
    // 重置表单
    form.resetFields();
    // 清空正在编辑
    this.setState({
      searchForm: {},
    });
    /// 发出请求
    dispatch({
      type: 'identityUser/fetch',
      payload: {},
    });
  };
  //#endregion

  //#region 创建、更新操作
  // 处理创建操作
  public handleCreate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'identityUser/add',
      payload: {
        model: fields,
      },
    }).then(() => {
      message.success('添加成功');
      this.handleCreateModalVisible();
    });
  };

  /// 控制CreateModel的显示与隐藏
  public handleCreateModalVisible: (flag?: boolean) => void = flag => {
    this.setState({
      createModelVisiable: !!flag,
    });
  };

  // 处理更新操作
  public handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'identityUser/update',
      payload: {
        id: fields.id,
        model: fields,
      },
    }).then(() => {
      message.success('更新成功');
      this.handleUpdateModalVisible();
    });
  };

  // 控制UpdateModel的显示与隐藏
  public handleUpdateModalVisible: (flag?: boolean, id?: any) => void = (flag, id) => {
    const { dispatch } = this.props;
    if (id) {
      dispatch({
        type: 'identityUser/get',
        payload: {
          id,
        },
      }).then(res => {
        this.setState({
          updateModelVisiable: !!flag,
          updateModel: res || {},
        });
      });
    } else {
      this.setState({
        updateModelVisiable: !!flag,
        updateModel: {},
      });
    }
  };

  //#endregion

  //#region 删除操作
  public handleDelete = id => {
    const { dispatch } = this.props;
    if (!id) {
      return;
    }
    dispatch({
      type: 'identityUser/remove',
      payload: {
        id,
      },
    }).then(() => {
      message.info('删除成功');
    });
  };
  //#endregion

  //#region 菜单操作
  /**
   * 选中多行菜单时间，可以扩展导出Excle
   * @memberof index
   */
  public handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'identityUser/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
        }).then(() => {
          this.setState({
            selectedRows: [],
          });
        });
        break;
      default:
        break;
    }
  };

  /// 选中行操作
  public handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  //#endregion

  //#region  分页操作
  // 表格分页操作

  public handleStandardTableChange: (pagination: PaginationConfig, filters: Record<any, any>, sorter: SorterResult<any>) => void = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { searchForm } = this.state;
    // filtersArg 为table过滤参数
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      sorting: '',
      ...filtersArg,
      ...searchForm,
    };
    // 排序条件
    if (sorter.field) {
      // 将AntdTable内置的排序转换成服务端排序
      const serverSort = sorter.order === 'ascend' ? 'Asc' : 'Desc';
      params.sorting = `${sorter.field} ${serverSort}`;
    }
    dispatch({
      type: 'identityUser/fetch',
      payload: params,
    });
  };

  //#endregion

  // 查询条件表单生成
  public renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="书籍名称">{getFieldDecorator('name')(<Input placeholder="请输入书籍名称进行查询" />)}</FormItem>
          </Col>
          {/* 构建查询from表单*/}
          <Col md={4} sm={24}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  public render() {
    const {
      identityUser: { data },
      loading,
    } = this.props;
    const { selectedRows, createModelVisiable, updateModelVisiable, updateModel } = this.state;

    // 选中操作菜单
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="export">批量导出</Menu.Item>
      </Menu>
    );
    // 新增操作
    const createMethods = {
      handleAdd: this.handleCreate,
      handleModalVisible: this.handleCreateModalVisible,
    };

    // 更新操作
    const updateMethods = {
      handleUpdate: this.handleUpdate,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
    };

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="danger" icon="delete">
                    批量删除
                  </Button>
                  {
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  }
                </span>
              )}
            </div>
            {
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                rowKey="id"
              />
            }
          </div>
        </Card>
        <CreateForm {...createMethods} modalVisible={createModelVisiable} />
        {updateModel && Object.keys(updateModel).length ? <UpdateForm {...updateMethods} updateModalVisible={updateModelVisiable} values={updateModel} /> : null}
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(IdentityUser);
//#endregion
