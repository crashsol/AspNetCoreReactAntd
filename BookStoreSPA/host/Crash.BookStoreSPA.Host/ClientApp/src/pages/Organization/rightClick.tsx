import { Divider, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { Item, Menu, MenuProvider, Separator, Submenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const onClick = node => console.log(node);
// create your menu first
const MyAwesomeMenu = () => (
  <Menu id="menu_id">
    <Item onClick={onClick}>Lorem</Item>
    <Item onClick={onClick}>
      <span>
        <Icon type="plus" />
        123123
      </span>
    </Item>
    <Item onClick={onClick}>123123</Item>
  </Menu>
);

export default class RightClick extends PureComponent {
  public render() {
    return (
      <div>
        <MenuProvider id="menu_id" style={{ border: '1px solid purple', display: 'inline-block' }}>
          Right click me...
        </MenuProvider>
        <MyAwesomeMenu />
      </div>
    );
  }
}
