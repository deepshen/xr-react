import React from 'react'

import Upload from '@/view/web/Upload/index'
import Filters from '@/view/web/Filters/index'
import Home from '@/view/Home/index'
import Form from '@/view/web/Form'
import BasicLayout from "../layout/BasicLayout";


const routes = [
  {
    path: '/',
    name: '组件',
    layout: BasicLayout,
    children: [
      {
        path: '/notice',
        name: '使用说明',
        component: Home
      },
      {
        path: '/upload',
        name: '上传',
        component: Upload,
      },
      {
        path: '/filter',
        name: '通用表格筛选',
        component: Filters,
      },
      {
        path: '/form',
        name: "通用表单",
        component: Form,
      }
    ]
  },
]

export default routes
