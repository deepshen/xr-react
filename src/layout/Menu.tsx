import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menu from '@/config/route';

interface ItemD {
  children?: ({path: string;name: string})[];
  path: string;
  name: string;
  hide?: boolean;
}
const { Item, SubMenu } = Menu;
const Side = (props) => {
  const [select, setSelect] = useState('');
  useEffect(() => {
    const { pathname } = props.location;
    setSelect(pathname);
  });
  return (
    <Menu
      key={select}
      mode="inline"
      defaultSelectedKeys={select}
    >
      {
        menu.map((item: ItemD) => {
          if (item.hide) {
            return null;
          }
          return (
            item.children
              ? (
                <SubMenu key={item.path} title={item.name}>
                  {
                    item.children.map((i) => (
                      <Item key={i.path}>
                        <Link to={i.path}>
                          {i.name}
                        </Link>
                      </Item>
                    ))
                  }
                </SubMenu>
              )
              : (
                <Item key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </Item>
              )
          );
        })
      }
    </Menu>
  );
};

export default withRouter(Side);
