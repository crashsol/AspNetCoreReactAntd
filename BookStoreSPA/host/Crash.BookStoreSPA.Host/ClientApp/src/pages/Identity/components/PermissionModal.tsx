import { GetPermissionListResultDto, OrganizationDto } from '@/utils/HttpClient';
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
  checkedKeys: string[];
  treeNodes: OrganizationDto[];
}

export default class PermissionModal extends React.Component<
  IPermissionModalProps,
  IPermissionState
> {
  constructor(props) {
    super(props);
    // 解析获取所有已经选中的权限并赋值给selectedKeys
    const { defaultKeys, treeNodes } = this.setDefaultSelectKeys();
    console.log(defaultKeys, treeNodes);
    this.state = {
      checkedKeys: defaultKeys,
      treeNodes,
    };
  }

  public setDefaultSelectKeys = (): {
    defaultKeys: string[];
    treeNodes: OrganizationDto[];
  } => {
    const { values } = this.props;
    const defaultKeys: string[] = [];
    console.log(values);
    const treeNodes = values.groups.map(item => {
      const root = {
        key: item.name,
        title: item.displayName,
        children: [],
      };
      item.permissions.forEach(element => {
        console.log(element.isGranted);
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
    };
  };

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
    const { checkedKeys, treeNodes } = this.state;
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
          {this.renderTreeNodes(treeNodes)}
        </Tree>
      </Modal>
    );
  }
}
