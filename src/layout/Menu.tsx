import React from 'react'
import {Menu} from 'antd'

const {Item, SubMenu} = Menu
export default () => (
  <Menu
    mode="inline"
  >
    <SubMenu key='web' title='web端'>
      <Item key='home'>home</Item>
    </SubMenu>
    <SubMenu key='h5' title='h5'>
      <Item key='h5'>h5</Item>
    </SubMenu>

  </Menu>
)
