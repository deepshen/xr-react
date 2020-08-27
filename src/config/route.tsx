import React from 'react'

import Upload from '@/view/web/Upload/index'
import Filters from '@/view/web/Filters/index'
import Home from '@/view/Home/index'


const routes = [
  {
    path: '/',
    name: '说明',
    component: Home
  },
  {
    path: '/upload',
    name: '上传',
    component: Upload,
  },
  {
    path: '/web',
    name: 'web端',
    children:[
      {
        path: '/filters',
        name: '通用表格筛选',
        component: Filters,
      }
    ]
  },
]

export default routes
