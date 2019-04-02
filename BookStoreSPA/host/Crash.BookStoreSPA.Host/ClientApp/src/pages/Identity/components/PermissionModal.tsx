import { GetPermissionListResultDto, OrganizationDto } from '@/utils/HttpClient';
import { Modal, Tree } from 'antd';
import React from 'react';
const TreeNode = Tree.TreeNode;

// 定义Permission 传入参数
interface IPermissionModalProps {
  handlePermission: (e?: any) => void;
  handlePermissionlVisible: (flag?: boolean, record?: any) => void;
  permissionModalVisible: boolean;
  permissions: GetPermissionListResultDto;
  providerName: string;
  providerKey: string;
  providerTitle: string;
}
// 定义Permission 传出参数
interface IPermissionState {
  checkedKeys: string[]; // 已选中的权限
  defaultGroupNames: string[]; // 权限分组name集合
  treeNodes: OrganizationDto[]; // 权限TreeNode集合列表
}

export default class PermissionModal extends React.Component<
  IPermissionModalProps,
  IPermissionState
> {
  constructor(props) {
    super(props);
    // 解析获取所有已经选中的权限并赋值给selectedKeys
    const { defaultKeys, treeNodes, defaultGroupNames } = this.setDefaultSelectKeys();
    this.state = {
      checkedKeys: defaultKeys,
      treeNodes,
      defaultGroupNames,
    };
  }

  public setDefaultSelectKeys = (): {
    defaultKeys: string[];
    treeNodes: OrganizationDto[];
    defaultGroupNames: string[];
  } => {
    const { permissions } = this.props;
    const defaultKeys: string[] = [];
    const defaultGroupNames: string[] = [];
    const treeNodes = permissions.groups.map(item => {
      defaultGroupNames.push(item.name);
      const root = {
        key: item.name,
        title: item.displayName,
        children: [],
      };
      item.permissions.forEach(element => {
        if (element.isGranted) {
          defaultKeys.push(element.name);
        }
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
    return {
      defaultKeys,
      treeNodes,
      defaultGroupNames,
    };
  };

  public onCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys: [...checkedKeys, ...info.halfCheckedKeys],
    });
  };

  // 处理更新操作
  public handleUpdateFunc = () => {
    const { handlePermission, providerName, providerKey } = this.props;
    const { checkedKeys, defaultGroupNames } = this.state;
    const permissions: string[] = [];
    checkedKeys.forEach(item => {
      if (!defaultGroupNames.some(b => b === item)) {
        permissions.push(item);
      }
    });
    // 构建更新权限操作
    const dtos = permissions.map(item => {
      return {
        name: item,
        isGranted: true,
      };
    });
    // 构建更新对象
    const updatePermission = {
      providerName,
      providerKey,
      input: {
        permissions: dtos,
      },
    };
    // 更新操作
    handlePermission(updatePermission);
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
    const { permissionModalVisible, handlePermissionlVisible, providerTitle } = this.props;
    const { checkedKeys, treeNodes } = this.state;
    return (
      <Modal
        width={640}
        title={`设置角色 ${providerTitle} 授权`}
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
          {this.renderTreeNodes(treeNodes)}
        </Tree>
      </Modal>
    );
  }
}
