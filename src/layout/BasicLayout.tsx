import React from 'react'
import {Layout} from 'antd'
import Menu from './Menu'

const {Header,Content,Sider} = Layout

export default (props) => (
  <Layout style={{height:'100%'}}>
    <Header>
      我是头部
    </Header>
    <Layout>
      <Sider width={150}>
        <Menu />
      </Sider>
      <Layout>
        <Content
          style={{margin:12,padding:12,background:'#fff',overflow:'auto'}}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
)
