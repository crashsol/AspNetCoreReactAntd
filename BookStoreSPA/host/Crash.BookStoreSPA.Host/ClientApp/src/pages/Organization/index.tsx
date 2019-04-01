import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { CreateUpdateOrganizationDto, OrganizationDto } from '@/utils/HttpClient';
import { Button, Card, Col, Icon, Input, message, Modal, Row, Tree } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
import React, { Component, PureComponent } from 'react';

// 导入右键菜单选项
import { Item, Menu as RightMenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { IOrganizationModelState } from './models/organization';

const { TreeNode } = Tree;

//#region Create页面

/**
 * 定义Create页面Props
 *
 * @interface ICreateFormProps
 * @extends {FormComponentProps}
 */
interface ICreateFormProps extends FormComponentProps {
  title: string;
  modalVisible: boolean;
  handleAdd: (fields: any) => void;
  handleModalVisible: (flag?: boolean, res?: any) => void;
}
const CreateFormFunc: React.SFC<ICreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, title } = props;
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
      title={title ? `新增 ${title} 下级机构` : '新增机构'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false)}
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
  public formLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      updateModel: props.values,
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
  createModel: object;
  updateModelVisiable: boolean;
  updateModel: object; // 页面要更新的对象
}
// tslint:disable-next-line:max-classes-per-file
@connect(({ organization, loading }) => ({
  organization,
  loading: loading.models.organization,
}))
class Index extends Component<IIndexProps, IIndexState> {
  constructor(props) {
    super(props);
    this.state = {
      createModelVisiable: false,
      updateModelVisiable: false,
      updateModel: {},
      createModel: {},
    };
  }

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'organization/fetch',
      payload: {},
    });
  }

  /**
   * 重置查询表单
   * @memberof index
   */
  public handleFormReset = () => {
    const { form, dispatch } = this.props;
    // 重置表单
    form.resetFields();
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
    const { createModel } = this.state;
    dispatch({
      type: 'organization/add',
      payload: {
        model: {
          parentId: createModel.key,
          ...fields,
        },
      },
    }).then(() => {
      message.success('添加成功');
      this.handleCreateModalVisible();
    });
  };

  /// 控制CreateModel的显示与隐藏
  public handleCreateModalVisible: (flag?: boolean, res?: any) => void = (flag, res) => {
    this.setState({
      createModelVisiable: !!flag,
      createModel: res || {},
    });
  };

  // 处理更新操作
  public handleUpdate = fields => {
    const { dispatch } = this.props;
    console.log(fields);
    dispatch({
      type: 'organization/update',
      payload: {
        id: fields.key,
        model: fields,
      },
    }).then(() => {
      message.success('更新成功');
      this.handleUpdateModalVisible();
    });
  };

  // 控制UpdateModel的显示与隐藏
  public handleUpdateModalVisible: (flag?: boolean, res?: any) => void = (flag, res) => {
    this.setState({
      updateModelVisiable: !!flag,
      updateModel: res || {},
    });
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

  public handleDeleteConfirm = id => {
    Modal.confirm({
      title: '删除机构',
      content: '确定删除该机构及其下属机构,删除后无法恢复?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.handleDelete(id),
    });
  };

  //#endregion

  public renderTreeRightMenu = () => (
    <RightMenu id="menu_id">
      <Item onClick={e => this.handleCreateModalVisible(true, e.props)}>
        <span>
          <Icon type="plus" />
          添加下级机构
        </span>
      </Item>
      <Item
        onClick={e => {
          this.handleUpdateModalVisible(true, e.props);
        }}
      >
        <span>
          <Icon type="edit" />
          修改名称
        </span>
      </Item>
      <Item
        onClick={e => {
          this.handleDeleteConfirm(e.props.key);
        }}
      >
        <span>
          <Icon type="delete" />
          删除机构
        </span>
      </Item>
    </RightMenu>
  );

  // 创建树形节点
  public renderTreeNodes = (data: OrganizationDto[]) =>
    data.map((item: OrganizationDto) => {
      const temp = {
        title: item.title,
        key: item.key,
      };
      const title = (
        <MenuProvider id="menu_id" data-key={item.key} data={temp}>
          {item.title}
        </MenuProvider>
      );
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // tslint:disable-next-line:jsx-key
      return <TreeNode key={item.key} title={title} />;
    });

  public render() {
    const {
      organization: { data },
      loading,
    } = this.props;
    const { createModelVisiable, updateModelVisiable, updateModel, createModel } = this.state;

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
          <Col span={10}>
            <Card
              loading={loading}
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
              <Tree blockNode={true} defaultExpandAll={true}>
                {this.renderTreeNodes(data.list)}
              </Tree>
            </Card>
          </Col>
        </Row>
        <CreateForm
          {...createMethods}
          modalVisible={createModelVisiable}
          title={createModel.title}
        />
        {updateModel && Object.keys(updateModel).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModelVisiable}
            values={updateModel}
          />
        ) : null}
        {this.renderTreeRightMenu()}
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(Index);
//#endregion
