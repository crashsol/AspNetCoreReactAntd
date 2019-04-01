import { GetPermissionListResultDto } from '@/utils/HttpClient';
import { Modal, Tree } from 'antd';
import React from 'react';
const TreeNode = Tree.TreeNode;

// 定义Permission 传入参数
interface IPermissionModalProps {
  handlePermission: (e?: any) => void;
  handlePermissionlVisible: (flag?: boolean, record?: any) => void;
  permissionModalVisible: boolean;
  values: GetPermissionListResultDto;
}
// 定义Permission 传出参数
interface IPermissionState {
  permissionModel: GetPermissionListResultDto;
  checkedKeys: string[];
}

export default class PermissionModal extends React.Component<
  IPermissionModalProps,
  IPermissionState
> {
  constructor(props) {
    super(props);
    // 从父组件获取传入的参数
    const { values } = props;
    // 解析获取所有已经选中的权限并赋值给selectedKeys
    this.state = {
      permissionModel: values,
      checkedKeys: [],
    };
  }

  public onCheck = (checkedKeys, info) => {
    console.log(info);
    this.setState({ checkedKeys });
  };

  // 处理更新操作
  public handleUpdateFunc = () => {
    console.log(1);
    // 更新操作
    // 根据选中的keys组合成更新权限Dto
  };

  // 渲染
  public renderTreeNodesFunc = permissionArray => {
    const treeNodes = permissionArray.groups.map(item => {
      const root = {
        key: item.name,
        title: item.displayName,
        children: [],
      };
      item.permissions.forEach(element => {
        if (element.parentName) {
          // 如果存在上级，则在上级中查找
          const node = root.children.find(pr => pr.key === element.parentName);
          node.children.push({
            key: element.name,
            title: element.displayName,
            children: [],
          });
        } else {
          root.children.push({
            key: element.name,
            title: element.displayName,
            children: [],
          });
        }
      });
      return root;
    });
    return treeNodes;
    // return this.renderTreeNodesFunc(treeNodes);
  };

  public renderTreeNodes = data => {
    return data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // tslint:disable-next-line:jsx-key
      return <TreeNode key={item.key} title={item.title} />;
    });
  };

  public render() {
    const { permissionModalVisible, handlePermissionlVisible } = this.props;
    const { permissionModel, checkedKeys: selectedKeys } = this.state;
    const result = this.renderTreeNodesFunc(permissionModel);
    return (
      <Modal
        width={640}
        title="角色授权"
        visible={permissionModalVisible}
        onCancel={() => handlePermissionlVisible(false)}
        onOk={this.handleUpdateFunc}
      >
        <Tree
          defaultExpandAll={true}
          defaultCheckedKeys={selectedKeys}
          checkable={true}
          onCheck={this.onCheck}
        >
          {this.renderTreeNodes(result)}
        </Tree>
      </Modal>
    );
  }
}
