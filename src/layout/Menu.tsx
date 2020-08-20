import React from 'react';
import { Menu } from 'antd';
import menu from '@/config/menu';

const { Item, SubMenu } = Menu;
export default () => (
  <Menu
    mode="inline"
  >
    {
      menu.map((item) => (
        item.children
          ? (
            <SubMenu key={item.path} title={item.name}>
              {
                item.children.map((i) => (
                  <Item key={i.path}>{i.name}</Item>
                ))
              }
            </SubMenu>
          )
          : <Item key="h5">h5</Item>
      ))
    }
  </Menu>
);
