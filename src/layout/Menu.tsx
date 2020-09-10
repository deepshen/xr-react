import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import routes from '@/config/route';// 循环依赖了

interface ItemD {
  children?: ({path: string;name: string})[];
  path: string;
  name: string;
  hide?: boolean;
}
const { Item, SubMenu } = Menu;
const Side = (props) => {
  const [select, setSelect] = useState('');
  const [open, setOpen] = useState([]);
  const initOpenKeys = (pathname: string): string[] => {
    let result = '';
    function loop(files = []) {
      for (let i = 0, len = files.length; i < len; i += 1) {
        if (files[i].path === pathname) {
          return;
        } if (files[i].children) {
          result = files[i].path;
          loop(files[i].children);
        }
      }
    }
    loop(routes);
    return [result];
  };
  useEffect(() => {
    const { pathname = '' } = props.location;
    setSelect(pathname);
    setOpen(initOpenKeys(pathname));
  }, []);
  return (
    <Menu
      key={select}
      mode="inline"
      defaultSelectedKeys={select}
      defaultOpenKeys={open}
    >
      {
        routes.map((item: ItemD) => {
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
