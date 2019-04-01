import { GetPermissionListResultDto } from '@/utils/HttpClient';
import { Modal, Tree } from 'antd';
import { element } from 'prop-types';
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
  checkedKeys: string[];
}

export default class PermissionModal extends React.Component<
  IPermissionModalProps,
  IPermissionState
> {
  public defaultSelectedKeys: string[] = [];
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
    };
  }

  public onCheck = (checkedKeys, info) => {
    const { halfCheckedKeys } = info;
    this.setState({
      checkedKeys: [...checkedKeys, ...halfCheckedKeys],
    });
  };
  // 处理更新操作
  public handleUpdateFunc = () => {
    // const { handlePermission } = this.props;
    console.log(123);
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
  };

  public renderTreeNodes = data => {
    return data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} checked={element.isGran}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} />;
    });
  };

  public render() {
    const { permissionModalVisible, handlePermissionlVisible, values } = this.props;
    const { checkedKeys } = this.state;
    const result = this.renderTreeNodesFunc(values);
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
          defaultCheckedKeys={checkedKeys}
          checkable={true}
          onCheck={this.onCheck}
        >
          {this.renderTreeNodes(result)}
        </Tree>
      </Modal>
    );
  }
}
