import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import { CreateUpdateOrganizationDto, OrganizationDto } from '@/utils/HttpClient';
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Icon,
  Input,
  Menu,
  message,
  Modal,
  Popconfirm,
  Row,
  Tree,
} from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { connect } from 'dva';
import React, { Component, Fragment, PureComponent } from 'react';
// import styles from './Index.less';
const styles = require('./Index.less');
import { IOrganizationModelState } from './models/organization';

const { TreeNode } = Tree;
/* 如果创建的表单中有Enum类型，可以使用以下方法
import { EnumToStatusMap, EnumToTableFilter } from '@/utils/AbpUtils';
const SelectOption = Select.Option;
const statusMap = EnumToStatusMap();
const fileterMap = EnumToTableFilter();
const EnumToSelectOptions = enumType => {
  return Object.keys(enumType).map(key => {
    return (
      <SelectOption key={key} value={key}>
        {enumType[key]}
      </SelectOption>
    );
  });
};
*/

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

  return (
    <Modal
      width={640}
      destroyOnClose={true}
      title="新增数据"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form>
        <FormItem {...formLayout} label="机构名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '机构名称不能为空', max: 128 }],
          })(<Input placeholder="请输入机构名称" />)}
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
  values: CreateUpdateOrganizationDto;
}

/**
 *  Update State
 * @interface IUpdateFormState
 */
interface IUpdateFormState {
  updateModel: CreateUpdateOrganizationDto;
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
      <Modal
        width={640}
        title="更新机构"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
        onOk={this.handleUpdateFunc}
      >
        <Form>
          <FormItem {...this.formLayout} label="机构名称">
            {form.getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入机构名称', max: 128 }],
              initialValue: updateModel.title,
            })(<Input placeholder="请输入书籍名称" />)}
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
  organization: IOrganizationModelState;
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
@connect(({ organization, loading }) => ({
  organization,
  loading: loading.models.organization,
}))
class Index extends Component<IIndexProps, IIndexState> {
  /* 创建 table columns 的列定义*/
  public columns = [
    {
      title: '书籍名称',
      dataIndex: 'name',
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

  public constructor(props) {
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
      type: 'organization/fetch',
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
        type: 'organization/fetch',
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
      type: 'organization/fetch',
      payload: {},
    });
  };
  //#endregion

  //#region 创建、更新操作
  // 处理创建操作
  public handleCreate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'organization/add',
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
      type: 'organization/update',
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
        type: 'organization/get',
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
      type: 'organization/remove',
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
          type: 'organization/remove',
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

  public handleStandardTableChange: (
    pagination: PaginationConfig,
    filters: Record<any, any>,
    sorter: SorterResult<any>
  ) => void = (pagination, filtersArg, sorter) => {
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
      type: 'organization/fetch',
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
            <FormItem label="书籍名称">
              {getFieldDecorator('name')(<Input placeholder="请输入书籍名称进行查询" />)}
            </FormItem>
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

  public renderTreeNodes = (data: OrganizationDto[]) =>
    data.map((item: OrganizationDto) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // tslint:disable-next-line:jsx-key
      return <TreeNode {...item} />;
    });

  public render() {
    const {
      organization: { data },
      loading,
    } = this.props;
    const { selectedRows, createModelVisiable, updateModelVisiable, updateModel } = this.state;
    console.log(data.list);

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
      <PageHeaderWrapper title="组织架构">
        <Row gutter={24}>
          <Col span={6}>
            <Card
              bordered={true}
              title="组织架构"
              extra={
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => this.handleCreateModalVisible(true)}
                >
                  添加机构
                </Button>
              }
            >
              <Tree>{this.renderTreeNodes(data.list)}</Tree>
            </Card>
          </Col>
          <Col span={18}>
            <Card bordered={true}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <div className={styles.tableListOperator}>
                  <Button
                    icon="plus"
                    type="primary"
                    onClick={() => this.handleCreateModalVisible(true)}
                  >
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
          </Col>
        </Row>
        <CreateForm {...createMethods} modalVisible={createModelVisiable} />
        {updateModel && Object.keys(updateModel).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModelVisiable}
            values={updateModel}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(Index);
//#endregion
